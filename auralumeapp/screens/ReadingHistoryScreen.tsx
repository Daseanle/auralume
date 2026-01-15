import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ReadingHistoryScreen: React.FC = () => {
  const navigate = useNavigate();

  const history = [
    {
      date: 'Today',
      title: 'Full Moon Clarity',
      cards: ['The Moon', 'High Priestess', 'Ace of Cups'],
      summary: 'A time for deep intuition and emotional renewal.',
      icon: 'dark_mode'
    },
    {
      date: 'Oct 24',
      title: 'Career Guidance',
      cards: ['The Emperor', 'Eight of Pentacles', 'The Sun'],
      summary: 'Hard work leading to well-deserved success.',
      icon: 'work'
    },
    {
      date: 'Oct 12',
      title: 'Relationship Insight',
      cards: ['The Lovers', 'Two of Cups', 'Ten of Cups'],
      summary: 'Harmony and alignment in personal connections.',
      icon: 'favorite'
    }
  ];

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
        <h1 className="font-display text-xl font-bold tracking-wide">Journal</h1>
      </div>

      <div className="p-6 space-y-4">
        {history.map((entry, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="glass-panel p-5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors cursor-pointer group"
             onClick={() => navigate('/reading')} // Navigate to reading details (reused)
           >
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                       <span className="material-symbols-outlined text-[20px]">{entry.icon}</span>
                    </div>
                    <div>
                       <h3 className="font-display font-medium text-lg leading-tight">{entry.title}</h3>
                       <span className="text-xs text-white/40 uppercase tracking-wider">{entry.date}</span>
                    </div>
                 </div>
                 <span className="material-symbols-outlined text-white/20 group-hover:text-gold transition-colors">arrow_forward</span>
              </div>
              
              <p className="text-sm text-white/70 font-light leading-relaxed mb-4">
                 "{entry.summary}"
              </p>

              <div className="flex gap-2">
                 {entry.cards.map((card, idx) => (
                    <span key={idx} className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/50 uppercase tracking-wide border border-white/5">
                       {card}
                    </span>
                 ))}
              </div>
           </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReadingHistoryScreen;