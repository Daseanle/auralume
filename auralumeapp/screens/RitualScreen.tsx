import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';

const RitualScreen: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({ iso: 800, coherence: 0, freq: 432 });

  useEffect(() => {
    // Simulate HUD metric updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        iso: 800 + Math.floor(Math.random() * 120 - 60),
        coherence: Math.min(100, Math.max(0, prev.coherence + (scanning ? 2 : -1) + Math.random() * 5)),
        freq: 432 + Math.floor(Math.random() * 10)
      }));
    }, 200);
    return () => clearInterval(interval);
  }, [scanning]);

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate('/oracle'), 500);
      }
    }, 35);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-void"
    >
      {/* Background (Camera Feed) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-70 scale-105"
          style={{ backgroundImage: `url('${IMAGES.SCANNER_BG}')` }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#050505_100%)] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay animate-pulse-slow"></div>
      </div>

      {/* HUD Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
         {/* Top HUD */}
         <div className="flex justify-between items-start pt-12">
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-mono text-red-500/80 tracking-widest">REC</span>
               </div>
               <span className="text-[10px] font-mono text-white/40 tracking-widest">AURA_LAYER_1</span>
            </div>
            <div className="text-right flex flex-col gap-1">
               <span className="text-[10px] font-mono text-white/60 tracking-widest">ISO {metrics.iso}</span>
               <span className="text-[10px] font-mono text-white/60 tracking-widest">{metrics.freq} Hz</span>
            </div>
         </div>
      </div>

      {/* Top Nav */}
      <div className="relative z-30 flex items-center justify-between p-6 pt-12">
        <button 
          onClick={() => navigate('/home')}
          className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white transition hover:bg-white/10 hover:border-gold/50"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="font-display text-lg font-bold tracking-widest text-white/90 uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Soulmate Ritual</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-1 w-1 rounded-full bg-gold shadow-[0_0_5px_#D4AF37]"></span>
            <span className="text-[10px] tracking-[0.2em] text-gold/80 font-bold uppercase">Step 2 of 4</span>
            <span className="h-1 w-1 rounded-full bg-gold shadow-[0_0_5px_#D4AF37]"></span>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white transition hover:bg-white/10">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>

      {/* Scanner Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-8 pb-24">
        {/* Frame - Now Clickable */}
        <div 
           onClick={startScan}
           className={`relative w-full max-w-[320px] aspect-[3/4] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[2px] shadow-2xl overflow-hidden group transition-all duration-300 ${!scanning ? 'cursor-pointer hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] active:scale-95' : ''}`}
        >
           {/* Animated Corners */}
           <div className={`absolute -top-[1px] -left-[1px] h-8 w-8 rounded-tl-3xl border-t-2 border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-500 ${scanning ? 'h-12 w-12 border-gold' : 'border-gold/50'}`}></div>
           <div className={`absolute -top-[1px] -right-[1px] h-8 w-8 rounded-tr-3xl border-t-2 border-r-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-500 ${scanning ? 'h-12 w-12 border-gold' : 'border-gold/50'}`}></div>
           <div className={`absolute -bottom-[1px] -left-[1px] h-8 w-8 rounded-bl-3xl border-b-2 border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-500 ${scanning ? 'h-12 w-12 border-gold' : 'border-gold/50'}`}></div>
           <div className={`absolute -bottom-[1px] -right-[1px] h-8 w-8 rounded-br-3xl border-b-2 border-r-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-500 ${scanning ? 'h-12 w-12 border-gold' : 'border-gold/50'}`}></div>
           
           {/* Hand Guide - Breathing Animation */}
           <motion.div 
             animate={{ 
               opacity: scanning ? 0.1 : 0.3, 
               scale: scanning ? 0.95 : [1, 1.05, 1] 
             }}
             transition={{ 
               duration: scanning ? 1 : 4,
               repeat: Infinity,
               repeatType: "reverse",
               ease: "easeInOut"
             }}
             className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none"
           >
              <span className="material-symbols-outlined text-[180px] font-thin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 100" }}>hand_gesture</span>
           </motion.div>

           {/* Scan Line */}
           <motion.div 
             initial={{ top: '10%' }}
             animate={scanning ? { top: ['0%', '100%'], opacity: [0, 1, 0] } : { top: '45%', opacity: 1 }}
             transition={scanning ? { duration: 1.2, repeat: Infinity, ease: "linear" } : { duration: 2, repeat: Infinity, repeatType: "reverse" }}
             className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_20px_2px_rgba(212,175,55,0.8)] z-20"
           ></motion.div>

           {/* Data Overlay */}
           {scanning && (
             <div className="absolute inset-0 flex flex-col justify-end p-4 z-30 font-mono text-[9px] text-gold/80 leading-tight">
               <p className="animate-pulse">Analyzing palmistry grid...</p>
               <p>Meridian lines: DETECTED</p>
               <p>Cosmic resonance: {Math.floor(metrics.coherence)}%</p>
             </div>
           )}

           {/* Searching Text / Tap Indicator */}
           <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 pointer-events-none">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-lg transition-transform group-hover:scale-105">
                 <span className={`h-1.5 w-1.5 rounded-full bg-gold ${scanning ? 'animate-ping' : 'animate-pulse'}`}></span>
                 <span className="text-[10px] uppercase tracking-wider text-white/90 font-mono">
                    {scanning ? `Acquiring ${Math.floor(progress)}%` : 'Tap to Align'}
                 </span>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="glass-panel relative z-20 rounded-t-[2.5rem] p-6 pb-10 shadow-[0_-10px_60px_rgba(0,0,0,0.7)] border-t border-white/10">
         <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/10"></div>
         <div className="flex flex-col gap-6 text-center">
            <div className="space-y-2">
               <h1 className="font-display text-2xl font-semibold text-white tracking-wide drop-shadow-md">Align Your Energy</h1>
               <p className="mx-auto max-w-[280px] text-sm font-medium leading-relaxed text-blue-100/60">
                  Tap the frame above or use the button below to map your unique astrological signature.
               </p>
            </div>
            
            <div className="flex justify-center gap-8 py-3 border-y border-white/5">
               <div className="flex flex-col items-center gap-1 group">
                  <span className={`material-symbols-outlined text-[20px] transition-colors ${scanning ? 'text-gold' : 'text-indigo-300'}`}>fingerprint</span>
                  <span className="text-[9px] uppercase text-white/40 tracking-widest font-bold group-hover:text-white/60">Bio-ID</span>
               </div>
               <div className="flex flex-col items-center gap-1 group">
                  <span className={`material-symbols-outlined text-[20px] transition-colors ${scanning ? 'text-gold' : 'text-indigo-300'}`}>auto_awesome</span>
                  <span className="text-[9px] uppercase text-white/40 tracking-widest font-bold group-hover:text-white/60">Aura</span>
               </div>
               <div className="flex flex-col items-center gap-1 group">
                  <span className={`material-symbols-outlined text-[20px] transition-colors ${scanning ? 'text-gold' : 'text-indigo-300'}`}>graphic_eq</span>
                  <span className="text-[9px] uppercase text-white/40 tracking-widest font-bold group-hover:text-white/60">Freq</span>
               </div>
            </div>

            <button 
              onClick={startScan}
              disabled={scanning}
              className="relative w-full overflow-hidden rounded-xl bg-sapphire p-[1px] shadow-[0_0_30px_rgba(42,42,114,0.4)] transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:scale-[1.01] active:scale-[0.99] group disabled:opacity-80"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition group-hover:opacity-100"></div>
               <div className="relative flex items-center justify-center gap-3 rounded-[11px] bg-[#1a1a40] px-6 py-4 transition group-hover:bg-[#202050]">
                  <span className="font-display text-base font-bold uppercase tracking-[0.15em] text-white group-hover:text-gold transition-colors">
                    {scanning ? 'Scanning...' : 'Begin Scan'}
                  </span>
                  <span className={`material-symbols-outlined text-white/70 group-hover:text-gold transition-colors text-[20px] ${scanning ? 'animate-spin' : ''}`}>
                    {scanning ? 'donut_large' : 'blur_on'}
                  </span>
               </div>
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export default RitualScreen;