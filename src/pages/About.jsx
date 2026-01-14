import React from 'react';
import { ArrowLeft, Sparkles, Star, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-cosmic text-white pb-24 padding-top-safe">
            <div className="container mx-auto px-6 pt-24 max-w-4xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30">
                        <Sparkles size={32} className="text-gold" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-gold mb-6">About Auralume</h1>
                    <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
                        Merging ancient astrological wisdom with modern artificial intelligence to guide you toward your cosmic connections.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="glass-panel p-8 md:p-12 mb-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-serif mb-4 flex items-center gap-3">
                                <Star className="text-purple-400" size={24} />
                                Our Mission
                            </h2>
                            <p className="text-white/70 leading-relaxed mb-6">
                                At Auralume, we believe that love is written in the stars, but finding it shouldn't require a telescope. We built Auralume to decode the complex language of the cosmos into clear, actionable insights for your love life.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                Our mission is to help 1 million souls find energetic alignment and deep, meaningful relationships through the power of synastry and aura analysis.
                            </p>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[250px] rounded-xl overflow-hidden border border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 mix-blend-overlay z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?q=80&w=1000&auto=format&fit=crop"
                                alt="Galaxy"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="glass-panel p-6 text-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart size={24} className="text-pink-400" />
                        </div>
                        <h3 className="text-lg font-serif mb-2">Authenticity</h3>
                        <p className="text-sm text-white/50">We honor the true traditions of western astrology while embracing modern interpretation.</p>
                    </div>
                    <div className="glass-panel p-6 text-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-lg font-serif mb-2">Connection</h3>
                        <p className="text-sm text-white/50">We focus on deep, soulful connections rather than superficial swiping.</p>
                    </div>
                    <div className="glass-panel p-6 text-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles size={24} className="text-gold" />
                        </div>
                        <h3 className="text-lg font-serif mb-2">Innovation</h3>
                        <p className="text-sm text-white/50">We use state-of-the-art AI to generate hyper-personalized readings and aura art.</p>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="text-center bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h2 className="text-2xl font-serif mb-4">Get in Touch</h2>
                    <p className="text-white/60 mb-6">Have questions or business inquiries? We'd love to hear from you.</p>
                    <a
                        href="mailto:support@shopauralume.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
                    >
                        Contact Support
                        <ArrowLeft size={16} className="rotate-180" />
                    </a>
                </div>

                {/* Back Link */}
                <div className="mt-12 text-center">
                    <Link to="/" className="text-white/40 hover:text-white flex items-center justify-center gap-2 transition-colors">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;
