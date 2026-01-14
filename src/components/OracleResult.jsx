/**
 * OracleResult - Oracle 解锁结果展示
 *
 * 显示灵魂伴侣匹配结果，并提供一次性付费解锁功能
 * 使用 Paddle.js 处理支付流程
 *
 * @component
 */

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import soulmateImg from '../assets/soulmate.png';

// 从环境变量获取 Price ID
const ORACLE_PRICE_ID = import.meta.env.VITE_PADDLE_ORACLE_PRICE_ID || '';

const OracleResult = ({ image }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [loading, setLoading] = useState(false);

    /**
     * 处理解锁按钮点击
     */
    const handleUnlock = async () => {
        // 检查是否配置了 Paddle
        if (!ORACLE_PRICE_ID) {
            // 开发模式：模拟支付
            if (window.location.search.includes('demo=true') || import.meta.env.DEV) {
                const confirmUnlock = window.confirm("Dev Mode: Simulate $9.99 Payment Success?");
                if (confirmUnlock) {
                    setIsUnlocked(true);
                }
                return;
            }

            alert('Payment system is not configured. Please contact support.');
            return;
        }

        // 获取用户信息
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert('Please log in to unlock.');
            return;
        }

        setLoading(true);

        try {
            // 动态导入 Paddle
            const { openOnetimeCheckout } = await import('../lib/paddle');

            openOnetimeCheckout(ORACLE_PRICE_ID, {
                customerEmail: user.email,
                userId: user.id,
                onSuccess: (data) => {
                    console.log('✦ Payment successful:', data);
                    // 注意：实际状态更新由 Webhook 处理
                    // 这里立即解锁以提升用户体验
                    setIsUnlocked(true);
                    setLoading(false);
                },
                onClose: () => {
                    setLoading(false);
                },
            });

        } catch (error) {
            console.error('✗ Payment failed:', error);
            alert('Failed to open payment page. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto animate-fade-in pb-24 padding-top-safe px-4" style={{ justifyContent: 'flex-start', paddingTop: '2rem' }}>

            <div className="text-center mb-8">
                <h2 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '0.5rem' }}>Soulmate Found</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Compatibility Score: <span style={{ color: '#fff', fontWeight: 'bold' }}>98%</span></p>
            </div>

            {/* Soulmate Image - Locked/Unlocked */}
            <div className="relative mb-8 rounded-2xl overflow-hidden border border-white/20 shadow-2xl w-full max-w-[280px] mx-auto"
                style={{ aspectRatio: '4/5' }}>
                <img
                    src={image || soulmateImg}
                    alt="Soulmate"
                    className="w-full h-full object-cover transition-all duration-1000"
                    style={{
                        filter: isUnlocked ? 'none' : 'blur(15px) brightness(0.7)',
                    }}
                />

                {!isUnlocked && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '3rem' }}>🔒</span>
                        <p style={{ marginTop: '1rem', fontWeight: 500 }}>Portrait Locked</p>
                    </div>
                )}
            </div>

            {/* Reading Section */}
            <div className="glass-panel" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    The Astrological Insight
                </h3>

                <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    <p className="mb-4">
                        Your chart indicates a powerful connection with a Water sign heavily influenced by Mars.
                        They are intensely passionate, perhaps a bit mysterious at first glance.
                    </p>
                    <p>
                        You have likely crossed paths before without realizing it. Their energy is chaotic yet grounding for you...
                    </p>

                    {isUnlocked && (
                        <div className="animate-fade-in space-y-4" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <p>
                                <strong>Key Traits:</strong> Artistic, Loyal, Night-owl. <br />
                                <strong>Where to meet:</strong> Coffee shops near water, evening art exhibits. <br />
                                <strong>Warning:</strong> They take time to open up. Be patient.
                            </p>

                            {/* Branding / Jewelry Seed */}
                            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 p-4 rounded-lg border border-cyan-500/20">
                                <h4 className="text-sm font-serif text-cyan-200 mb-2 uppercase tracking-widest">Energy Stabilizer</h4>
                                <p className="text-xs text-white/70 mb-3">
                                    Your aura reading detects a fluctuation in your <b>Throat Chakra</b> (Blue Energy).
                                    To stabilize this frequency and attract your cosmic match, we recommend:
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-400/20 rounded-full border border-blue-400 shadow-[0_0_10px_#60A5FA] flex items-center justify-center text-xl">💎</div>
                                    <div>
                                        <div className="text-white font-serif">Glacial Blue Diamond</div>
                                        <div className="text-[10px] text-cyan-400 cursor-pointer hover:underline">View AuraLume Collection ›</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem', color: '#D4AF37', textAlign: 'center', fontStyle: 'italic' }}>
                                Auralume: See your light. Own the aura.
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA / Unlock */}
            {!isUnlocked ? (
                <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                    {!ORACLE_PRICE_ID && !window.location.search.includes('demo=true') ? (
                        /* 开发环境提示 */
                        <div className="flex flex-col gap-2">
                            <div className="text-[10px] text-yellow-500/50 uppercase tracking-widest mb-1">Dev Environment Detected</div>
                            <button
                                onClick={handleUnlock}
                                className="btn-cosmic w-full"
                            >
                                Simulate Pay $9.99
                            </button>
                        </div>
                    ) : (
                        /* 生产环境 - Paddle 支付 */
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleUnlock}
                                disabled={loading}
                                className="btn-cosmic w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin">⏳</span>
                                        Processing...
                                    </span>
                                ) : (
                                    `Unlock Full Reading - $9.99`
                                )}
                            </button>

                            {/* 信任标记 */}
                            <div className="flex items-center justify-center gap-3 text-[10px] text-white/40">
                                <span>🔒 Secure Checkout</span>
                                <span>•</span>
                                <span>One-time Payment</span>
                            </div>
                        </div>
                    )}

                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>
                        Secured by Paddle. Instant access after payment.
                    </p>
                </div>
            ) : (
                <div className="flex justify-center w-full mt-8 mb-12">
                    <button
                        onClick={async () => {
                            const shareData = {
                                title: 'Auralume Soulmate Result',
                                text: 'I just discovered my cosmic soulmate signature on Auralume. ✨',
                                url: window.location.href
                            };
                            try {
                                if (navigator.share) {
                                    await navigator.share(shareData);
                                } else {
                                    await navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }
                            } catch (err) {
                                console.error('Share failed:', err);
                            }
                        }}
                        className="btn-cosmic flex items-center gap-2 mx-auto"
                    >
                        <span>Share Result</span> 📤
                    </button>
                </div>
            )}

        </div>
    );
};

export default OracleResult;
