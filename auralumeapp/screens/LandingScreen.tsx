import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';

const LandingScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-nebula-start via-[#240C4A] to-nebula-end"></div>
      
      {/* Light Leaks */}
      <div className="fixed top-[-20%] left-[-20%] w-[80%] h-[60%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px] mix-blend-screen"></div>
      
      {/* Noise Texture */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none mix-blend-overlay"></div>
      
      {/* Header */}
      <header className="relative z-50 w-full flex items-center justify-between px-6 py-6 pt-12">
         <div className="w-12"></div>
         <h2 className="text-white text-2xl font-display font-light tracking-[0.1em] text-center drop-shadow-lg">
            AuraLume
         </h2>
         <div className="w-12 flex justify-end">
            <button 
               onClick={() => navigate('/menu')}
               className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
            >
               <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
         </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center px-6 pb-20 w-full max-w-lg">
        <div className="w-full glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center gap-6 animate-float relative overflow-hidden shadow-2xl">
          {/* Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Image */}
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img 
              src={IMAGES.LANDING_HERO} 
              alt="Cosmic Jewelry" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Decorative border */}
            <div className="absolute inset-0 border border-white/10 m-3 rounded opacity-50 z-20"></div>
          </div>

          {/* Typography */}
          <div className="flex flex-col gap-3 text-center z-20 mt-2">
            <h1 className="text-white text-3xl font-display font-light leading-tight tracking-wide">
              The Cosmos, <span className="italic text-gold/90 font-normal">Crafted.</span>
            </h1>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto my-1"></div>
            <p className="text-white/70 text-sm font-light leading-relaxed max-w-[90%] mx-auto">
               AI-generated talismans synchronized with your unique astrological signature.
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => navigate('/home')}
            className="relative w-full group overflow-hidden rounded-lg mt-2 h-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#1a1a5c] opacity-100"></div>
            <div className="absolute inset-0 border border-gold/40 rounded-lg group-hover:border-gold/80 transition-colors duration-500"></div>
            <div className="relative flex items-center justify-center h-full px-6 gap-3">
              <span className="text-white text-sm font-bold uppercase tracking-[0.15em] drop-shadow-md group-hover:text-gold transition-colors">
                Begin the Alignment
              </span>
              <span className="material-symbols-outlined text-gold text-lg group-hover:translate-x-1 transition-transform">auto_awesome</span>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center justify-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[#9f9fbc] text-xs font-medium uppercase tracking-[0.2em]">Discover the Ritual</span>
        <div className="text-gold animate-bounce">
          <span className="material-symbols-outlined text-xl">keyboard_arrow_down</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingScreen;