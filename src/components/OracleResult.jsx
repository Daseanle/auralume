import React, { useState } from 'react';
import soulmateImg from '../assets/soulmate.png';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OracleResult = ({ image }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleUnlock = () => {
        const confirmUnlock = window.confirm("Simulate $9.99 Payment Success?");
        if (confirmUnlock) {
            setIsUnlocked(true);
        }
    };

    return (
        <div className="flex flex-col items-center w-full animate-fade-in" style={{ justifyContent: 'flex-start', paddingTop: '2rem' }}>

            <div className="text-center mb-8">
                <h2 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '0.5rem' }}>Soulmate Found</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Compatibility Score: <span style={{ color: '#fff', fontWeight: 'bold' }}>98%</span></p>
            </div>

            {/* Soulmate Image - Locked/Unlocked */}
            <div style={{
                position: 'relative',
                width: '280px', height: '350px',
                marginBottom: '2rem',
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <img
                    src={image || soulmateImg}
                    alt="Soulmate"
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: isUnlocked ? 'none' : 'blur(15px) brightness(0.7)',
                        transition: 'all 1s'
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

                            {/* NEW: Branding / Jewelry Seed */}
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
            {/* CTA / Unlock */}
            {!isUnlocked ? (
                <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>

                    {(import.meta.env.VITE_PAYPAL_CLIENT_ID && import.meta.env.VITE_PAYPAL_CLIENT_ID !== "test") ? (
                        /* REAL PAYPAL MODE */
                        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                            <PayPalButtons
                                style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: { value: "9.99" },
                                            description: "Auralume Soulmate Unlock"
                                        }],
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    const details = await actions.order.capture();
                                    console.log("Payment Successful:", details);
                                    setIsUnlocked(true);
                                }}
                                onError={(err) => {
                                    console.error("PayPal Error:", err);
                                    alert("Gateway Error: Check Vercel Environment Variables. " + JSON.stringify(err.message));
                                }}
                            />
                        </PayPalScriptProvider>
                    ) : (
                        /* DEV / MOCK MODE (Fallback if no key is set) */
                        <div className="flex flex-col gap-2">
                            <div className="text-[10px] text-yellow-500/50 uppercase tracking-widest mb-1">Dev Environment Detected</div>
                            <button
                                onClick={handleUnlock}
                                className="btn-cosmic w-full"
                            >
                                Simulate Pay $9.99
                            </button>
                        </div>
                    )}

                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>
                        Secured by PayPal. One-time payment.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
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
                        className="btn-cosmic"
                        style={{ margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span>Share Result</span> 📤
                    </button>
                </div>
            )}

        </div>
    );
};

export default OracleResult;
