import React from 'react';

const Hero = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6">

            <div className="mb-8 fade-in-up">
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-serif block mb-4 border-b border-white/10 pb-4 w-24 mx-auto">
                    Auralume
                </span>
                <h1 className="text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 mb-6 drop-shadow-2xl">
                    The Universe<br />Has A Message
                </h1>
                <p className="text-gray-300 font-light text-lg tracking-wide max-w-sm mx-auto leading-relaxed">
                    Unlock the secrets of your soul and discover the one who is written in your stars.
                </p>
            </div>

            <div className="fade-in-up delay-200">
                <button
                    onClick={() => {
                        window.dispatchEvent(new Event('START_COSMIC_AUDIO'));
                        onStart();
                    }}
                    className="btn-cosmic group"
                >
                    <span>Reveal My Soulmate</span>
                </button>
            </div>

            <div className="mt-16 fade-in-up delay-300 opacity-60">
                <div className="flex items-center justify-center space-x-2 text-xs text-gold/80 tracking-widest uppercase">
                    <span>★</span>
                    <span>Astrology</span>
                    <span>•</span>
                    <span>Spirituality</span>
                    <span>•</span>
                    <span>Love</span>
                    <span>★</span>
                </div>
            </div>

        </div>
    );
};

export default Hero;
