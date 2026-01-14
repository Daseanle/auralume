import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2, StopCircle, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { saveReading, getChatHistory } from '../lib/api';
import { getGeminiResponse } from '../lib/gemini';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

    // Load History from DB
    useEffect(() => {
        const loadHistory = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const history = await getChatHistory(user.id);
                if (history && history.length > 0) {
                    // Flatten history from DB format if needed, or just append
                    // For MVP, we likely stored single messages.
                    // Let's assume we store the whole array or individual messages.
                    // Simplified: Just loading last session or default
                    // Actual Real Implementation: Map DB rows to UI messages
                    const historyMsgs = history.map(h => h.content);
                    setMessages(historyMsgs);
                } else {
                    setMessages([{ role: 'ai', text: "I am Auralume. The stars have much to tell you. What do you seek?" }]);
                }
            } else {
                // If no user, load a default message or handle as anonymous
                setMessages([{ role: 'ai', text: "I am Auralume. The stars have much to tell you. What do you seek?" }]);
            }
        };
        loadHistory();
    }, []);

    // Save History (removed localStorage, now handled by saveToCloud)
    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 0.9;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const saveToCloud = async (msg) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await saveReading(user.id, 'chat', msg);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        saveToCloud(userMsg);
        setInput('');
        setIsTyping(true);

        try {
            // Call Real Gemini API
            // We pass the recent history for context
            const responseText = await getGeminiResponse(userMsg.text, messages);

            const aiMsg = { role: 'ai', text: responseText };
            setMessages(prev => [...prev, aiMsg]);
            saveToCloud(aiMsg);
            speak(responseText);
        } catch (err) {
            const errorMsg = { role: 'ai', text: "The connection to the stars is weak. Please try again." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const toggleMic = () => {
        if (isListening) {
            setIsListening(false);
            setInput("Will I find love soon?");
        } else {
            setIsListening(true);
            setTimeout(() => {
                setIsListening(false);
                setInput("Is my career on the right path?");
            }, 2000);
        }
    };

    const clearHistory = () => {
        if (window.confirm("Clear cosmic memory?")) {
            setMessages([{ role: 'ai', text: "Memory cleared. The slate is clean." }]);
            localStorage.removeItem('aura_chat_history');
        }
    };

    return (
        <div className="container px-4 pt-4 pb-24 h-screen flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pt-4">
                <h1 className="text-xl font-serif text-white">Ask The Oracle</h1>
                <div className="flex gap-4">
                    {isSpeaking && <Volume2 className="text-gold animate-pulse" size={20} />}
                    <button onClick={clearHistory} className="text-white/30 hover:text-white">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide pr-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} `}>
                        <div className={`max - w - [85 %] p - 4 rounded - 2xl ${msg.role === 'user' ? 'bg-gold/20 text-white rounded-br-none border border-gold/10' : 'glass-panel text-gray-200 rounded-bl-none'} `}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isListening && (
                    <div className="flex justify-end animate-fade-in">
                        <div className="bg-gold/10 p-4 rounded-2xl rounded-br-none flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="glass-panel p-2 flex items-center gap-2 rounded-full shadow-2xl">
                <button
                    onClick={toggleMic}
                    className={`w - 10 h - 10 rounded - full flex items - center justify - center transition - all ${isListening ? 'bg-red-500/50 text-white animate-pulse shadow-[0_0_15px_red]' : 'bg-white/5 text-gold hover:bg-white/10'} `}
                >
                    {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
                </button>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a question..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/30 text-sm py-2 px-2 outline-none"
                />

                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={`w - 10 h - 10 rounded - full flex items - center justify - center transition - all ${input.trim() ? 'bg-gold text-black hover:bg-gold-hover shadow-[0_0_15px_#D4AF37]' : 'bg-white/10 text-white/20'} `}
                >
                    <Send size={18} />
                </button>
            </div>

        </div>
    );
};

export default Chat;
