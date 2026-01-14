import React, { useState } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { generateTarotReading } from '../lib/gemini';

const MAJOR_ARCANA = [
    { name: "The Fool", icon: "🃏" },
    { name: "The Magician", icon: "✨" },
    { name: "The High Priestess", icon: "🌙" },
    { name: "The Empress", icon: "👑" },
    { name: "The Emperor", icon: "🏰" },
    { name: "The Hierophant", icon: "🗝️" },
    { name: "The Lovers", icon: "❤️" },
    { name: "The Chariot", icon: "🎠" },
    { name: "Strength", icon: "🦁" },
    { name: "The Hermit", icon: "🕯️" },
    { name: "Wheel of Fortune", icon: "🎡" },
    { name: "Justice", icon: "⚖️" },
    { name: "The Hanged Man", icon: "🙃" },
    { name: "Death", icon: "💀" },
    { name: "Temperance", icon: "🏺" },
    { name: "The Devil", icon: "😈" },
    { name: "The Tower", icon: "⚡" },
    { name: "The Star", icon: "⭐" },
    { name: "The Moon", icon: "🌚" },
    { name: "The Sun", icon: "☀️" },
    { name: "Judgement", icon: "🎺" },
    { name: "The World", icon: "🌍" }
];

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
            const aiReading = await generateTarotReading(newDrawn);
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

                {/* 2. SELECTION STATE: CARD GRID */}
                {showDeck && drawnCards.length < 3 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 animate-fade-in w-full max-w-4xl">
                        {deck.map((card, idx) => (
                            !drawnCards.includes(card) && (
                                <div
                                    key={idx}
                                    onClick={() => drawCard(card)}
                                    className="aspect-[2/3] bg-gradient-to-br from-indigo-900 to-black border border-white/10 rounded-lg cursor-pointer hover:-translate-y-2 hover:border-gold/50 transition-all duration-300 flex items-center justify-center group"
                                >
                                    <span className="opacity-0 group-hover:opacity-50 text-gold transition-opacity">✦</span>
                                </div>
                            )
                        ))}
                    </div>
                )}

                {/* 3. RESULT STATE: 3 CARDS REVEALED */}
                {drawnCards.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
                        {drawnCards.map((card, idx) => (
                            <div key={idx} className="w-24 h-40 md:w-32 md:h-52 bg-gradient-to-br from-black to-purple-900 border border-gold rounded-xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-flip-up" style={{ animationDelay: `${idx * 200}ms` }}>
                                <div className="text-3xl mb-2">{card.icon}</div>
                                <div className="text-xs md:text-sm text-center font-serif text-gold px-2">{card.name}</div>
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
                    <div className="glass-panel w-full max-w-2xl p-6 md:p-8 animate-fade-in mt-4">
                        <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                            <Sparkles className="text-gold" size={20} />
                            The Oracle Speaks
                        </h3>
                        <div className="prose prose-invert prose-sm md:prose-base max-w-none text-white/80 leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: reading.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gold">$1</strong>').replace(/\n/g, '<br />') }} />
                        </div>
                        <button
                            onClick={() => { setDrawnCards([]); setShowDeck(false); setReading(null); }}
                            className="mt-6 text-xs text-white/40 hover:text-white underline"
                        >
                            Read Again
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Tarot;
