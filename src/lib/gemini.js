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

export const generateSoulmateReading = async (userData) => {
    if (!GEMINI_API_KEY) {
        return {
            persona: "The Cosmic Mystery",
            traits: "Unknown, Ethereal, Distant",
            meetingPlace: "In your dreams",
            analysis: "API Key missing. Cannot read the stars uniquely."
        };
    }

    const prompt = `
    [ROLE]:
    You are Auralume, a world-class Evolutionary Astrologer and Psychic Intuitive.
    Your specialty is Synastry (Relationship Astrology) and Karmic Connections.
    
    [CONTEXT]:
    The user is seeking their "Cosmic Soulmate" - a person their natal chart is destined to align with.
    
    [USER DATA]:
    - Name: ${userData.name}
    - Birth Date: ${userData.date}
    - Birth Place: ${userData.birthPlace}
    - Birth Time: ${userData.time}

    [INSTRUCTIONS]:
    1. Calculate the user's approximate Rising Sign (Ascendant) and Descendant (7th House Cusp) based on the birth time provided (if time is '12:00' or default, assume Noon Chart).
    2. Analyze the element (Fire, Earth, Air, Water) of their Descendant to determine the nature of their ideal partner.
    3. Consider their Venus sign to understand their love language and aesthetic attraction.
    4. Synthesize this into a "Soulmate Profile" that feels deeply personal, mystical, and psychologically accurate.

    [OUTPUT FORMAT]:
    Return ONLY valid JSON. No markdown. No preamable.
    {
        "persona": "A poetic, archetypal title (e.g. 'The Grounded Architect' or 'The Electric Muse')",
        "traits": "3 specific adjectives that describe the soulmate's vibe (e.g. 'Unconventional, Cerebral, Loyal')",
        "meetingPlace": "A vivid, atmospheric location prediction (e.g. 'In a dusty library aisle where time stands still')",
        "analysis": "A sophisticated 2-3 sentence insight. Explain WHY they match using astrological reasoning (e.g. 'Your watery Pisces Moon craves the container that their Earthy stability provides...'). make it sound magical but grounded.",
        "auraColors": "Two distinct colors that visualize their energy (e.g. 'Deep Velvet Maroon and Stark White')"
    }
    `;

    try {
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        // Clean up markdown if present (```json ... ```)
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Gemini Soulmate Gen Error:", error);
        return {
            persona: "The Destined One",
            traits: "Loyal, Passionate, Mysterious",
            meetingPlace: "Where light meets shadow",
            analysis: "Your energies align in a way that transcends time. They ground your chaos.",
            auraColors: "Purple and Silver"
        };
    }
};
