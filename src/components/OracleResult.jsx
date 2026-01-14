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

const OracleResult = ({ image, readingData }) => {
    // ... (state logic remains)

    // Fallback if no data (e.g. dev mode or error)
    const persona = readingData?.persona || "The Cosmic Mystery";
    const traits = readingData?.traits || "Intense, Loyal, Mysterious";
    const meetingPlace = readingData?.meetingPlace || "Somewhere near moving water";
    const analysis = readingData?.analysis || "Your charts indicate a powerful karmic bond. This soul likely has strong Scorpionic or Plutonian influence, bringing transformation into your life.";

    // ...

    {/* Reading Section */ }
    <div className="glass-panel" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
            The Astrological Insight: <span className="text-gold font-serif block mt-1 text-lg">{persona}</span>
        </h3>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            <p className="mb-4 font-light italic text-white/60">
                "{analysis}"
            </p>

            {isUnlocked && (
                <div className="animate-fade-in space-y-4" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white/5 p-3 rounded border border-white/10">
                            <h4 className="text-[10px] uppercase tracking-widest text-gold mb-1">Soul Signature</h4>
                            <p className="text-sm text-white">{traits}</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded border border-white/10">
                            <h4 className="text-[10px] uppercase tracking-widest text-gold mb-1">Destined Meeting</h4>
                            <p className="text-sm text-white">{meetingPlace}</p>
                        </div>
                    </div>

                    {/* Branding / Jewelry Seed (Keep hardcoded or generic for now) */}
                    <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 p-4 rounded-lg border border-cyan-500/20 mt-4">
                        <h4 className="text-sm font-serif text-cyan-200 mb-2 uppercase tracking-widest">Energy Stabilizer</h4>
                        <p className="text-xs text-white/70 mb-3">
                            Your aura reading detects a fluctuation in your <b>Throat Chakra</b>.
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
                </div>
            )}

            {!isUnlocked && (
                <div className="mt-4 p-3 bg-gold/5 border border-gold/10 rounded text-center">
                    <p className="text-xs text-gold/80 italic">
                        "The stars have revealed {persona}. Unlock to see their face and where to find them."
                    </p>
                </div>
            )}
        </div>
    </div>

    {/* CTA / Unlock */ }
    {
        !isUnlocked ? (
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
    )
    }

        </div >
    );
};

export default OracleResult;
