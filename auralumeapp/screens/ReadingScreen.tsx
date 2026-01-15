import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

const ReadingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'love' | 'career'>('overview');
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<{overview: string, love: string, career: string} | null>(null);

  useEffect(() => {
    const fetchReading = async () => {
      // Static fallback if API fails or key missing
      const fallbackData = {
        overview: "Your past reflects a landscape of shadows and uncertainty, embodied by The Moon. You have navigated through illusions and trusted your inner compass when the path was unclear. Currently, the High Priestess suggests a period of stillness. The answers you seek are not in the external world but within your own intuition.",
        love: "In matters of the heart, the Ace of Cups promises a new beginning. If you are single, this signals a potential soul connection entering your orbit. If partnered, expect a renewal of emotional depth. Trust the flow of your feelings.",
        career: "The High Priestess in your present position suggests you have hidden knowledge or skills yet to be revealed in your professional life. Trust your gut instincts regarding a new project or contract. The future holds emotional fulfillment in your work."
      };

      try {
        if (!process.env.API_KEY) {
           throw new Error("No API Key");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
           model: 'gemini-3-flash-preview',
           contents: "You are a mystical, high-vibration tarot reader for a cosmic jewelry app called AuraLume. Interpret the following spread for the user: Past: The Moon, Present: High Priestess, Future: Ace of Cups. Provide a short, elegant interpretation for three categories: 'overview', 'love', and 'career'. Keep the tone ethereal, empowering, and slightly mysterious.",
           config: {
             responseMimeType: "application/json",
             responseSchema: {
                type: Type.OBJECT,
                properties: {
                  overview: { type: Type.STRING },
                  love: { type: Type.STRING },
                  career: { type: Type.STRING }
                }
              }
           }
        });

        if (response.text) {
           const data = JSON.parse(response.text);
           setContent(data);
        } else {
           setContent(fallbackData);
        }
      } catch (e) {
        console.error("Gemini API Error or missing key, using fallback", e);
        setContent(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchReading();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-void text-white font-ui min-h-screen w-full flex flex-col overflow-x-hidden relative"
    >
       {/* Background */}
       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(42,42,114,0.25)_0%,_rgba(5,5,5,0)_70%)] animate-pulse-slow"></div>
          <div className="absolute top-[10%] right-[-10%] w-[300px] h-[300px] bg-purple-900/10 blur-[100px] rounded-full"></div>
       </div>

       {/* Main */}
       <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto w-full">
          {/* Header */}
          <div className="flex items-center p-4 pt-6 pb-2 justify-between sticky top-0 z-50 bg-void/80 backdrop-blur-md border-b border-white/5">
             <button 
                onClick={() => navigate('/oracle')}
                className="text-white/80 hover:text-gold transition-colors flex size-10 items-center justify-center rounded-full hover:bg-white/5"
             >
                <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
             </button>
             <h2 className="text-white text-lg font-display font-bold tracking-tight">The Reading</h2>
             <div className="size-10"></div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2 mt-4 px-4 mb-6">
             <div className="grid grid-cols-3 gap-3 w-full">
                {/* Past */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity">
                   <p className="text-gold/60 text-[10px] uppercase tracking-[0.2em] font-display font-medium">Past</p>
                   <div className="relative w-full aspect-[2/3.2] rounded-lg border border-gold/30 overflow-hidden shadow-[0_0_20px_-10px_rgba(0,0,0,0.8)]">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.CARDS.MOON}')` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 w-full text-center">
                         <span className="text-white/90 text-[10px] font-display font-bold tracking-wide">THE MOON</span>
                      </div>
                   </div>
                </motion.div>

                {/* Present (Active) */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-3 group -mt-2">
                   <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-display font-bold text-glow">Present</p>
                   <div className="relative w-full aspect-[2/3.2] rounded-lg border border-gold/60 shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)] overflow-hidden ring-1 ring-gold/20">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.CARDS.PRIESTESS}')` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-sapphire/60 via-transparent to-transparent mix-blend-overlay"></div>
                      <div className="absolute bottom-2 w-full text-center px-1">
                         <span className="text-white text-[10px] font-display font-bold tracking-wide leading-tight block">HIGH PRIESTESS</span>
                      </div>
                   </div>
                </motion.div>

                {/* Future */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity">
                   <p className="text-gold/60 text-[10px] uppercase tracking-[0.2em] font-display font-medium">Future</p>
                   <div className="relative w-full aspect-[2/3.2] rounded-lg border border-gold/30 overflow-hidden shadow-[0_0_20px_-10px_rgba(0,0,0,0.8)]">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.CARDS.CUPS}')` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 w-full text-center">
                         <span className="text-white/90 text-[10px] font-display font-bold tracking-wide">ACE OF CUPS</span>
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>

          {/* Reading Content */}
          <div className="flex-1 px-4 pb-8">
             <div className="glass-panel rounded-xl overflow-hidden flex flex-col min-h-[400px]">
                {/* Tabs */}
                <div className="flex border-b border-white/5">
                   {(['overview', 'love', 'career'] as const).map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex-1 py-4 relative group"
                      >
                         <span className={`text-xs font-bold tracking-wide uppercase transition-colors ${activeTab === tab ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                            {tab}
                         </span>
                         {activeTab === tab && (
                            <motion.div 
                               layoutId="tab-indicator"
                               className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gold shadow-[0_0_10px_#D4AF37]" 
                            />
                         )}
                      </button>
                   ))}
                </div>

                <div className="p-6 flex flex-col gap-6 flex-1">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="material-symbols-outlined text-gold text-sm">auto_awesome</span>
                         <span className="text-[10px] font-medium tracking-widest text-gold/80 uppercase">Gemini AI Interpretation</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white leading-tight">Celestial Guidance</h3>
                   </div>

                   <div className="font-ui font-light text-[#E5E5E5] leading-relaxed text-[15px] min-h-[120px]">
                      {loading ? (
                         <div className="space-y-3 animate-pulse">
                            <div className="h-4 bg-white/10 rounded w-full"></div>
                            <div className="h-4 bg-white/10 rounded w-[90%]"></div>
                            <div className="h-4 bg-white/10 rounded w-[95%]"></div>
                         </div>
                      ) : (
                         <AnimatePresence mode="wait">
                            <motion.p
                               key={activeTab}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               exit={{ opacity: 0, y: -10 }}
                               transition={{ duration: 0.2 }}
                            >
                               {content?.[activeTab]}
                            </motion.p>
                         </AnimatePresence>
                      )}
                   </div>

                   <div className="flex flex-wrap gap-2 pt-2">
                      <div className="flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                         <span className="text-[11px] text-white/90 font-medium tracking-wide">Intuition</span>
                      </div>
                      <div className="flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                         <span className="text-[11px] text-white/90 font-medium tracking-wide">New Beginnings</span>
                      </div>
                      <div className="flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                         <span className="text-[11px] text-white/90 font-medium tracking-wide">Mystery</span>
                      </div>
                   </div>

                   <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-auto"></div>

                   <div className="flex flex-col gap-3">
                      <button className="w-full h-12 rounded-lg bg-sapphire text-white font-ui font-semibold text-sm tracking-wide shadow-[0_0_20px_-5px_rgba(42,42,114,0.5)] hover:bg-[#34348a] transition-all flex items-center justify-center gap-2 group">
                         <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">bookmark</span>
                         Save to Journal
                      </button>
                      <button className="w-full h-12 rounded-lg border border-gold/40 text-gold font-ui font-semibold text-sm tracking-wide hover:bg-gold/10 transition-all flex items-center justify-center gap-2">
                         <span className="material-symbols-outlined text-[20px]">share</span>
                         Share Reading
                      </button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
};

export default ReadingScreen;