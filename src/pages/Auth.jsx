import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { supabase, isBackendConnected } from '../lib/supabase';

const Auth = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isBackendConnected()) {
                // Real Supabase Auth (Will fail if no keys)
                const { error } = isSignUp
                    ? await supabase.auth.signUp(formData)
                    : await supabase.auth.signInWithPassword(formData);
                if (error) throw error;
            } else {
                // Mock Auth for Demo
                await new Promise(r => setTimeout(r, 1000));
                localStorage.setItem('aura_session', 'mock_token');
            }
            navigate('/'); // Go to Dashboard on success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background (Simplified for load speed) */}
            <div className="absolute inset-0 bg-cosmic z-0">
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="glass-panel w-full max-w-md p-8 relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                        <Sparkles size={24} />
                    </div>
                    <h1 className="text-2xl font-serif text-white mb-2">
                        {isSignUp ? 'Join the Cosmos' : 'Welcome Back'}
                    </h1>
                    <p className="text-white/50 text-sm">
                        {isSignUp ? 'Begin your journey to self-discovery.' : 'Your destiny awaits.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Email</label>
                        <div className="bg-white/5 border border-white/10 rounded-lg flex items-center px-3 py-3 focus-within:border-gold/50 transition-colors">
                            <Mail size={18} className="text-white/30 mr-3" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                                className="bg-transparent border-none outline-none text-white w-full placeholder-white/20 text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Password</label>
                        <div className="bg-white/5 border border-white/10 rounded-lg flex items-center px-3 py-3 focus-within:border-gold/50 transition-colors">
                            <Lock size={18} className="text-white/30 mr-3" />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                className="bg-transparent border-none outline-none text-white w-full placeholder-white/20 text-sm"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs p-3 rounded text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-cosmic w-full flex items-center justify-center gap-2 group"
                    >
                        {loading ? 'Aligning Stars...' : (isSignUp ? 'Create Account' : 'Sign In')}
                        {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-white/40 text-sm hover:text-gold transition-colors"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Join Now"}
                    </button>
                </div>

                {!isBackendConnected() && (
                    <div className="mt-8 pt-4 border-t border-white/5 text-center">
                        <p className="text-[10px] text-white/20">DEV MODE: Database Not Connected. Login will be simulated.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Auth;
