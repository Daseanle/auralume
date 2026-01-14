import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Moon, Heart, MessageCircle, User } from 'lucide-react';
import bgNebula from '../assets/bg-nebula.png';
import CosmicPlayer from './CosmicPlayer';
import Footer from './Footer';

const AppLayout = () => {
    return (
        <div className="relative min-h-screen flex flex-col">

            <CosmicPlayer />

            {/* GLOBAL BACKGROUND - Persists across routes */}
            <div className="bg-cosmic">
                <img src={bgNebula} alt="Nebula" className="bg-image" />
                <div className="noise-overlay"></div>
                <div className="vignette"></div>
            </div>

            {/* PAGE CONTENT */}
            {/* Added padding-bottom to avoid content being hidden behind bottom nav */}
            <div className="flex-1 pb-24 overflow-y-auto flex flex-col">
                <Outlet />
                <Footer />
            </div>

            {/* BOTTOM NAVIGATION */}
            <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 pt-2">
                <div className="glass-panel mx-auto max-w-md flex justify-between items-center px-6 py-4" style={{ borderRadius: '50px', backdropFilter: 'blur(25px)' }}>

                    <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
                        <Sparkles size={24} strokeWidth={1.5} />
                        <span className="text-[10px] tracking-wider font-sans">Home</span>
                    </NavLink>

                    <NavLink to="/tarot" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
                        <Moon size={24} strokeWidth={1.5} />
                        <span className="text-[10px] tracking-wider font-sans">Tarot</span>
                    </NavLink>

                    {/* Center Call-to-Action (Soulmate) */}
                    <NavLink to="/soulmate" className="relative -top-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-[#8a7329] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] border-4 border-[#0a0a0a]">
                            <Heart size={28} color="#000" fill="#000" />
                        </div>
                    </NavLink>

                    <NavLink to="/chat" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
                        <MessageCircle size={24} strokeWidth={1.5} />
                        <span className="text-[10px] tracking-wider font-sans">Chat</span>
                    </NavLink>

                    <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
                        <User size={24} strokeWidth={1.5} />
                        <span className="text-[10px] tracking-wider font-sans">Me</span>
                    </NavLink>

                </div>
            </nav>

        </div>
    );
};

export default AppLayout;
