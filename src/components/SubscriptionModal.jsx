/**
 * SubscriptionModal - Paddle 订阅支付组件
 *
 * 提供 Auralume Premium 月付和年付订阅选项
 * 使用 Paddle.js 处理支付流程
 *
 * @component
 */

import { useState, useEffect } from 'react';
import { Check, X, Shield, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

// 从环境变量获取 Price IDs
const MONTHLY_PRICE_ID = import.meta.env.VITE_PADDLE_MONTHLY_PRICE_ID || '';
const YEARLY_PRICE_ID = import.meta.env.VITE_PADDLE_YEARLY_PRICE_ID || '';

const SubscriptionModal = ({ onClose, onSuccess }) => {
    const [plan, setPlan] = useState('monthly'); // monthly, yearly
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    // 获取当前用户信息
    useEffect(() => {
        const getUserInfo = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email);
                setUserId(user.id);
            }
        };
        getUserInfo();
    }, []);

    /**
     * 处理订阅按钮点击
     */
    const handleSubscribe = async (priceId) => {
        if (!priceId) {
            alert('Payment system is not configured. Please contact support.');
            return;
        }

        if (!userEmail) {
            alert('Please log in to subscribe.');
            return;
        }

        setLoading(true);

        try {
            // 动态导入 Paddle（避免首屏加载问题）
            const { openSubscriptionCheckout } = await import('../lib/paddle');

            openSubscriptionCheckout(priceId, {
                customerEmail: userEmail,
                userId: userId,
                onSuccess: (data) => {
                    console.log('✦ Payment successful:', data);
                    // 注意：实际的 is_premium 更新由 Webhook 处理
                    // 这里只是显示成功提示
                    alert('🎉 Payment successful! Your premium features will be activated shortly.');
                    if (onSuccess) onSuccess();
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

    /**
     * 计算年付折扣
     */
    const yearlyDiscount = Math.round(((9.99 * 12 - 99.99) / (9.99 * 12)) * 100);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 背景遮罩 */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* 模态框主体 */}
            <div className="bg-[#1a1a1a] border border-gold/30 w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 animate-fade-in flex flex-col md:flex-row shadow-[0_0_50px_rgba(212,175,55,0.2)]">

                {/* 关闭按钮 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/30 hover:text-white z-20 transition-colors"
                    disabled={loading}
                >
                    <X size={24} />
                </button>

                {/* 左侧面板：价值主张 */}
                <div className="p-8 md:w-1/2 bg-gradient-to-br from-purple-900/50 to-black flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-gold mb-6">
                            <Shield size={20} />
                            <span className="uppercase tracking-widest text-xs font-bold">Auralume Premium</span>
                        </div>
                        <h2 className="text-3xl font-serif text-white mb-4">Unlock Your <br />Full Cosmic Potential</h2>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                <span>Unlimited AI Readings</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                <span>Deep Soulmate Synastry</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                <span>Future Transit Alerts</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                <span>Priority Oracle Access</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                <span>Ad-free Experience</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-xs text-white/40 italic">
                            "The clarity I received changed my career path entirely." — Sarah L.
                        </p>
                    </div>
                </div>

                {/* 右侧面板：结账 */}
                <div className="p-8 md:w-1/2 bg-[#121212] flex flex-col">

                    {/* 方案切换器 */}
                    <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                        <button
                            onClick={() => setPlan('monthly')}
                            disabled={loading}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                                plan === 'monthly'
                                    ? 'bg-gold text-black shadow-lg'
                                    : 'text-white/40 hover:text-white'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setPlan('yearly')}
                            disabled={loading}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all relative ${
                                plan === 'yearly'
                                    ? 'bg-gold text-black shadow-lg'
                                    : 'text-white/40 hover:text-white'
                            }`}
                        >
                            Yearly
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                                SAVE {yearlyDiscount}%
                            </span>
                        </button>
                    </div>

                    {/* 价格显示和支付按钮 */}
                    <div className="flex-1 flex flex-col justify-center space-y-4">

                        {/* 月付选项 */}
                        {plan === 'monthly' && (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white mb-1">$9.99</div>
                                    <div className="text-sm text-white/50">per month</div>
                                </div>
                                <button
                                    onClick={() => handleSubscribe(MONTHLY_PRICE_ID)}
                                    disabled={loading}
                                    className="w-full py-3 bg-gold hover:bg-gold/80 text-black font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={18} />
                                            <span>Subscribe Now</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* 年付选项 */}
                        {plan === 'yearly' && (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white mb-1">$99.99</div>
                                    <div className="text-sm text-white/50">per year</div>
                                    <div className="text-xs text-green-400 mt-2">
                                        ≈ $8.33/month (Save ${yearlyDiscount}%)
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSubscribe(YEARLY_PRICE_ID)}
                                    disabled={loading}
                                    className="w-full py-3 bg-gold hover:bg-gold/80 text-black font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={18} />
                                            <span>Subscribe Now</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* 信任标记 */}
                        <div className="flex items-center justify-center gap-4 text-xs text-white/30 pt-4">
                            <div className="flex items-center gap-1">
                                <Shield size={12} />
                                <span>Secure Checkout</span>
                            </div>
                            <div>•</div>
                            <div>Cancel Anytime</div>
                        </div>

                    </div>

                    {/* 底部说明 */}
                    <p className="text-[10px] text-center text-white/20 mt-4 leading-relaxed">
                        Secured by Paddle. 14-day money-back guarantee.<br />
                        By subscribing, you agree to our{' '}
                        <a href="/terms" className="underline hover:text-white/40">Terms</a>
                        {' '}and{' '}
                        <a href="/privacy" className="underline hover:text-white/40">Privacy Policy</a>.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
