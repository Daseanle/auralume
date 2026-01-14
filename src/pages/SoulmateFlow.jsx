import React, { useState } from 'react';
import Hero from '../components/Hero';
import BirthChartForm from '../components/BirthChartForm';
import RitualProcessor from '../components/RitualProcessor';
import OracleResult from '../components/OracleResult';

import { generateSoulmateReading } from '../lib/gemini'; // NEW

const SoulmateFlow = () => {
    const [step, setStep] = useState('hero'); // hero, scan, form, processing, result
    const [userData, setUserData] = useState(null);
    const [soulmateImage, setSoulmateImage] = useState(null);
    const [readingData, setReadingData] = useState(null); // Store AI Text

    const handleStart = () => {
        setStep('scan'); // Go to scan first
    };

    const handleScanComplete = () => {
        setStep('form'); // Go to form after scan
    };

    // Triggered when user submits Birth Chart Form
    const handleFormSubmit = async (data) => {
        setUserData(data);
        setStep('processing'); // Show loading screen immediately

        try {
            // 1. Generate Text Reading (Gemini)
            const reading = await generateSoulmateReading(data);
            setReadingData(reading);

            // 2. Generate Image based on AI Aura Colors
            // Fallback to "cosmos" if API fails
            const auraPrompt = reading.auraColors || "spiritual cosmos light";
            const imgPrompt = `abstract aura art, ${auraPrompt}, ethereal, spiritual connection with ${data.name}`;
            const imgUrl = generateSoulmateImage(imgPrompt);
            setSoulmateImage(imgUrl);

        } catch (err) {
            console.error("Flow Error:", err);
            // Fallbacks handled in components
        }
    };

    // Called by RitualProcessor when animation is done (approx 6s)
    const handleProcessingComplete = () => {
        setStep('result');
    };

    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center px-4">
            {step === 'hero' && <Hero onStart={handleStart} />}
            {step === 'scan' && <HandScanner onComplete={handleScanComplete} />}
            {step === 'form' && <BirthChartForm onSubmit={handleFormSubmit} />}
            {step === 'processing' && <RitualProcessor onComplete={handleProcessingComplete} />}
            {step === 'result' && <OracleResult image={soulmateImage} readingData={readingData} />}
        </div>
    );
};

export default SoulmateFlow;
