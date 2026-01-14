import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

const TRACKS = [
    { name: "Deep Space 432Hz", url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_1653835075.mp3?filename=atmosphere-10-124376.mp3" },
    { name: "Alpha Waves", url: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=meditation-impulse-3000.mp3" },
    { name: "Cosmic Rain", url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-rain-ambient-111163.mp3" }
];

const CosmicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const audioRef = useRef(new Audio(TRACKS[0].url));

    useEffect(() => {
        // Configure audio
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Listen for "Start Ritual" event
        const handleStartAudio = () => {
            if (audioRef.current.paused) {
                audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
                setIsPlaying(true);
            }
        };
        window.addEventListener('START_COSMIC_AUDIO', handleStartAudio);

        // Cleanup
        return () => {
            audioRef.current.pause();
            window.removeEventListener('START_COSMIC_AUDIO', handleStartAudio);
        };
    }, []);

    useEffect(() => {
        // Change source when track changes
        const wasPlaying = !audioRef.current.paused;
        audioRef.current.src = TRACKS[currentTrack].url;
        if (wasPlaying) audioRef.current.play();
    }, [currentTrack]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    };

    return (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-2 animate-fade-in">

            {/* Track Info Toast (Visible only when playing) */}
            {isPlaying && (
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] text-gold tracking-widest uppercase mb-1">
                    Now Playing: {TRACKS[currentTrack].name}
                </div>
            )}

            {/* Controls - Always visible now to allow manual start */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-2 flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <button
                    onClick={togglePlay}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${isPlaying ? 'bg-gold/20 text-gold' : 'bg-white/5 text-white/50'}`}
                >
                    {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>

                {isPlaying && (
                    <button
                        onClick={nextTrack}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all"
                    >
                        <SkipForward size={16} />
                    </button>
                )}
            </div>

        </div>
    );
};

export default CosmicPlayer;
