import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Moon, Sun, CloudRain, Cloud, CloudLightning, Snowflake, CloudFog, Sparkles } from 'lucide-react';

// WMO Weather Code Mappings
const getWeatherState = (code, temp) => {
    // 0: Clear sky
    if (code === 0) return { icon: Sun, text: "Solar energy is high. Action favors the bold today.", type: `Sunny, ${temp}°C` };
    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    if (code <= 3) return { icon: Cloud, text: "A veil over the sky. Secrets may be revealed.", type: `Cloudy, ${temp}°C` };
    // 45, 48: Fog
    if (code === 45 || code === 48) return { icon: CloudFog, text: "Vision is obscured. Trust your inner eye.", type: `Foggy, ${temp}°C` };
    // 51-67: Drizzle & Rain
    if (code >= 51 && code <= 67) return { icon: CloudRain, text: "The rain cleanses the spirit. Perfect for introspection.", type: `Rainy, ${temp}°C` };
    // 71-77: Snow
    if (code >= 71 && code <= 77) return { icon: Snowflake, text: "The world is quiet. Find stillness within.", type: `Snowy, ${temp}°C` };
    // 95+: Thunderstorm
    if (code >= 95) return { icon: CloudLightning, text: "Chaotic energy detected. Avoid big decisions.", type: `Storm, ${temp}°C` };

    // Default
    return { icon: Sun, text: "The cosmos is shifting. Stay centered.", type: `Clear, ${temp}°C` };
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [dateStr, setDateStr] = useState('');
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('Stargazer');

    useEffect(() => {
        // 0. Load User Data
        const savedName = localStorage.getItem('aura_username');
        if (savedName) setUserName(savedName);

        // 1. Set Real Date
        const now = new Date();
        const options = { month: 'long', day: 'numeric', weekday: 'long' };
        setDateStr(now.toLocaleDateString('en-US', options));

        // 2. Get Geolocation & Real Weather
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                        const data = await response.json();

                        if (data.current_weather) {
                            const { weathercode, temperature } = data.current_weather;
                            setWeather(getWeatherState(weathercode, temperature));
                        }
                    } catch (err) {
                        console.error("Weather Fetch Error", err);
                        // Fallback
                        setWeather({ icon: Sun, text: "Unable to read local sky. Trust your intuition.", type: "Unknown" });
                    }
                },
                (err) => {
                    console.warn("Geolocation denied", err);
                    setError("Location Access Denied");
                    // Fallback
                    setWeather({ icon: Moon, text: "Location hidden. The stars still guide you.", type: "Mysterious" });
                }
            );
        } else {
            setError("Browser unsupported");
        }
    }, []);

    const WeatherIcon = weather ? weather.icon : Star;

    return (
        <div className="container px-6 pt-10 animate-fade-in block">

            {/* Header */}
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <p className="text-white/60 text-sm tracking-widest uppercase mb-1 font-serif">{dateStr || "Today"}</p>
                    <div className="flex items-center gap-2 mb-1 min-h-[20px]">
                        {weather ? (
                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gold animate-fade-in">{weather.type}</span>
                        ) : (
                            <span className="text-[10px] text-white/30 italic">Reading Sky...</span>
                        )}
                    </div>
                    <h1 className="text-3xl text-white font-serif">Good Evening,<br /><span className="text-gold">{userName}</span></h1>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white">
                    <Sparkles size={20} className="text-gold" />
                </div>
            </header>

            {/* Daily Horoscope Card - WEATHER AWARE */}
            <section className="mb-8">
                <h2 className="text-sm uppercase tracking-widest text-white/40 mb-4 font-serif">Hyper-Local Insight</h2>
                <div className="glass-panel p-6 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12">
                        <WeatherIcon size={80} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-gold">
                            <Star size={16} fill="currentColor" />
                            <span className="text-xs font-bold tracking-wide uppercase">Cosmic Weather</span>
                        </div>
                        <h3 className="text-xl font-serif mb-2">Current Vibration</h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            {weather ? weather.text : "Aligning with local energies..."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Actions Grid */}
            <section>
                <h2 className="text-sm uppercase tracking-widest text-white/40 mb-4 font-serif">Explore</h2>
                <div className="grid grid-cols-2 gap-4">

                    <div onClick={() => navigate('/soulmate')} className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-white/5 transition-colors aspect-square">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                            <span className="text-2xl">❤️</span>
                        </div>
                        <span className="font-serif text-sm">Soulmate</span>
                    </div>

                    <div onClick={() => navigate('/tarot')} className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-white/5 transition-colors aspect-square">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                            <Moon size={24} />
                        </div>
                        <span className="font-serif text-sm">Tarot Reading</span>
                    </div>

                    <div onClick={() => navigate('/chat')} className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-white/5 transition-colors aspect-square">
                        <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300">
                            <span className="text-2xl">🔮</span>
                        </div>
                        <span className="font-serif text-sm">Ask Oracle</span>
                    </div>

                    <div className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-white/5 transition-colors aspect-square">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                            <CloudRain size={24} />
                        </div>
                        <span className="font-serif text-sm">Soundscapes</span>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Dashboard;
