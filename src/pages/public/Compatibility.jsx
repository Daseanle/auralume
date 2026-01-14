import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Star } from 'lucide-react';

const ZODIAC_TRAITS = {
    aries: { element: 'Fire', trait: 'Bold' },
    taurus: { element: 'Earth', trait: 'Steady' },
    gemini: { element: 'Air', trait: 'Curious' },
    cancer: { element: 'Water', trait: 'Nurturing' },
    leo: { element: 'Fire', trait: 'Charismatic' },
    virgo: { element: 'Earth', trait: 'Analytical' },
    libra: { element: 'Air', trait: 'Harmonious' },
    scorpio: { element: 'Water', trait: 'Intense' },
    sagittarius: { element: 'Fire', trait: 'Adventurous' },
    capricorn: { element: 'Earth', trait: 'Ambitious' },
    aquarius: { element: 'Air', trait: 'Visionary' },
    pisces: { element: 'Water', trait: 'Dreamy' },
};

const Compatibility = () => {
    const { signs } = useParams(); // e.g. "aries-leo"
    const [sign1, sign2] = (signs || "aries-aries").split('-');

    // Basic SEO Metadata simulation
    const title = `${sign1.toUpperCase()} & ${sign2.toUpperCase()} Compatibility | Auralume`;

    useEffect(() => {
        document.title = title;
    }, [title]);

    const s1 = ZODIAC_TRAITS[sign1.toLowerCase()] || ZODIAC_TRAITS.aries;
    const s2 = ZODIAC_TRAITS[sign2.toLowerCase()] || ZODIAC_TRAITS.aries;

    // Mock Compatibility Score based on Element
    const isCompatible = s1.element === s2.element;
    const score = isCompatible ? "95%" : "60%";

    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans selection:bg-purple-900 selection:text-white pb-20">

            {/* Nav */}
            <nav className="p-6 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 border-b border-white/5 bg-[#050511]/80">
                <Link to="/" className="text-xl font-serif tracking-widest text-white/80 hover:text-white transition-colors">AURALUME</Link>
                <Link to="/auth" className="btn-cosmic text-xs px-6 py-2">Start Free Reading</Link>
            </nav>

            <div className="container mx-auto px-6 pt-16 text-center">

                {/* Breadcrumb for Google */}
                <p className="text-xs text-white/40 uppercase tracking-widest mb-4">
                    Home › Compatibility › {sign1} and {sign2}
                </p>

                <h1 className="text-4xl md:text-6xl font-serif mb-6 capitalize leading-tight">
                    <span className="text-gold">{sign1}</span> <span className="text-white/50 text-3xl align-middle">&</span> <span className="text-purple-300">{sign2}</span>
                </h1>

                <div className="flex justify-center gap-8 my-10 animate-fade-in">
                    <div className="w-24 h-24 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-xs uppercase tracking-widest">
                        {sign1}<br />{s1.element}
                    </div>
                    <div className="flex items-center text-4xl">
                        <Heart className={isCompatible ? "text-red-500 fill-red-500 animate-pulse" : "text-white/20"} />
                    </div>
                    <div className="w-24 h-24 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xs uppercase tracking-widest">
                        {sign2}<br />{s2.element}
                    </div>
                </div>

                <div className="glass-panel p-8 max-w-2xl mx-auto text-left mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-serif">Cosmic Synergy</h2>
                        <span className="text-3xl font-bold text-green-400">{score}</span>
                    </div>
                    <p className="text-white/70 leading-relaxed mb-6">
                        When <b>{sign1}</b> (a {s1.trait} {s1.element} sign) meets <b>{sign2}</b> (a {s2.trait} {s2.element} sign), the energy is
                        {isCompatible ? " instantly harmonious. You share a fundamental understanding of the world." : " dynamic and challenging. You bring different strengths to the table."}
                    </p>

                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                        <h3 className="text-sm uppercase tracking-widest text-gold mb-2 flex items-center gap-2"><Star size={14} /> Secret to Success</h3>
                        <p className="text-sm text-white/60">
                            Communication is key. {sign1} must learn to listen to {sign2}'s needs, while {sign2} should appreciate {sign1}'s unique perspective.
                        </p>
                    </div>

                    <Link to="/auth" className="block w-full py-4 text-center bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg font-serif border border-white/20 hover:scale-[1.02] transition-transform">
                        Unlock Full Relationship Report for {sign1} & {sign2}
                    </Link>
                </div>

                {/* Internal Linking for SEO Spidering */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-50 hover:opacity-100 transition-opacity">
                    {Object.keys(ZODIAC_TRAITS).slice(0, 8).map(z => (
                        <Link key={z} to={`/match/${sign1}-${z}`} className="text-xs text-white/30 hover:text-gold block py-2 border border-white/5 rounded">
                            {sign1} + {z}
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Compatibility;
