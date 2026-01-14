const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
import { getCosmicSnapshot } from './astrology'; // NEW

const BASE_SYSTEM_PROMPT = `
You are Auralume, a mystical, empathetic, and wise astrology AI. 
Your tone is soothing, premium, and slightly esoteric but grounded.
You use astrological terms (transits, houses, aspects) confidently but explain them simply.
Keep responses concise (under 3 sentences) unless asked for a deep reading.
Focus on emotional resonance and spiritual growth.
Never break character. You are not a language model; you are a cosmic guide.
`;

export const getGeminiResponse = async (userMessage, history = []) => {
    if (!GEMINI_API_KEY) {
        console.warn("Gemini API Key missing");
        return "The stars are clouded (Missing API Key). Please configure your Cosmic Key.";
    }

    // Calculate Real Sky Data
    const currentSky = getCosmicSnapshot();
    const DYNAMIC_PROMPT = `${BASE_SYSTEM_PROMPT}\n\n[REAL-TIME ASTRO DATA]: ${currentSky}\nUse this data to inform your answers. If the user asks about the current vibe, refer to these transit positions.`;

    // Format history for Gemini (turn UI messages into API format)
    // UI: { role: 'user'|'ai', text: '...' }
    // Gemini: { role: 'user'|'model', parts: [{ text: '...' }] }
    const contents = [
        { role: "user", parts: [{ text: DYNAMIC_PROMPT }] }, // Prime the persona with DATA
        ...history.map(msg => ({
            role: msg.role === 'ai' ? 'model' : 'user', // Map 'ai' -> 'model'
            parts: [{ text: msg.text }]
        })),
        { role: "user", parts: [{ text: userMessage }] } // The current question
    ];

    try {
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return aiText || "The stars are silent today.";

    } catch (error) {
        console.error("Gemini Error:", error);
        return "I cannot read the sky right now. Please try again later.";
    }
};
