import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] h-16 z-50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-evenly px-2 backdrop-blur-xl bg-[#0a0a12]/90 border border-white/10 ring-1 ring-white/5">
      <button 
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
          isActive('/home') 
            ? 'text-gold bg-white/10 shadow-[0_0_15px_rgba(212,175,55,0.15)] scale-110' 
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive('/home') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
      </button>
      
      <button 
        onClick={() => navigate('/search')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
          isActive('/search')
            ? 'text-gold bg-white/10 shadow-[0_0_15px_rgba(212,175,55,0.15)] scale-110'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[24px]">search</span>
      </button>
      
      <div className="w-[1px] h-6 bg-white/10"></div>
      
      <button 
        onClick={() => navigate('/cart')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative ${
          isActive('/cart')
            ? 'text-gold bg-white/10 shadow-[0_0_15px_rgba(212,175,55,0.15)] scale-110'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
        <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_5px_#D4AF37] animate-pulse"></span>
      </button>
      
      <button 
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
          isActive('/profile')
            ? 'text-gold bg-white/10 shadow-[0_0_15px_rgba(212,175,55,0.15)] scale-110'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[24px]">account_circle</span>
      </button>
    </nav>
  );
};

export default FloatingNav;