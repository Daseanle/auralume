import React from 'react';

const Tarot = () => {
    return (
        <div className="container center-col pt-10 px-6 block">
            <h1 className="text-3xl font-serif text-gold mb-2 text-center">Daily Tarot</h1>
            <p className="text-white/60 mb-10 text-center">Focus on a question and select 3 cards.</p>

            <div className="flex justify-center gap-4 w-full">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-24 h-40 bg-gradient-to-br from-purple-900 to-black border border-gold/30 rounded-lg flex items-center justify-center cursor-pointer hover:-translate-y-4 transition-transform duration-500 shadow-xl">
                        <div className="w-20 h-36 border border-white/5 rounded flex items-center justify-center">
                            <span className="text-2xl opacity-20">★</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button className="btn-cosmic">Shuffle Deck</button>
            </div>

        </div>
    );
};

export default Tarot;
