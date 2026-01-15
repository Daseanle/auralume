import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [location, setLocation] = useState(true);

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-gold' : 'bg-white/10'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  );

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
        <h1 className="font-display text-xl font-bold tracking-wide">Settings</h1>
      </div>

      <div className="p-6 space-y-8">
        {/* Section: Preferences */}
        <section className="space-y-4">
           <h2 className="text-xs font-bold uppercase tracking-widest text-white/40">Preferences</h2>
           <div className="space-y-1">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/60">notifications</span>
                    <span className="font-medium">Daily Notifications</span>
                 </div>
                 <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/60">graphic_eq</span>
                    <span className="font-medium">Ambient Sounds</span>
                 </div>
                 <Toggle checked={sounds} onChange={() => setSounds(!sounds)} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/60">location_on</span>
                    <span className="font-medium">Location Services</span>
                 </div>
                 <Toggle checked={location} onChange={() => setLocation(!location)} />
              </div>
           </div>
        </section>

        {/* Section: Account */}
        <section className="space-y-4">
           <h2 className="text-xs font-bold uppercase tracking-widest text-white/40">Account</h2>
           <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/60">person</span>
                    <span className="font-medium">Edit Profile</span>
                 </div>
                 <span className="material-symbols-outlined text-white/30">chevron_right</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/60">credit_card</span>
                    <span className="font-medium">Payment Methods</span>
                 </div>
                 <span className="material-symbols-outlined text-white/30">chevron_right</span>
              </button>
           </div>
        </section>

        {/* Section: Support */}
        <section className="space-y-4">
           <h2 className="text-xs font-bold uppercase tracking-widest text-white/40">Support</h2>
           <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/60">help</span>
                    <span className="font-medium">Help Center</span>
                 </div>
                 <span className="material-symbols-outlined text-white/30">chevron_right</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/60">policy</span>
                    <span className="font-medium">Privacy Policy</span>
                 </div>
                 <span className="material-symbols-outlined text-white/30">chevron_right</span>
              </button>
           </div>
        </section>

        <div className="pt-8 text-center">
           <button className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors">
              Log Out
           </button>
           <p className="mt-4 text-[10px] text-white/30 uppercase tracking-widest">AuraLume v1.0.4 (Build 2024.10)</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsScreen;