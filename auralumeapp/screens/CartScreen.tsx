import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingNav from '../components/FloatingNav';
import { PRODUCTS } from '../constants';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-white font-body pb-24 flex flex-col"
    >
      <div className="p-6 pt-12 flex items-center justify-between border-b border-white/5">
        <h1 className="font-display text-xl tracking-wide">Your Cart</h1>
        <span className="text-xs text-white/50 font-mono">1 ITEM</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
         {/* Sample Item */}
         <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg bg-white/5 overflow-hidden border border-white/10">
               <img src={PRODUCTS[0].image} className="w-full h-full object-cover opacity-80" alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
               <div>
                  <h3 className="font-display text-lg leading-none mb-1">{PRODUCTS[0].name}</h3>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Size 7 • Gold</p>
               </div>
               <div className="flex justify-between items-end">
                  <p className="text-gold font-medium">{PRODUCTS[0].price}</p>
                  <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                     <button className="text-white/50 hover:text-white">-</button>
                     <span className="text-xs font-mono">1</span>
                     <button className="text-white/50 hover:text-white">+</button>
                  </div>
               </div>
            </div>
         </div>

         {/* Summary */}
         <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm text-white/60">
               <span>Subtotal</span>
               <span>{PRODUCTS[0].price}</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
               <span>Shipping</span>
               <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between text-lg font-display text-white pt-2 border-t border-white/5">
               <span>Total</span>
               <span>{PRODUCTS[0].price}</span>
            </div>
            
            <button className="w-full py-4 mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-gold transition-colors">
               Checkout
            </button>
         </div>
      </div>
      
      <FloatingNav />
    </motion.div>
  );
};

export default CartScreen;