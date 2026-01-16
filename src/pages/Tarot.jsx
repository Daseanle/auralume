import React, { useState } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { generateTarotReading } from '../lib/gemini';
import { MAJOR_ARCANA, CARD_BACK_IMAGE } from '../lib/tarot-assets'; // Import new assets

const Tarot = () => {
    const [deck, setDeck] = useState(MAJOR_ARCANA);
    const [isShuffling, setIsShuffling] = useState(false);
    const [drawnCards, setDrawnCards] = useState([]); // Array of 3 cards
    const [reading, setReading] = useState(null); // String (AI Text)
    const [isLoadingReading, setIsLoadingReading] = useState(false);
    const [showDeck, setShowDeck] = useState(false); // Show face-down cards

    const shuffleDeck = () => {
        setIsShuffling(true);
        setDrawnCards([]);
        setReading(null);
        setShowDeck(false);

        // Simulate shuffle time
        setTimeout(() => {
            const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
            setDeck(shuffled);
            setIsShuffling(false);
            setShowDeck(true);
        }, 1500);
    };

    const drawCard = async (card) => {
        if (drawnCards.length >= 3 || drawnCards.includes(card)) return;

        const newDrawn = [...drawnCards, card];
        setDrawnCards(newDrawn);

        // If 3 cards drawn, get reading automatically
        if (newDrawn.length === 3) {
            setIsLoadingReading(true);
            // Pass simple names to Gemini, not the whole object
            const cardNames = newDrawn.map(c => c.name);
            const aiReading = await generateTarotReading(cardNames);
            setReading(aiReading);
            setIsLoadingReading(false);
        }
    };

    return (
        <div className="container center-col pt-10 px-6 block min-h-screen pb-24 padding-top-safe">
            <h1 className="text-3xl font-serif text-gold mb-2 text-center animate-fade-in">Daily Tarot</h1>
            <p className="text-white/60 mb-8 text-center max-w-md mx-auto">
                {drawnCards.length === 0 && !showDeck && "Focus on your question and shuffle the deck."}
                {showDeck && drawnCards.length < 3 && `Select ${3 - drawnCards.length} more card(s) from the deck.`}
                {drawnCards.length === 3 && "Your reading is ready."}
            </p>

            {/* ACTION AREA */}
            <div className="flex-1 flex flex-col items-center justify-start w-full min-h-[400px]">

                {/* 1. INITIAL STATE: SHUFFLE BUTTON */}
                {!showDeck && drawnCards.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 gap-6 animate-fade-in">
                        <div className={`w-32 h-48 bg-gradient-to-br from-purple-900 to-black border-2 border-gold/30 rounded-xl relative shadow-[0_0_30px_rgba(100,0,255,0.2)] ${isShuffling ? 'animate-pulse' : ''}`}>
                            <div className="absolute inset-0 flex items-center justify-center opacity-20 text-4xl">
                                🔮
                            </div>
                            {isShuffling && (
                                <div className="absolute inset-0 bg-white/10 animate-ping rounded-xl"></div>
                            )}
                        </div>
                        <button
                            onClick={shuffleDeck}
                            disabled={isShuffling}
                            className="btn-cosmic flex items-center gap-2"
                        >
                            {isShuffling ? 'Shuffling...' : 'Shuffle Deck'} <RefreshCcw size={16} className={isShuffling ? "animate-spin" : ""} />
                        </button>
                    </div>
                )}

                {/* 2. SELECTION STATE: CARD GRID (Horizontal Scroll) */}
                {showDeck && drawnCards.length < 3 && (
                    <div className="flex flex-nowrap overflow-x-auto gap-4 w-full max-w-7xl px-4 py-8 items-center justify-start no-scrollbar mask-gradient-x">
                        {deck.map((card, idx) => (
                            !drawnCards.includes(card) && (
                                <div
                                    key={idx}
                                    onClick={() => drawCard(card)}
                                    // SIZE: w-48 md:w-64 with explicit min-w to prevent shrinking
                                    className="flex-none w-48 md:w-64 min-w-[12rem] md:min-w-[16rem] aspect-[2/3.5] relative cursor-pointer hover:-translate-y-6 transition-all duration-300 group rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.8)]"
                                >
                                    <img
                                        src={CARD_BACK_IMAGE}
                                        alt="Tarot Card Back"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )
                        ))}
                    </div>
                )}

                {/* 3. RESULT STATE: 3 CARDS REVEALED */}
                {drawnCards.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-8 mb-10 w-full px-4">
                        {drawnCards.map((card, idx) => (
                            <div key={idx} className="flex-none w-48 md:w-64 min-w-[12rem] md:min-w-[16rem] aspect-[2/3.5] rounded-2xl flex flex-col items-center justify-start animate-flip-up relative group" style={{ animationDelay: `${idx * 200}ms` }}>
                                {/* Card Image */}
                                <div className="w-full h-full rounded-lg overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] mb-2 relative bg-black">
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Card Name Label */}
                                <div className="text-center mt-3">
                                    <h4 className="text-sm md:text-base font-serif text-[#D4AF37] font-bold">{card.name}</h4>
                                    <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest">{card.keywords.split(',')[0]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 4. READING DISPLAY */}
                {isLoadingReading && (
                    <div className="flex flex-col items-center gap-3 animate-fade-in mt-8">
                        <Sparkles className="text-gold animate-spin" />
                        <p className="text-white/50 text-sm italic">Consulting the oracle...</p>
                    </div>
                )}

                {reading && !isLoadingReading && (
                    <div className="glass-panel w-full max-w-3xl p-6 md:p-10 animate-fade-in mt-4 border border-white/10">
                        <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                            <Sparkles className="text-gold" size={24} />
                            The Oracle Speaks
                        </h3>
                        <div className="text-gray-100 text-base md:text-lg leading-relaxed space-y-4">
                            <div dangerouslySetInnerHTML={{
                                __html: reading
                                    .replace(/^### (.*$)/gim, '<h4 class="text-gold font-serif text-lg mt-6 mb-2">$1</h4>')
                                    .replace(/^## (.*$)/gim, '<h3 class="text-gold font-serif text-xl mt-8 mb-4">$1</h3>')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                    .replace(/\n/g, '<br />')
                            }} />
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => { setDrawnCards([]); setShowDeck(false); setReading(null); }}
                                className="px-10 py-3 bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#B8860B] text-black font-bold text-lg uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.6)] border border-[#FFE578]"
                            >
                                Read Again
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Tarot;
