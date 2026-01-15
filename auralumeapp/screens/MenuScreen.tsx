import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MenuScreen: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'The Ritual', path: '/ritual' },
    { label: 'Oracle Reading', path: '/oracle' },
    { label: 'Shop Constellations', path: '/home' },
    { label: 'My Profile', path: '/profile' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: '-100%' }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 bg-void/95 backdrop-blur-xl flex flex-col"
    >
      <div className="flex justify-end p-6 pt-12">
        <button 
           onClick={() => navigate(-1)}
           className="size-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
           <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-20">
         {menuItems.map((item, index) => (
            <motion.button
               key={index}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 + index * 0.05 }}
               onClick={() => navigate(item.path)}
               className="font-display text-3xl font-light text-white/80 hover:text-gold hover:scale-105 transition-all tracking-wide"
            >
               {item.label}
            </motion.button>
         ))}
      </div>

      <div className="p-8 text-center border-t border-white/5">
         <p className="text-white/30 text-xs tracking-widest uppercase font-display">AuraLume v1.0.4</p>
      </div>
    </motion.div>
  );
};

export default MenuScreen;