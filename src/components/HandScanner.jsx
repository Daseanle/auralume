import React, { useState } from 'react';
import { Scan, Upload, Fingerprint } from 'lucide-react';

const HandScanner = ({ onComplete }) => {
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = (e) => {
        // Mock upload - just trigger the scan effect
        if (e.target.files?.[0]) {
            startScan();
        }
    };

    const startScan = () => {
        setScanning(true);
        // Simulate scanning progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
    };

    return (
        <div className="center-col min-h-[60vh] animate-fade-in relative">
            <h2 className="text-2xl font-serif text-gold mb-2">Biometric Resonance</h2>
            <p className="text-white/50 text-sm mb-8">Upload your left palm to read your energy signature.</p>

            <div className="relative w-64 h-80 border-2 border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md flex items-center justify-center group cursor-pointer transition-all hover:border-gold/30">

                {!scanning ? (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        />
                        <div className="center-col text-white/30 group-hover:text-gold transition-colors">
                            <Upload size={32} className="mb-2" />
                            <span className="text-xs uppercase tracking-widest">Upload Palm Photo</span>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 w-full h-full">
                        {/* Scanning Line */}
                        <div
                            className="absolute w-full h-1 bg-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
                            style={{ top: `${progress}%`, transition: 'top 0.1s linear' }}
                        />

                        {/* Grid Effect */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                        {/* Data Overlay */}
                        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-cyan-500">
                            SCANNING... {progress}%<br />
                            VITALITY: DETECTED<br />
                            AURA: ANALYZING
                        </div>

                        {/* Fingerprint Icon background */}
                        <div className="absolute inset-0 center-col opacity-10">
                            <Fingerprint size={120} className="text-cyan-500 animate-pulse" />
                        </div>
                    </div>
                )}
            </div>

            <p className="mt-8 text-[10px] text-white/20 max-w-xs text-center">
                *Your biometric data is processed locally and converted into a quantum hash for Aura generation. Images are not stored.
            </p>
        </div>
    );
};

export default HandScanner;
