import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Check, X, Shield, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Replace with your Live Client ID when ready
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "test"; // 'test' enables Sandbox mode

const SubscriptionModal = ({ onClose, onSuccess }) => {
    const [plan, setPlan] = useState('monthly'); // monthly, yearly

    const handleApprove = async (data, actions) => {
        // In a real app, you would verify the transaction on your backend here
        console.log("Payment Approved:", data);

        // Upgrade User in DB
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { error } = await supabase
                .from('profiles')
                .update({ is_premium: true })
                .eq('id', user.id);

            if (error) {
                console.error("Upgrade failed:", error);
                alert("Payment received but upgrade failed. Contact support.");
            } else {
                onSuccess();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            <div className="bg-[#1a1a1a] border border-gold/30 w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 animate-fade-in flex flex-col md:flex-row shadow-[0_0_50px_rgba(212,175,55,0.2)]">

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white z-20">
                    <X size={24} />
                </button>

                {/* Left Panel: Value Prop */}
                <div className="p-8 md:w-1/2 bg-gradient-to-br from-purple-900/50 to-black flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-gold mb-6">
                            <Shield size={20} />
                            <span className="uppercase tracking-widest text-xs font-bold">Auralume Premium</span>
                        </div>
                        <h2 className="text-3xl font-serif text-white mb-4">Unlock Your <br />Full Cosmic Potential</h2>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li className="flex items-start gap-3"><Check size={16} className="text-green-400 mt-1" /> Unlimited AI Readings</li>
                            <li className="flex items-start gap-3"><Check size={16} className="text-green-400 mt-1" /> Deep Soulmate Synastry</li>
                            <li className="flex items-start gap-3"><Check size={16} className="text-green-400 mt-1" /> Future Transit Alerts</li>
                            <li className="flex items-start gap-3"><Check size={16} className="text-green-400 mt-1" /> Priority Oracle Access</li>
                        </ul>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-xs text-white/40 italic">"The clarity I received changed my career path entirely." — Sarah L.</p>
                    </div>
                </div>

                {/* Right Panel: Checkout */}
                <div className="p-8 md:w-1/2 bg-[#121212] flex flex-col">

                    {/* Plan Switcher */}
                    <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                        <button
                            onClick={() => setPlan('monthly')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${plan === 'monthly' ? 'bg-gold text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                        >
                            Monthly ($9.99)
                        </button>
                        <button
                            onClick={() => setPlan('yearly')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${plan === 'yearly' ? 'bg-gold text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                        >
                            Yearly ($99.99)
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-h-[200px]">
                        <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
                            <PayPalButtons
                                style={{ layout: "vertical", color: "gold", shape: "pill", label: "checkout" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: { value: plan === 'monthly' ? "9.99" : "99.99" },
                                            description: `Auralume ${plan} subscription`
                                        }],
                                    });
                                }}
                                onApprove={handleApprove}
                            />
                        </PayPalScriptProvider>
                    </div>

                    <p className="text-[10px] text-center text-white/20 mt-4">
                        Secured by PayPal. Cancel anytime. <br />
                        By subscribing, you agree to our Terms & Privacy Policy.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
