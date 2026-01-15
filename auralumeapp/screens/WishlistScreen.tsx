import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';

const WishlistScreen: React.FC = () => {
  const navigate = useNavigate();

  // Using products from constants as mock wishlist items
  const wishlistItems = [PRODUCTS[1], PRODUCTS[2]];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-white font-body pb-24"
    >
      {/* Header */}
      <div className="p-6 pt-12 sticky top-0 bg-void/80 backdrop-blur-md z-40 border-b border-white/5 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-white/60 hover:text-white">
           <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-display text-xl font-bold tracking-wide">Wishlist</h1>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        {wishlistItems.map((product) => (
          <div key={product.id} className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#1a1a24] border border-white/10 group-hover:border-gold/30 transition-colors">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                style={{ backgroundImage: `url('${product.image}')` }}
              ></div>
              <div className="absolute top-3 right-3 glass-panel p-1.5 rounded-full flex items-center justify-center bg-gold text-void">
                <span className="material-symbols-filled text-[16px]">favorite</span>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <span className="text-[10px] text-gold tracking-widest uppercase font-bold mb-1">{product.collection}</span>
              <h4 className="font-display text-base text-white leading-tight">{product.name}</h4>
              <p className="font-body font-light text-white/60 text-sm mt-1">{product.price}</p>
              
              <button className="mt-3 w-full py-2 rounded border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                 Add to Bag
              </button>
            </div>
          </div>
        ))}
        
        {/* Empty State visual if needed, currently showing items */}
        {wishlistItems.length === 0 && (
           <div className="col-span-2 py-20 flex flex-col items-center text-center opacity-50">
              <span className="material-symbols-outlined text-4xl mb-4">favorite_border</span>
              <p>Your cosmic collection is empty.</p>
           </div>
        )}
      </div>
    </motion.div>
  );
};

export default WishlistScreen;