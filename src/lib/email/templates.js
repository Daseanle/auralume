/**
 * 邮件模板系统
 *
 * 针对不同场景的预设邮件模板
 * 支持个性化变量替换
 *
 * 使用方式：
 * sendWelcomeEmail({ name: "Sarah", email: "sarah@example.com" })
 */

export const emailTemplates = {
    /**
     * 欢迎邮件 - 用户注册后发送
     */
    welcome: {
        subject: "✨ Welcome to Auralume, {{name}}! Your cosmic journey begins",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Auralume</title>
    <style>
        body { font-family: 'Georgia', serif; background: #0a0a0a; color: #e0e0e0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .content { padding: 40px 20px; }
        .cta-button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); color: #0a0a0a; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 0; }
        .footer { background: #0f0f0f; padding: 30px 20px; text-align: center; font-size: 12px; color: #666; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent); margin: 30px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: white; margin: 0; font-size: 32px;">✨ Auralume</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">Your cosmic journey begins now</p>
        </div>

        <div class="content">
            <h2 style="color: #D4AF37; margin-bottom: 20px;">Welcome, {{name}}! 🌙</h2>

            <p style="line-height: 1.8; margin-bottom: 20px;">
                You've just taken the first step toward understanding your true self.
                The universe has been waiting for you.
            </p>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                At Auralume, we combine ancient astrological wisdom with AI technology
                to help you discover:
            </p>

            <ul style="line-height: 2; color: #b0b0b0; margin-bottom: 30px;">
                <li>✨ Your true soulmate's cosmic signature</li>
                <li>✨ Hidden patterns in your birth chart</li>
                <li>✨ Future opportunities written in the stars</li>
                <li>✨ Deep insights into your relationships</li>
            </ul>

            <div class="divider"></div>

            <p style="text-align: center; margin-bottom: 30px;">
                <strong>Ready to discover what the stars have in store for you?</strong>
            </p>

            <div style="text-align: center;">
                <a href="{{cta_url}}" class="cta-button">Start Your Reading ✨</a>
            </div>

            <p style="text-align: center; font-size: 13px; color: #888; margin-top: 30px;">
                🔮 Your first reading is completely free
            </p>
        </div>

        <div class="footer">
            <p style="margin: 0 0 10px 0;">
                Sent with 💛 from the stars above<br/>
                <a href="{{unsubscribe_url}}" style="color: #666; text-decoration: underline;">Unsubscribe</a>
            </p>
            <p style="margin: 0; color: #444; font-size: 11px;">
                Auralume • auralume.shopauralume.com
            </p>
        </div>
    </div>
</body>
</html>
        `,
    },

    /**
     * Premium 订阅确认邮件
     */
    subscriptionConfirmed: {
        subject: "🎉 Welcome to Premium, {{name}}! Your cosmic journey just got deeper",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Confirmed</title>
    <style>
        body { font-family: 'Georgia', serif; background: #0a0a0a; color: #e0e0e0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); padding: 40px 20px; text-align: center; }
        .content { padding: 40px 20px; }
        .feature-box { background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2); padding: 20px; border-radius: 10px; margin: 15px 0; }
        .footer { background: #0f0f0f; padding: 30px 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #0a0a0a; margin: 0; font-size: 32px;">✨ Premium Unlocked</h1>
            <p style="color: rgba(10,10,10,0.8); margin: 10px 0 0 0;">Welcome to the cosmic inner circle</p>
        </div>

        <div class="content">
            <h2 style="color: #D4AF37; margin-bottom: 20px;">You're amazing, {{name}}! 🌟</h2>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                Thank you for trusting us on your spiritual journey.
                Your Premium membership is now active.
            </p>

            <h3 style="color: #D4AF37; margin-bottom: 15px;">Your Premium Benefits:</h3>

            <div class="feature-box">
                <p style="margin: 0; color: #b0b0b0;">✨ <strong>Unlimited AI Readings</strong> - No limits on your cosmic explorations</p>
            </div>

            <div class="feature-box">
                <p style="margin: 0; color: #b0b0b0;">✨ <strong>Deep Soulmate Synastry</strong> - Understand your cosmic connections</p>
            </div>

            <div class="feature-box">
                <p style="margin: 0; color: #b0b0b0;">✨ <strong>Future Transit Alerts</strong> - Know what's coming your way</p>
            </div>

            <div class="feature-box">
                <p style="margin: 0; color: #b0b0b0;">✨ <strong>Priority Oracle Access</strong> - Get answers faster</p>
            </div>

            <p style="text-align: center; margin: 30px 0; font-size: 15px; color: #888;">
                🌙 The stars are aligned in your favor
            </p>
        </div>

        <div class="footer">
            <p style="margin: 0 0 10px 0;">
                Questions? Just reply to this email 💫
            </p>
            <p style="margin: 0;">
                <a href="{{unsubscribe_url}}" style="color: #666; text-decoration: underline;">Manage Subscription</a>
            </p>
        </div>
    </div>
</body>
</html>
        `,
    },

    /**
     * Oracle 解锁确认邮件
     */
    oracleUnlocked: {
        subject: "🔮 Your Oracle Reading is Ready! Here's your cosmic insight...",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oracle Reading Unlocked</title>
    <style>
        body { font-family: 'Georgia', serif; background: #0a0a0a; color: #e0e0e0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .content { padding: 40px 20px; }
        .cta-button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; }
        .footer { background: #0f0f0f; padding: 30px 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: white; margin: 0; font-size: 32px;">🔮 Oracle</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">Your personalized reading awaits</p>
        </div>

        <div class="content">
            <h2 style="color: #D4AF37; margin-bottom: 20px;">The veil has been lifted, {{name}} ✨</h2>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                Your personalized Oracle reading has been unlocked.
                The cards have been shuffled, and the message is clear.
            </p>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                <strong>What you'll discover:</strong>
            </p>

            <ul style="line-height: 2; color: #b0b0b0; margin-bottom: 30px;">
                <li>🔮 Your soulmate's cosmic signature</li>
                <li>🔮 When and where you'll meet</li>
                <li>🔮 Key personality traits</li>
                <li>🔮 What challenges you'll face together</li>
            </ul>

            <div style="text-align: center; margin: 40px 0;">
                <a href="{{reading_url}}" class="cta-button">View Your Reading 🔮</a>
            </div>

            <p style="text-align: center; font-size: 13px; color: #888;">
                This link is valid forever • Save it for later reference
            </p>
        </div>

        <div class="footer">
            <p style="margin: 0;">
                Sent from the cosmos above 🌌<br/>
                <a href="{{support_url}}" style="color: #666; text-decoration: underline;">Need Help?</a>
            </p>
        </div>
    </div>
</body>
</html>
        `,
    },

    /**
     * 订阅即将到期提醒（订阅结束前 3 天）
     */
    subscriptionExpiring: {
        subject: "⏰ Your Premium journey continues... Don't lose your cosmic access!",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Expiring</title>
    <style>
        body { font-family: 'Georgia', serif; background: #0a0a0a; color: #e0e0e0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .content { padding: 40px 20px; }
        .cta-button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); color: #0a0a0a; text-decoration: none; border-radius: 50px; font-weight: bold; }
        .footer { background: #0f0f0f; padding: 30px 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: white; margin: 0; font-size: 32px;">⏰ Don't Lose Your Cosmic Access</h1>
        </div>

        <div class="content">
            <h2 style="color: #D4AF37; margin-bottom: 20px;">Hi {{name}}, your Premium is expiring soon</h2>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                Your Premium subscription will end in {{days_left}} days.
                We'd hate for you to lose access to all the cosmic insights you've been enjoying.
            </p>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                <strong>You'll miss:</strong>
            </p>

            <ul style="line-height: 2; color: #b0b0b0; margin-bottom: 30px;">
                <li>❌ Unlimited AI-powered readings</li>
                <li>❌ Deep soulmate compatibility analysis</li>
                <li>❌ Future transit predictions</li>
                <li>❌ Priority Oracle access</li>
            </ul>

            <div style="background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); padding: 20px; border-radius: 10px; margin: 30px 0;">
                <p style="margin: 0; text-align: center; color: #D4AF37;">
                    <strong>Special Offer:</strong> Stay with us and get <strong>20% off</strong> your next payment!
                </p>
            </div>

            <div style="text-align: center;">
                <a href="{{renew_url}}" class="cta-button">Keep Your Premium Active ✨</a>
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0;">
                We'll miss you if you go 💫<br/>
                <a href="{{cancel_url}}" style="color: #666; text-decoration: underline;">No thanks, let it expire</a>
            </p>
        </div>
    </div>
</body>
</html>
        `,
    },

    /**
     * 用户重新激活邮件（30天未登录后）
     */
    reactivation: {
        subject: "✨ We miss you, {{name}}! The cosmos has something new for you...",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We Miss You</title>
    <style>
        body { font-family: 'Georgia', serif; background: #0a0a0a; color: #e0e0e0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .content { padding: 40px 20px; }
        .cta-button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; }
        .footer { background: #0f0f0f; padding: 30px 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: white; margin: 0; font-size: 32px;">✨ We Miss You!</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">Your cosmic journey awaits</p>
        </div>

        <div class="content">
            <h2 style="color: #D4AF37; margin-bottom: 20px;">It's been a while, {{name}} 🌙</h2>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                The stars have been moving since you last visited.
                There are new cosmic alignments waiting to be discovered.
            </p>

            <p style="line-height: 1.8; margin-bottom: 30px;">
                <strong>What's new at Auralume:</strong>
            </p>

            <ul style="line-height: 2; color: #b0b0b0; margin-bottom: 30px;">
                <li>✨ Enhanced Oracle readings</li>
                <li>✨ New compatibility features</li>
                <li>✨ Improved AI accuracy</li>
                <li>✨ New transit predictions</li>
            </ul>

            <div style="background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); padding: 20px; border-radius: 10px; margin: 30px 0;">
                <p style="margin: 0; text-align: center;">
                    <strong>Come back and get 20% off Premium!</strong><br/>
                    <span style="font-size: 13px; color: #888;">Special offer just for you</span>
                </p>
            </div>

            <div style="text-align: center;">
                <a href="{{cta_url}}&promo=WELCOME20" class="cta-button">Return to Auralume ✨</a>
            </div>

            <p style="text-align: center; font-size: 13px; color: #888; margin-top: 30px;">
                Can't wait to see you again! 💫
            </p>
        </div>

        <div class="footer">
            <p style="margin: 0;">
                <a href="{{unsubscribe_url}}" style="color: #666; text-decoration: underline;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
        `,
    },
};

/**
 * 替换模板中的变量
 */
export const replaceVariables = (template, variables) => {
    let result = template;
    Object.keys(variables).forEach(key => {
        const placeholder = `{{${key}}}`;
        const regex = new RegExp(placeholder, 'g');
        result = result.replace(regex, variables[key]);
    });
    return result;
};
