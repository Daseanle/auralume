import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';

const OracleScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-background-dark font-display text-white overflow-hidden h-screen w-full flex flex-col antialiased relative"
    >
       {/* Background */}
       <div className="absolute inset-0 z-0 bg-void overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[-10%] left-[-20%] w-[140%] h-[80%] rounded-full bg-[#2b2b73]/40 blur-[120px] mix-blend-screen"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute top-[10%] right-[-10%] w-[80%] h-[60%] rounded-full bg-[#4B0082]/30 blur-[100px] mix-blend-screen"
          />
          
          <div className="relative w-full h-full flex items-center justify-center pb-20">
             <motion.div 
                initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="w-full aspect-[4/5] max-w-md mx-auto mix-blend-lighten relative"
             >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('${IMAGES.AURA_REVEAL}')`,
                    maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
                  }}
                ></div>
                {/* Aura Pulse Overlay */}
                <motion.div 
                   animate={{ opacity: [0, 0.5, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute inset-0 bg-gold/20 mix-blend-overlay rounded-full blur-3xl"
                ></motion.div>
             </motion.div>
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
       </div>

       {/* Header */}
       <header className="absolute top-0 left-0 w-full z-20 p-4 pt-12 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
             <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex flex-col items-center">
             <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80 font-bold shadow-black drop-shadow-md">AuraLume</span>
             <h1 className="text-sm font-cinzel text-white tracking-widest uppercase">Oracle Reveal</h1>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all">
             <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
       </header>

       {/* Bottom Sheet Content */}
       <motion.main 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.2 }}
          className="relative z-10 w-full px-4 pb-8 pt-12 bg-gradient-to-t from-black via-black/95 to-transparent mt-auto flex flex-col justify-end h-full pointer-events-none"
       >
          <div className="pointer-events-auto relative w-full max-w-md mx-auto backdrop-blur-2xl bg-[#0a0a12]/80 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_-10px_rgba(43,43,115,0.4)]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70"></div>
             
             <div className="p-6 flex flex-col items-center text-center gap-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 shadow-[0_0_15px_-5px_#D4AF37]"
                >
                   <span className="material-symbols-outlined text-gold text-[14px]">auto_awesome</span>
                   <span className="text-[10px] font-bold tracking-widest text-gold uppercase">The Alchemist</span>
                </motion.div>

                <h2 className="text-2xl text-white font-cinzel leading-tight tracking-wide drop-shadow-lg">Your Soulmate Aura</h2>
                <div className="w-8 h-[1px] bg-white/20 my-1"></div>
                
                <div className="text-white/90 font-display text-base leading-relaxed italic">
                   "A connection forged in starlight, blending the ambition of gold with the mystery of the deep void. They connect with your need for silence and your ambition for the stars."
                </div>

                <div className="grid grid-cols-3 gap-3 w-full mt-2">
                   {[
                     { label: 'Element', val: 'Ether' },
                     { label: 'Sign', val: 'Pisces' },
                     { label: 'Energy', val: 'Kinetic' }
                   ].map((item, i) => (
                      <motion.div 
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + (i * 0.1) }}
                        className="flex flex-col items-center gap-1 p-2 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                      >
                         <span className="text-[10px] text-white/50 uppercase tracking-widest">{item.label}</span>
                         <span className="text-sm text-gold-light font-display font-medium">{item.val}</span>
                      </motion.div>
                   ))}
                </div>

                <div className="h-2"></div>

                <button 
                   onClick={() => navigate('/reading')}
                   className="group relative w-full overflow-hidden rounded-lg p-[1px] focus:outline-none transition-transform active:scale-[0.98]"
                >
                   <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#D4AF37_0%,#2b2b73_50%,#D4AF37_100%)] opacity-70 group-hover:opacity-100 transition-opacity"></span>
                   <div className="relative flex h-12 w-full items-center justify-center bg-[#050505] group-hover:bg-[#1a1a2e] transition-colors rounded-lg px-6 gap-3">
                      <span className="material-symbols-outlined text-gold animate-pulse text-[20px]">lock_open</span>
                      <div className="flex flex-col items-start leading-none text-left">
                         <span className="text-gold-light text-sm font-bold tracking-wide uppercase">Unlock Deep Report</span>
                         <span className="text-[10px] text-white/50 mt-0.5 group-hover:text-white/70">$4.99 • Timeline & Compatibility</span>
                      </div>
                   </div>
                </button>

                <p className="text-[10px] text-white/30 text-center font-mono">Daily Oracle refresh in 14h 23m</p>
             </div>
          </div>
       </motion.main>

       {/* Bottom Nav */}
       <nav className="w-full bg-black border-t border-white/10 px-6 py-3 pb-6 flex justify-between items-center z-20">
          <div className="flex flex-col items-center gap-1 text-white/40 cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/home')}>
             <span className="material-symbols-outlined text-[24px]">home</span>
             <span className="text-[10px] font-medium">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gold cursor-pointer">
             <span className="material-symbols-outlined text-[24px]">visibility</span>
             <span className="text-[10px] font-medium">Oracle</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/40 cursor-pointer hover:text-white transition-colors">
             <span className="material-symbols-outlined text-[24px]">diamond</span>
             <span className="text-[10px] font-medium">Shop</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/40 cursor-pointer hover:text-white transition-colors">
             <span className="material-symbols-outlined text-[24px]">person</span>
             <span className="text-[10px] font-medium">Profile</span>
          </div>
       </nav>
    </motion.div>
  );
};

export default OracleScreen;