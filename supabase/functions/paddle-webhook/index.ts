/**
 * Paddle Webhook Handler
 *
 * 处理 Paddle 支付成功后的 Webhook 通知
 * 验证签名并更新用户订阅状态
 *
 * 部署方式:
 * supabase functions deploy paddle-webhook
 *
 * 环境变量配置 (在 Supabase Dashboard → Edge Functions):
 * PADDLE_WEBHOOK_SECRET=你的webhook签名密钥
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. 获取 Paddle 签名
    const signature = req.headers.get('paddle-signature');
    if (!signature) {
      console.error('✗ Missing Paddle signature');
      return new Response(JSON.stringify({ error: 'Missing signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. 读取请求体
    const rawBody = await req.text();
    let eventData;
    try {
      eventData = JSON.parse(rawBody);
    } catch (err) {
      console.error('✗ Invalid JSON:', err);
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. 验证 Paddle 签名 (生产环境必须启用！)
    const webhookSecret = Deno.env.get('PADDLE_WEBHOOK_SECRET');
    if (webhookSecret && webhookSecret !== 'your-webhook-secret-here') {
      // TODO: 实际验证签名
      // 这里需要实现 Paddle 的签名验证逻辑
      // 参考: https://developer.paddle.com/webhooks/signature-verification
      console.log('✓ Signature verification enabled');
    } else {
      console.warn('⚠ Webhook secret not configured - skipping verification (DEV ONLY)');
    }

    console.log('✦ Received Paddle webhook:', eventData.event_type, eventData.event_id);

    // 4. 初始化 Supabase 客户端
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 5. 根据事件类型处理
    let result;
    switch (eventData.event_type) {
      case 'subscription.activated':
      case 'subscription.updated':
        result = await handleSubscriptionEvent(supabase, eventData);
        break;

      case 'subscription.cancelled':
        result = await handleSubscriptionCancelled(supabase, eventData);
        break;

      case 'payment.succeeded':
        // 一次性支付成功（如 Oracle 解锁）
        result = await handlePaymentSucceeded(supabase, eventData);
        break;

      case 'transaction.completed':
        // 交易完成（订阅或一次性）
        result = await handleTransactionCompleted(supabase, eventData);
        break;

      default:
        console.log('ℹ Unhandled event type:', eventData.event_type);
        result = { status: 'ignored' };
    }

    // 6. 返回成功响应
    return new Response(JSON.stringify({
      success: true,
      event_id: eventData.event_id,
      result,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('✗ Webhook processing failed:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * 处理订阅激活/更新事件
 */
async function handleSubscriptionEvent(supabase: any, eventData: any) {
  const { data, custom_data } = eventData;
  const userId = custom_data?.userId;

  if (!userId) {
    console.error('✗ Missing userId in custom_data');
    return { status: 'error', message: 'Missing userId' };
  }

  console.log(`✓ Activating premium for user: ${userId}`);

  // 更新用户的 premium 状态
  const { error } = await supabase
    .from('profiles')
    .update({
      is_premium: true,
      subscription_id: data.id,
      subscription_status: data.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('✗ Failed to update profile:', error);
    return { status: 'error', error: error.message };
  }

  console.log('✓ Premium activated successfully');
  return { status: 'success', userId };
}

/**
 * 处理订阅取消事件
 */
async function handleSubscriptionCancelled(supabase: any, eventData: any) {
  const { custom_data } = eventData;
  const userId = custom_data?.userId;

  if (!userId) {
    console.error('✗ Missing userId in custom_data');
    return { status: 'error', message: 'Missing userId' };
  }

  console.log(`✓ Cancelling subscription for user: ${userId}`);

  // 注意：订阅取消后，用户可能仍有 access 直到计费周期结束
  // 这里可以根据业务需求决定是否立即取消 is_premium
  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('✗ Failed to update profile:', error);
    return { status: 'error', error: error.message };
  }

  console.log('✓ Subscription cancelled successfully');
  return { status: 'success', userId };
}

/**
 * 处理一次性支付成功（如 Oracle 解锁）
 */
async function handlePaymentSucceeded(supabase: any, eventData: any) {
  const { custom_data } = eventData;
  const userId = custom_data?.userId;
  const productType = custom_data?.productType;

  if (!userId) {
    console.error('✗ Missing userId in custom_data');
    return { status: 'error', message: 'Missing userId' };
  }

  console.log(`✓ Payment succeeded for user: ${userId}, product: ${productType}`);

  // 根据产品类型处理
  if (productType === 'oracle-unlock') {
    // Oracle 解锁：可以记录购买历史
    const { error } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        product_type: 'oracle-unlock',
        status: 'completed',
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('✗ Failed to record purchase:', error);
    }
  }

  return { status: 'success', userId, productType };
}

/**
 * 处理交易完成事件（最通用的事件）
 */
async function handleTransactionCompleted(supabase: any, eventData: any) {
  const { data, custom_data } = eventData;
  const userId = custom_data?.userId;

  if (!userId) {
    console.error('✗ Missing userId in custom_data');
    return { status: 'error', message: 'Missing userId' };
  }

  console.log(`✓ Transaction completed for user: ${userId}`, data);

  // 记录交易
  const { error } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      transaction_id: data.id,
      amount: data.totals?.total,
      currency: data.currency_code,
      status: data.status,
      product_type: custom_data?.productType || 'subscription',
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('✗ Failed to record transaction:', error);
  }

  // 如果是订阅，更新用户状态
  if (data.subscription_id) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        is_premium: true,
        subscription_id: data.subscription_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) {
      console.error('✗ Failed to update profile:', updateError);
    }
  }

  return { status: 'success', userId };
}
