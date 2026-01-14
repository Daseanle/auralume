/**
 * 邮件发送工具
 *
 * 集成 Resend/Supabase 邮件功能
 * 支持模板化邮件发送
 *
 * 环境变量:
 * VITE_RESEND_API_KEY - Resend API Key (可选)
 * VITE_ENABLE_EMAIL - 启用邮件功能 (true/false)
 */

import { emailTemplates, replaceVariables } from './templates';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://auralume.shopauralume.com';

/**
 * 发送欢迎邮件
 */
export const sendWelcomeEmail = async (user) => {
    const { name, email } = user;

    const template = emailTemplates.welcome;
    const variables = {
        name: name || 'Soul Seeker',
        cta_url: `${BASE_URL}/horoscope`,
        unsubscribe_url: `${BASE_URL}/unsubscribe?email=${email}`,
    };

    const subject = replaceVariables(template.subject, variables);
    const html = replaceVariables(template.html, variables);

    return await sendEmail({
        to: email,
        subject,
        html,
    });
};

/**
 * 发送 Premium 订阅确认邮件
 */
export const sendSubscriptionConfirmedEmail = async (user) => {
    const { name, email } = user;

    const template = emailTemplates.subscriptionConfirmed;
    const variables = {
        name: name || 'Premium Member',
        unsubscribe_url: `${BASE_URL}/unsubscribe?email=${email}`,
    };

    const subject = replaceVariables(template.subject, variables);
    const html = replaceVariables(template.html, variables);

    return await sendEmail({
        to: email,
        subject,
        html,
    });
};

/**
 * 发送 Oracle 解锁确认邮件
 */
export const sendOracleUnlockedEmail = async (user, readingUrl) => {
    const { name, email } = user;

    const template = emailTemplates.oracleUnlocked;
    const variables = {
        name: name || 'Cosmic Explorer',
        reading_url: readingUrl,
        support_url: `${BASE_URL}/support`,
    };

    const subject = replaceVariables(template.subject, variables);
    const html = replaceVariables(template.html, variables);

    return await sendEmail({
        to: email,
        subject,
        html,
    });
};

/**
 * 发送订阅即将到期提醒
 */
export const sendSubscriptionExpiringEmail = async (user, daysLeft = 3) => {
    const { name, email } = user;

    const template = emailTemplates.subscriptionExpiring;
    const variables = {
        name: name || 'Premium Member',
        days_left: daysLeft,
        renew_url: `${BASE_URL}/pricing?promo=LOYALTY20`,
        cancel_url: `${BASE_URL}/subscription/cancel`,
    };

    const subject = replaceVariables(template.subject, variables);
    const html = replaceVariables(template.html, variables);

    return await sendEmail({
        to: email,
        subject,
        html,
    });
};

/**
 * 发送用户重新激活邮件
 */
export const sendReactivationEmail = async (user) => {
    const { name, email } = user;

    const template = emailTemplates.reactivation;
    const variables = {
        name: name || 'Soul Seeker',
        cta_url: `${BASE_URL}/horoscope`,
        unsubscribe_url: `${BASE_URL}/unsubscribe?email=${email}`,
    };

    const subject = replaceVariables(template.subject, variables);
    const html = replaceVariables(template.html, variables);

    return await sendEmail({
        to: email,
        subject,
        html,
    });
};

/**
 * 底层邮件发送函数
 */
const sendEmail = async ({ to, subject, html, text }) => {
    // 检查是否启用邮件功能
    const enableEmail = import.meta.env.VITE_ENABLE_EMAIL === 'true';

    if (!enableEmail) {
        console.log('✦ Email feature disabled. Skipping send.');
        console.log('✦ To: ' + to);
        console.log('✦ Subject: ' + subject);
        return { success: true, method: 'mock' };
    }

    try {
        // 优先使用 Resend（如果配置了 API Key）
        const resendKey = import.meta.env.VITE_RESEND_API_KEY;

        if (resendKey && resendKey !== 'your-resend-api-key') {
            return await sendViaResend({ to, subject, html, text, apiKey: resendKey });
        }

        // 否则使用 Supabase
        return await sendViaSupabase({ to, subject, html, text });
    } catch (error) {
        console.error('✗ Failed to send email:', error);
        return { success: false, error };
    }
};

/**
 * 使用 Resend 发送邮件
 */
const sendViaResend = async ({ to, subject, html, text, apiKey }) => {
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Auralume <noreply@auralume.shopauralume.com>',
            to,
            subject,
            html,
            text,
        }),
    });

    if (!response.ok) {
        throw new Error(`Resend API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✦ Email sent via Resend:', data);
    return { success: true, data, method: 'resend' };
};

/**
 * 使用 Supabase 发送邮件
 */
const sendViaSupabase = async ({ to, subject, html, text }) => {
    const { supabase } = await import('../lib/supabase');

    const { data, error } = await supabase.functions.invoke('send-email', {
        to,
        subject,
        html,
        text,
    });

    if (error) {
        throw new Error(`Supabase Edge Function error: ${error.message}`);
    }

    console.log('✦ Email sent via Supabase:', data);
    return { success: true, data, method: 'supabase' };
};

/**
 * 批量发送邮件（用于营销活动）
 */
export const sendBulkEmails = async (templateName, users, customVariables = {}) => {
    const results = [];

    for (const user of users) {
        try {
            let result;

            switch (templateName) {
                case 'welcome':
                    result = await sendWelcomeEmail(user);
                    break;
                case 'reactivation':
                    result = await sendReactivationEmail(user);
                    break;
                default:
                    console.warn('Unknown template:', templateName);
            }

            results.push({ email: user.email, success: result.success });
        } catch (error) {
            console.error(`Failed to send to ${user.email}:`, error);
            results.push({ email: user.email, success: false, error });
        }

        // 避免触发速率限制
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return results;
};
