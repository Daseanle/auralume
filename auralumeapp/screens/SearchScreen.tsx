import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingNav from '../components/FloatingNav';

const SearchScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-white font-body pb-24"
    >
      {/* Header */}
      <div className="p-6 pt-12 sticky top-0 bg-void/80 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="text-white/60 hover:text-white">
              <span className="material-symbols-outlined">arrow_back</span>
           </button>
           <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 material-symbols-outlined text-[20px]">search</span>
              <input 
                 type="text" 
                 placeholder="Search crystals, signs..." 
                 className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                 autoFocus
              />
           </div>
        </div>
      </div>

      <div className="p-6">
         <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Trending</h3>
         <div className="flex flex-wrap gap-2 mb-8">
            {['Amethyst Ring', 'Leo Pendant', 'Moon Phase', 'Healing', 'Gold'].map(tag => (
               <button key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:border-gold/30 hover:text-gold transition-colors">
                  {tag}
               </button>
            ))}
         </div>

         <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Categories</h3>
         <div className="grid grid-cols-2 gap-4">
            {['Rings', 'Necklaces', 'Earrings', 'Talismans'].map((cat, i) => (
               <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sapphire to-purple-900 group-hover:scale-110 transition-transform"></div>
                     <span className="font-display text-white/80 group-hover:text-white">{cat}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
      
      <FloatingNav />
    </motion.div>
  );
};

export default SearchScreen;