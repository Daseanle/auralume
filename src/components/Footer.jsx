/**
 * Footer - 网站页脚组件
 *
 * 包含所有法律页面链接，满足 Paddle 域名审核要求：
 * - Terms and Conditions
 * - Privacy Policy
 * - Refund Policy
 * - Pricing
 *
 * @component
 */

import { NavLink } from 'react-router-dom';
import { Heart, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Legal',
            links: [
                { to: '/terms', label: 'Terms of Service' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/refund', label: 'Refund Policy' },
            ]
        },
        {
            title: 'Company',
            links: [
                { to: '/pricing', label: 'Pricing' },
                { to: '/horoscope', label: 'Daily Horoscope' },
                { to: '/about', label: 'About Us' },
            ]
        },
        {
            title: 'Support',
            links: [
                { to: 'mailto:support@shopauralume.com', label: 'Contact Us', external: true },
                { to: 'mailto:marshall@shopauralume.com', label: 'Business Inquiry', external: true },
            ]
        }
    ];

    return (
        <footer className="bg-black/50 border-t border-white/10 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* 主要内容区 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* 品牌信息 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} className="text-gold" />
                            <h3 className="text-xl font-serif text-gold tracking-wider">AURALUME</h3>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">
                            AI-powered astrology and soulmate discovery. Your cosmic journey starts here.
                        </p>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <span>Made with</span>
                            <Heart size={14} className="fill-gold text-gold" />
                            <span>for cosmic explorers</span>
                        </div>
                    </div>

                    {/* 链接分组 */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-3">
                            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.to}>
                                        {link.external ? (
                                            <a
                                                href={link.to}
                                                className="text-sm text-white/50 hover:text-gold transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <NavLink
                                                to={link.to}
                                                className={({ isActive }) =>
                                                    `text-sm transition-colors ${isActive
                                                        ? 'text-gold'
                                                        : 'text-white/50 hover:text-gold'
                                                    }`
                                                }
                                            >
                                                {link.label}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 分隔线 */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* 版权信息 */}
                        <p className="text-xs text-white/40 text-center md:text-left">
                            © {currentYear} Auralume. All rights reserved.
                        </p>

                        {/* 支付方式 */}
                        <div className="flex items-center gap-3 text-xs text-white/40">
                            <span>Secure payments powered by</span>
                            <span className="font-semibold text-white/60">Paddle</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
