import React, { useState } from 'react';
import Hero from '../components/Hero';
import BirthChartForm from '../components/BirthChartForm';
import RitualProcessor from '../components/RitualProcessor';
import OracleResult from '../components/OracleResult';

import { generateSoulmateImage } from '../lib/image-gen';

import HandScanner from '../components/HandScanner'; // NEW

const SoulmateFlow = () => {
    const [step, setStep] = useState('hero'); // hero, scan, form, processing, result
    const [userData, setUserData] = useState(null);
    const [soulmateImage, setSoulmateImage] = useState(null);

    const handleStart = () => {
        setStep('scan'); // Go to scan first
    };

    const handleScanComplete = () => {
        setStep('form'); // Go to form after scan
    };

    const handleFormSubmit = (data) => {
        setUserData(data);

        // Generate Unique Image based on inputs
        // e.g. "Soulmate for Sarah, intense scorpio energy"
        const prompt = `unique aura art for ${data.name || 'User'}, ${data.birthPlace || 'cosmos'} energy, spiritual light, abstract colors`;
        const imgUrl = generateSoulmateImage(prompt);
        setSoulmateImage(imgUrl);

        setStep('processing');
    };

    const handleProcessingComplete = () => {
        setStep('result');
    };

    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center px-4">
            {step === 'hero' && <Hero onStart={handleStart} />}
            {step === 'scan' && <HandScanner onComplete={handleScanComplete} />}
            {step === 'form' && <BirthChartForm onSubmit={handleFormSubmit} />}
            {step === 'processing' && <RitualProcessor onComplete={handleProcessingComplete} />}
            {step === 'result' && <OracleResult image={soulmateImage} />}
        </div>
    );
};

export default SoulmateFlow;
