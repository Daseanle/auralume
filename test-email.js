/**
 * 邮件功能测试脚本
 *
 * 使用方法：
 * 1. 修改下面的 testUser.email 为你的真实邮箱
 * 2. 运行：node test-email.js
 * 3. 检查邮箱是否收到测试邮件
 */

import { sendWelcomeEmail } from './src/lib/email/sender.js';

// ==================== 配置区 ====================

// 测试用户数据（请修改为你的真实邮箱）
const testUser = {
  email: 'marshall@shopauralume.com', // ⚠️ 替换为你的邮箱
  id: 'test-user-123',
  username: 'Test User'
};

// ==================== 测试函数 ====================

console.log('🧪 Starting email test...\n');

// 检查环境变量
const apiKey = import.meta.env.VITE_RESEND_API_KEY;
const emailEnabled = import.meta.env.VITE_ENABLE_EMAIL;

if (!apiKey) {
  console.error('✗ Error: VITE_RESEND_API_KEY not found in .env');
  console.log('Please add: VITE_RESEND_API_KEY=re_YourApiKey');
  process.exit(1);
}

if (emailEnabled !== 'true') {
  console.warn('⚠️  Warning: VITE_ENABLE_EMAIL is not set to "true"');
  console.log('Current value:', emailEnabled);
}

console.log('✓ Configuration OK');
console.log('✓ API Key:', apiKey.substring(0, 10) + '...');
console.log('');

// 发送测试邮件
console.log('📧 Sending welcome email to:', testUser.email);
console.log('');

sendWelcomeEmail(testUser)
  .then(() => {
    console.log('');
    console.log('✅ Success! Test email sent successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Check your inbox (and spam folder)');
    console.log('2. Verify the email design looks correct');
    console.log('3. Test clicking links in the email');
    console.log('');
  })
  .catch((error) => {
    console.error('');
    console.error('❌ Failed to send test email');
    console.error('');
    console.error('Error details:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Verify your Resend API key is valid');
    console.error('2. Check your internet connection');
    console.error('3. Visit https://resend.com/api-keys to regenerate');
    console.error('');
    process.exit(1);
  });
