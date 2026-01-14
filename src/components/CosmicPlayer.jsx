import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Loader2 } from 'lucide-react';

// Using more reliable, direct MP3 sources (Kevin MacLeod / Public Domain)
const TRACKS = [
    {
        name: "Ethereal Space",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Fluidscape.mp3"
    },
    {
        name: "Deep Meditation",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2001.mp3"
    },
    {
        name: "Cosmic Drift",
        url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Space%201990-B.mp3"
    }
];

const CosmicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const audioRef = useRef(new Audio(TRACKS[0].url));

    useEffect(() => {
        const audio = audioRef.current;

        // Settings
        audio.loop = true;
        audio.volume = 0.5;
        audio.preload = "auto";

        // Event Listeners
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleWaiting = () => setIsLoading(true);
        const handlePlaying = () => setIsLoading(false);
        const handleError = (e) => {
            console.error("Audio Error:", e);
            setIsLoading(false);
            setIsPlaying(false);
            // Auto skip to next if error
            nextTrack();
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('playing', handlePlaying);
        audio.addEventListener('error', handleError);

        // Global Event for Rituals
        const handleStartAudio = () => {
            // User interaction check is handled by browser, 
            // but if called from non-async event it might fail.
            // We'll try.
            audio.play().catch(console.warn);
        };
        window.addEventListener('START_COSMIC_AUDIO', handleStartAudio);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('playing', handlePlaying);
            audio.removeEventListener('error', handleError);
            window.removeEventListener('START_COSMIC_AUDIO', handleStartAudio);
            audio.pause();
        };
    }, []);

    // Handle Track Change
    useEffect(() => {
        const audio = audioRef.current;
        const wasPlaying = isPlaying;

        setIsLoading(true);
        audio.src = TRACKS[currentTrack].url;
        audio.load();

        if (wasPlaying) {
            audio.play().catch(e => {
                console.warn("Autoplay block on track change", e);
                setIsPlaying(false);
            });
        }
    }, [currentTrack]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Playback started
                    })
                    .catch((error) => {
                        console.error("Playback failed:", error);
                        setIsPlaying(false);
                    });
            }
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    };

    return (
        <div className="fixed top-20 right-4 z-50 flex flex-col items-end gap-2 animate-fade-in pointer-events-auto">

            {/* Status Indicator */}
            {(isPlaying || isLoading) && (
                <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 mb-1">
                    {isLoading ? (
                        <Loader2 size={10} className="text-gold animate-spin" />
                    ) : (
                        <div className="flex gap-0.5 items-end h-3">
                            <div className="w-0.5 bg-gold h-full animate-music-bar-1"></div>
                            <div className="w-0.5 bg-gold h-2/3 animate-music-bar-2"></div>
                            <div className="w-0.5 bg-gold h-full animate-music-bar-3"></div>
                        </div>
                    )}
                    <span className="text-[10px] text-white/80 font-serif tracking-wider uppercase">
                        {TRACKS[currentTrack].name}
                    </span>
                </div>
            )}

            {/* Controls */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 pl-3 flex items-center gap-3 shadow-2xl hover:bg-white/10 transition-colors group">

                {/* Visualizer / Title (Compact) */}
                <span className="text-[10px] text-gold font-bold tracking-widest uppercase hidden group-hover:block transition-all">
                    {isPlaying ? 'SOUND ON' : 'SOUND OFF'}
                </span>

                <button
                    onClick={togglePlay}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${isPlaying ? 'text-gold' : 'text-white/40'}`}
                >
                    {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>

                <div className="w-px h-4 bg-white/10"></div>

                <button
                    onClick={nextTrack}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-95 active:rotate-180"
                >
                    <SkipForward size={16} />
                </button>
            </div>

            {/* Styles for Music Bars */}
            <style>{`
                @keyframes music-bar {
                    0%, 100% { height: 30%; }
                    50% { height: 100%; }
                }
                .animate-music-bar-1 { animation: music-bar 0.8s ease-in-out infinite; }
                .animate-music-bar-2 { animation: music-bar 0.8s ease-in-out infinite 0.2s; }
                .animate-music-bar-3 { animation: music-bar 0.8s ease-in-out infinite 0.4s; }
            `}</style>

        </div>
    );
};

export default CosmicPlayer;
