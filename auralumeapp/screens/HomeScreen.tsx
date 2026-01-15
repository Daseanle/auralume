import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES, PRODUCTS } from '../constants';
import FloatingNav from '../components/FloatingNav';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex flex-col pb-24 bg-void"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-void"></div>
         <div className="absolute top-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_top,_#1a1a2e,_#050505)] opacity-60"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-void/80 backdrop-blur-md border-b border-white/5">
        <button 
           onClick={() => navigate('/menu')}
           className="text-white/80 hover:text-white transition-colors p-1"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <h1 className="text-xl font-display font-bold tracking-[0.2em] text-white shadow-glow">AURALUME</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-900 to-indigo-600 border border-white/10 shadow-[0_0_10px_rgba(100,100,255,0.4)]">
            <span className="material-symbols-outlined text-[16px] text-white animate-pulse">spark</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col gap-12 pt-6">
        {/* Hero Section */}
        <section className="px-4">
          <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-2xl group">
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[10s] ease-linear scale-100 group-hover:scale-105"
              style={{ backgroundImage: `url('${IMAGES.HOME_HERO_BG}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-void/10 to-void/90"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen"></div>
            
            <div className="absolute bottom-6 left-4 right-4 glass-panel p-6 rounded-xl flex flex-col items-center text-center gap-5">
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-wide text-white drop-shadow-md">
                   WEAR YOUR<br/>CONSTELLATION
                </h2>
                <p className="font-body font-light text-white/80 text-sm tracking-wide leading-relaxed max-w-[280px] mx-auto">
                   AI-curated jewelry aligned with your cosmic energy signature.
                </p>
              </div>
              <button 
                onClick={() => navigate('/ritual')}
                className="relative w-full max-w-[320px] h-12 flex items-center justify-center gap-3 rounded-lg overflow-hidden bg-void/40 border border-gold/40 shadow-glow hover:bg-gold/10 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-gold text-[20px]">auto_awesome</span>
                <span className="text-gold font-display font-bold text-sm tracking-[0.05em] uppercase">Find Your Cosmic Soulmate</span>
              </button>
            </div>
          </div>
        </section>

        {/* Carousel */}
        <section className="flex flex-col gap-6">
          <div className="px-6 flex items-baseline justify-between">
            <h3 className="font-display text-xl text-white font-semibold tracking-widest">Celestial Mosaic</h3>
            <button className="text-xs font-body text-white/50 hover:text-gold transition-colors tracking-widest uppercase">View All</button>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide px-6 pb-4 gap-4 snap-x snap-mandatory">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="snap-center shrink-0 w-[240px] flex flex-col gap-3 group cursor-pointer">
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#1a1a24]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>
                  <div className="absolute top-3 right-3 glass-panel p-1.5 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[16px]">favorite</span>
                  </div>
                </div>
                <div className="flex flex-col px-1">
                  <span className="text-[10px] text-gold tracking-widest uppercase font-bold mb-1">{product.collection}</span>
                  <h4 className="font-display text-lg text-white leading-tight">{product.name}</h4>
                  <p className="font-body font-light text-white/60 text-sm mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mood Section */}
        <section className="relative w-full py-20 px-6 my-4 bg-void border-y border-white/5 overflow-hidden">
           <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(43, 43, 115, 0.4) 0%, rgba(5, 5, 5, 1) 70%)'}}></div>
           <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md mx-auto">
             <span className="material-symbols-outlined text-gold/80 text-4xl">lens_blur</span>
             <blockquote className="font-display text-2xl md:text-3xl font-light italic leading-relaxed text-white/90">
                "Starlight is the connection. Experience the void between the atoms."
             </blockquote>
             <button className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase border-b border-transparent hover:border-gold hover:text-gold transition-all pb-1">
                Read Our Manifesto
             </button>
           </div>
        </section>
        
        <div className="h-10"></div>
      </main>

      <FloatingNav />
    </motion.div>
  );
};

export default HomeScreen;