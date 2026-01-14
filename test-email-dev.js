/**
 * 邮件功能测试脚本 - 开发版
 *
 * 注意：测试模式下只能发送到 Resend 账号所有者的邮箱
 * 要发送到其他邮箱，需要先验证域名
 */

const RESEND_API_KEY = 're_XgJCCgNC_4doPcLcm2JH6xLfPyNiCqdwr';
const FROM_EMAIL = 'onboarding@resend.dev';
const TO_EMAIL = 'daseanleelee@gmail.com'; // Resend 账号所有者邮箱

const testUser = {
  email: TO_EMAIL,
  id: 'test-user-123',
  username: 'Marshall'
};

async function testEmailSending() {
  console.log('🧪 Starting email test (Development Mode)...\n');
  console.log('✓ API Key:', RESEND_API_KEY.substring(0, 10) + '...');
  console.log('✓ To:', TO_EMAIL);
  console.log('⚠️  Note: Testing mode - can only send to account owner');
  console.log('');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: '✨ Welcome to Auralume, ' + testUser.username + '!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Auralume</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #d4af37; font-size: 36px; margin: 0; letter-spacing: 2px;">AURALUME</h1>
                <p style="color: #ffffff; margin-top: 10px; font-size: 14px;">Your Cosmic Journey Begins ✨</p>
              </div>

              <div style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 15px 0;">Welcome, ${testUser.username}! 🌟</h2>
                <p style="color: #ffffff; line-height: 1.6; margin: 0;">
                  Thank you for joining Auralume! The universe has guided you here, and we're honored to be part of your cosmic journey.
                </p>
              </div>

              <div style="color: #ffffff; line-height: 1.8; margin-bottom: 30px;">
                <p style="margin: 0 0 15px 0;">
                  Here's what you can expect from your personalized astrological experience:
                </p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;">✨ Daily horoscopes tailored to your birth chart</li>
                  <li style="margin-bottom: 10px;">🔮 Deep insights into your personality and destiny</li>
                  <li style="margin-bottom: 10px;">💕 Soulmate compatibility readings</li>
                  <li style="margin-bottom: 10px;">🌙 Lunar cycle guidance</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 40px 0;">
                <a href="http://localhost:5174/" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f4cf67 100%); color: #0a0a0a; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Start Your Reading ✨
                </a>
              </div>

              <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; color: #ffffff80; font-size: 12px;">
                <p style="margin: 0 0 10px 0;">
                  Questions? Just reply to this email — we'd love to hear from you!
                </p>
                <p style="margin: 0;">
                  With love and cosmic blessings,<br>
                  The Auralume Team ✨
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    const data = await response.json();

    console.log('✅ Success! Test email sent successfully!');
    console.log('');
    console.log('📧 Email details:');
    console.log('   Message ID:', data.id);
    console.log('   From:', FROM_EMAIL);
    console.log('   To:', TO_EMAIL);
    console.log('');
    console.log('Next steps:');
    console.log('1. Check your inbox (and spam folder)');
    console.log('2. Verify the email design looks correct');
    console.log('3. Once verified, add your domain at https://resend.com/domains');
    console.log('');
    console.log('🔗 Track this email at: https://resend.com/dashboard/emails');
    console.log('');

  } catch (error) {
    console.error('');
    console.error('❌ Failed to send test email');
    console.error('');
    console.error('Error details:', error.message);
    console.error('');
    process.exit(1);
  }
}

testEmailSending();
