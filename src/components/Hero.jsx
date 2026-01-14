/**
 * Hero - 优化后的首页英雄区
 *
 * 针对 18-35 岁女性用户优化
 * 增加社会证明、信任元素和转化动力
 *
 * @component
 */

import { useState, useEffect } from 'react';
import { Sparkles, Heart, Shield, Star } from 'lucide-react';

const Hero = ({ onStart }) => {
    const [userCount, setUserCount] = useState(0);

    // 动态用户数增长效果
    useEffect(() => {
        const baseCount = 12847;
        const interval = setInterval(() => {
            setUserCount(prev => {
                const increment = Math.floor(Math.random() * 3);
                return prev + increment;
            });
        }, 5000);

        setUserCount(baseCount);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-12">

            {/* 顶部标签 - 社会证明 */}
            <div className="mb-6 fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                    <Sparkles size={14} className="text-gold" />
                    <span className="text-xs text-white/80 tracking-wide">
                        Over <span className="text-gold font-bold">{userCount.toLocaleString()}</span> souls guided
                    </span>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* 主标题 */}
            <div className="mb-8 fade-in-up">
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-serif block mb-4 border-b border-white/10 pb-4 w-24 mx-auto">
                    Auralume
                </span>
                <h1 className="text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 mb-6 drop-shadow-2xl">
                    The Universe<br />Has A Message
                </h1>
                <p className="text-gray-300 font-light text-lg tracking-wide max-w-sm mx-auto leading-relaxed">
                    Unlock the secrets of your soul, discover your cosmic connections,
                    and find the path written in your stars.
                </p>
            </div>

            {/* CTA 按钮 */}
            <div className="fade-in-up delay-200 mb-8">
                <button
                    onClick={() => {
                        window.dispatchEvent(new Event('START_COSMIC_AUDIO'));
                        onStart();
                    }}
                    className="btn-cosmic group relative overflow-hidden"
                >
                    <span className="relative z-10">Reveal My Soulmate ✨</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <p className="text-xs text-white/40 mt-3">
                    Free initial reading • No credit card required
                </p>
            </div>

            {/* 信任元素 */}
            <div className="fade-in-up delay-300 space-y-4">
                {/* 社会证明 */}
                <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-gold fill-gold" />
                    ))}
                    <span className="text-xs text-white/60 ml-2">
                        Loved by <span className="text-white/80"> thousands worldwide</span>
                    </span>
                </div>

                {/* 标签 */}
                <div className="flex items-center justify-center space-x-2 text-xs text-gold/80 tracking-widest uppercase">
                    <span>★</span>
                    <span>Astrology</span>
                    <span>•</span>
                    <span>Spirituality</span>
                    <span>•</span>
                    <span>Love</span>
                    <span>★</span>
                </div>

                {/* 信任徽章 */}
                <div className="flex items-center justify-center gap-6 mt-6 opacity-60">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <Shield size={12} />
                        <span>Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <Heart size={12} />
                        <span>Made with Love</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Hero;
