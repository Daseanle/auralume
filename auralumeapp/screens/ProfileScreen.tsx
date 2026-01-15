import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingNav from '../components/FloatingNav';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void text-white font-body pb-24"
    >
      <div className="relative h-48 bg-gradient-to-b from-sapphire-dark to-void overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
         <div className="absolute bottom-0 left-6 translate-y-1/2 w-24 h-24 rounded-full border-2 border-void bg-zinc-800 bg-[url('https://i.pravatar.cc/150?img=32')] bg-cover"></div>
      </div>

      <div className="pt-14 px-6">
         <h1 className="font-display text-2xl font-bold">Lyra Stardust</h1>
         <p className="text-white/50 text-sm">Member since 2023</p>
         
         <div className="flex gap-4 mt-6 mb-8">
            <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
               <span className="block text-xl font-display text-gold mb-1">Pisces</span>
               <span className="text-[10px] uppercase tracking-widest text-white/40">Sun Sign</span>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
               <span className="block text-xl font-display text-gold mb-1">Ether</span>
               <span className="text-[10px] uppercase tracking-widest text-white/40">Element</span>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
               <span className="block text-xl font-display text-gold mb-1">3</span>
               <span className="text-[10px] uppercase tracking-widest text-white/40">Readings</span>
            </div>
         </div>

         <div className="space-y-1">
            <button 
              onClick={() => navigate('/history')}
              className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors group"
            >
               <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">history_edu</span>
                  <span className="font-medium">Reading History</span>
               </div>
               <span className="material-symbols-outlined text-white/30 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
            <button 
              onClick={() => navigate('/wishlist')}
              className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors group"
            >
               <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">favorite</span>
                  <span className="font-medium">Wishlist</span>
               </div>
               <span className="material-symbols-outlined text-white/30 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors group"
            >
               <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/60">settings</span>
                  <span className="font-medium">Settings</span>
               </div>
               <span className="material-symbols-outlined text-white/30 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
         </div>
      </div>
      
      <FloatingNav />
    </motion.div>
  );
};

export default ProfileScreen;