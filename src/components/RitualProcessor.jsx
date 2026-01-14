import React, { useEffect, useState } from 'react';

const messages = [
    "Aligning planetary positions...",
    "Calculating Venus-Mars aspect ratio...",
    "Consulting ancient star charts...",
    "Synthesizing soul data...",
    "Forming soulmate connection..."
];

const RitualProcessor = ({ onComplete }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 1500);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 6000);

        return () => {
            clearInterval(messageInterval);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className="center-col text-center animate-fade-in">

            {/* Mystical Spinner */}
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '3rem' }}>
                {/* Simple CSS Spinner */}
                <div style={{
                    position: 'absolute', inset: 0,
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute', inset: 0,
                    borderTop: '2px solid #D4AF37',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <div style={{
                    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                    width: '10px', height: '10px', background: '#D4AF37', borderRadius: '50%',
                    boxShadow: '0 0 20px #D4AF37'
                }}></div>
            </div>

            <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
                {messages[messageIndex]}
            </h3>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                Please wait while we connect to the ether.
            </p>

        </div>
    );
};

export default RitualProcessor;
