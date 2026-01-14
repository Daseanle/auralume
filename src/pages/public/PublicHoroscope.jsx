import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import bgNebula from '../../assets/bg-nebula.png';

const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

const PublicHoroscope = () => {
    const navigate = useNavigate();

    // Dynamic Page Title for SEO
    useEffect(() => {
        document.title = "Free Daily Horoscope & Cosmic Energy Report | Auralume";
        document.querySelector('meta[name="description"]').setAttribute("content", "Get your free daily horoscope reading while aligning with the stars. Accurate astrological forecasts for all 12 signs.");
    }, []);

    return (
        <div className="min-h-screen text-white relative flex flex-col items-center">

            {/* Background */}
            <div className="fixed inset-0 z-[-1]">
                <img src={bgNebula} alt="" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-black/80"></div>
            </div>

            {/* NavBar */}
            <nav className="w-full max-w-6xl p-6 flex justify-between items-center z-10">
                <h1 className="text-2xl font-serif text-gold tracking-widest">AURALUME</h1>
                <button onClick={() => navigate('/auth')} className="text-sm border border-gold/30 px-4 py-2 rounded-full hover:bg-gold/10 transition-colors">
                    Sign In
                </button>
            </nav>

            {/* Hero Content */}
            <main className="flex-1 w-full max-w-4xl px-6 py-12 flex flex-col items-center text-center z-10">
                <span className="text-gold text-sm font-bold tracking-[0.2em] mb-4 uppercase">Cosmic Forecast</span>
                <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                    Your Daily <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer">Stellar Guidance</span>
                </h2>
                <p className="text-white/60 max-w-xl text-lg mb-12 leading-relaxed">
                    The alignment of planets today brings a unique frequency. Select your sign to discover what the universe has planned for you.
                </p>

                {/* Sign Grid (SEO Cluster) */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full mb-16">
                    {SIGNS.map(sign => (
                        <div key={sign} onClick={() => navigate('/auth')} className="glass-panel p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-white/10 transition-transform hover:-translate-y-1">
                            <Star size={24} className="text-gold/50" />
                            <span className="font-serif text-lg">{sign}</span>
                            <span className="text-[10px] text-white/30 uppercase tracking-wider">Read Forecast</span>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-b from-purple-900/40 to-black border border-purple-500/20 p-12 rounded-3xl max-w-2xl w-full text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    <h3 className="text-3xl font-serif mb-4">Go Deeper Than Just sun Signs</h3>
                    <p className="text-white/60 mb-8">
                        Auralume uses your full birth chart (Sun, Moon, Rising) and real-time planetary transits to provide hyper-personalized advice.
                    </p>
                    <button onClick={() => navigate('/auth')} className="btn-cosmic px-8 py-4 text-lg w-full md:w-auto">
                        Get My Personal Reading <ArrowRight className="inline ml-2" />
                    </button>
                </div>

            </main>

            {/* SEO Footer */}
            <footer className="w-full bg-black py-12 border-t border-white/5 text-center text-white/20 text-sm z-10">
                <p>Daily Horoscope • Tarot Reading • Synastry Charts</p>
                <p className="mt-2">© 2026 Auralume Astrology. For Entertainment Purposes Only.</p>
            </footer>

        </div>
    );
};

export default PublicHoroscope;
