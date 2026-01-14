/**
 * Paddle Payment Configuration
 *
 * 初始化 Paddle.js SDK，处理订阅和一次性付款
 *
 * 环境变量说明：
 * - VITE_PADDLE_TOKEN: Paddle 客户端 Token（从 Paddle 后台获取）
 * - VITE_ENABLE_PADDLE_SANDBOX: 设置为 'true' 启用沙盒模式（测试用）
 */

import { initializePaddle as initPaddle } from '@paddle/paddle-js';

let paddleInstance = null;

/**
 * 初始化 Paddle SDK
 * 应该在应用启动时调用一次
 */
export const initializePaddle = async () => {
  if (paddleInstance) {
    console.log('✦ Paddle already initialized');
    return paddleInstance;
  }

  try {
    const token = import.meta.env.VITE_PADDLE_TOKEN;

    if (!token || token === 'your-paddle-token-here') {
      console.warn('⚠ Paddle token not configured. Payment features will be disabled.');
      return null;
    }

    paddleInstance = await initPaddle({
      token: token,
      // 传入客户信息（如果用户已登录）
      pwCustomer: {
        // email: 用户邮箱（在调用时动态传入）
      },
      // 沙盒模式（测试环境）
      environment: import.meta.env.VITE_ENABLE_PADDLE_SANDBOX === 'true' ? 'sandbox' : 'production',
      // 事件监听器
      eventCallback: (event) => {
        console.log('✦ Paddle event:', event.name, event.data);

        // 可以在这里添加全局事件处理
        switch (event.name) {
          case 'checkout.completed':
            console.log('✦ Payment completed:', event.data);
            break;
          case 'checkout.close':
            console.log('✦ Checkout closed');
            break;
          case 'checkout.error':
            console.error('✦ Checkout error:', event.data);
            break;
        }
      },
    });

    console.log('✦ Paddle initialized successfully');
    return paddleInstance;

  } catch (error) {
    console.error('✗ Paddle initialization failed:', error);
    return null;
  }
};

/**
 * 打开订阅支付流程
 *
 * @param {string} priceId - Paddle Price ID（月付或年付）
 * @param {Object} options - 配置选项
 * @param {string} options.customerEmail - 用户邮箱
 * @param {string} options.userId - 用户 ID（用于 Webhook 关联）
 * @param {Function} options.onSuccess - 支付成功回调
 * @param {Function} options.onClose - 关闭结算页回调
 */
export const openSubscriptionCheckout = (priceId, options = {}) => {
  const {
    customerEmail,
    userId,
    onSuccess,
    onClose,
  } = options;

  if (!paddleInstance) {
    console.error('✗ Paddle not initialized');
    alert('Payment system is not ready. Please refresh the page.');
    return;
  }

  try {
    paddleInstance.Checkout.open({
      settings: {
        displayMode: 'overlay', // 'overlay' | 'redirect'
        theme: 'dark', // 'light' | 'dark'
        successUrl: `${window.location.origin}/checkout/success?checkoutId={checkout_id}`,
        // 完整的成功回调 URL（Webhook 也会触发）
      },
      items: [{
        priceId: priceId,
        quantity: 1,
      }],
      customer: {
        email: customerEmail,
      },
      customData: {
        userId: userId,
        source: 'web',
      },
      // 成功回调（注意：实际状态更新由 Webhook 处理）
      successCallback: (data) => {
        console.log('✦ Subscription checkout success:', data);
        if (onSuccess) onSuccess(data);
      },
      // 关闭回调
      closeCallback: () => {
        console.log('✦ Checkout closed');
        if (onClose) onClose();
      },
    });

  } catch (error) {
    console.error('✗ Failed to open checkout:', error);
    alert('Failed to open payment page. Please try again.');
  }
};

/**
 * 打开一次性产品支付（Oracle 解锁）
 *
 * @param {string} priceId - Paddle Price ID
 * @param {Object} options - 配置选项
 */
export const openOnetimeCheckout = (priceId, options = {}) => {
  const {
    customerEmail,
    userId,
    onSuccess,
    onClose,
  } = options;

  if (!paddleInstance) {
    console.error('✗ Paddle not initialized');
    alert('Payment system is not ready. Please refresh the page.');
    return;
  }

  try {
    paddleInstance.Checkout.open({
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        successUrl: `${window.location.origin}/checkout/success?checkoutId={checkout_id}`,
      },
      items: [{
        priceId: priceId,
        quantity: 1,
      }],
      customer: {
        email: customerEmail,
      },
      customData: {
        userId: userId,
        productType: 'oracle-unlock',
      },
      successCallback: (data) => {
        console.log('✦ One-time payment success:', data);
        if (onSuccess) onSuccess(data);
      },
      closeCallback: () => {
        console.log('✦ Checkout closed');
        if (onClose) onClose();
      },
    });

  } catch (error) {
    console.error('✗ Failed to open checkout:', error);
    alert('Failed to open payment page. Please try again.');
  }
};

/**
 * 格式化价格显示（根据用户地区）
 *
 * @param {Object} price - Paddle 价格对象
 * @returns {string} 格式化后的价格字符串
 */
export const formatPrice = (price) => {
  if (!price) return '$0.00';

  const { unit_price, currency, recurring } = price;

  // 格式化货币
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(unit_price?.amount || 0);

  // 添加周期信息
  if (recurring) {
    const interval = recurring.interval;
    const intervalMap = {
      'month': '/month',
      'year': '/year',
      'week': '/week',
      'day': '/day',
    };
    return formattedAmount + (intervalMap[interval] || '');
  }

  return formattedAmount;
};

/**
 * 导出 Paddle 实例（用于高级用法）
 */
export const getPaddleInstance = () => paddleInstance;

/**
 * 检查 Paddle 是否已初始化
 */
export const isPaddleReady = () => !!paddleInstance;
