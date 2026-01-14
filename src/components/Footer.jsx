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
        <footer className="relative mt-auto border-t border-white/5 bg-black/40 backdrop-blur-md">
            <div className="max-w-4xl mx-auto px-6 py-12">

                <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">

                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start gap-3 max-w-xs">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-gold" />
                            <span className="text-lg font-serif text-gold tracking-[0.2em]">AURALUME</span>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed font-light">
                            Illuminating your cosmic path through AI-powered astrology and soulmate synastry.
                        </p>
                    </div>

                    {/* Links Section - Compact Grid */}
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                        {footerLinks.map((section) => (
                            <div key={section.title} className="flex flex-col gap-3">
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-sans">
                                    {section.title}
                                </h4>
                                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                                    {section.links.map((link) => (
                                        <li key={link.to}>
                                            {link.external ? (
                                                <a
                                                    href={link.to}
                                                    className="text-xs text-white/60 hover:text-gold transition-colors no-underline block py-0.5"
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <NavLink
                                                    to={link.to}
                                                    className={({ isActive }) =>
                                                        `text-xs transition-colors no-underline block py-0.5 ${isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
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
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-sans">
                    <p>© {currentYear} Auralume. All star-rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span>Secured by</span>
                            <span className="text-white/50 font-bold">Paddle</span>
                        </div>
                        <div className="w-px h-3 bg-white/10"></div>
                        <div className="flex items-center gap-1">
                            <span>Made with</span>
                            <Heart size={10} className="text-gold fill-gold/50" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
