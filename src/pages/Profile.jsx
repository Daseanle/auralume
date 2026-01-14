import React, { useState, useEffect } from 'react';
import { User, Settings, CreditCard, LogOut, Link2, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createPartnershipInvite, getPartnershipStatus } from '../lib/api';
import SubscriptionModal from '../components/SubscriptionModal'; // NEW

const Profile = () => {
    const [syncStatus, setSyncStatus] = useState('idle'); // idle, generating, connected
    const [partnerName, setPartnerName] = useState(null);
    const [showSubscription, setShowSubscription] = useState(false); // NEW

    useEffect(() => {
        // Check real status on mount
        const checkStatus = async () => {
            const user = (await supabase.auth.getUser()).data.user;
            if (user) {
                const partnership = await getPartnershipStatus(user.id);
                if (partnership) {
                    setSyncStatus('connected');
                    // In a real app, we'd fetch the partner's name from their profile ID
                    setPartnerName('Alex (Real)');
                }
            }
        };
        checkStatus();
    }, []);

    const handleConnect = async () => {
        setSyncStatus('generating');
        try {
            const user = (await supabase.auth.getUser()).data.user;
            if (!user) return; // Should not happen in protected route

            const partnership = await createPartnershipInvite(user.id);

            // Success!
            setSyncStatus('idle'); // Back to idle for now as we just created a link
            alert(`INVITE LINK GENERATED (Simulation):\n\nSend this ID to your partner:\n${partnership.id}\n\n(Note: In a full app, this would be a clickable URL)`);

        } catch (err) {
            console.error(err);
            setSyncStatus('idle');
            if (err.message.includes('relation "partnerships" does not exist')) {
                alert("DATABASE ERROR: You haven't created the tables yet!\nPlease copy the SQL from the chat history and run it in Supabase SQL Editor.");
            } else {
                alert("Error connecting to the stars: " + err.message);
            }
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            localStorage.removeItem('aura_session'); // Clear mock if exists
            // Force reload to clear all states or navigate to auth
            window.location.href = '/auth';
        } else {
            alert('Error signing out: ' + error.message);
        }
    };

    const handlePlaceholder = (feature) => {
        alert(`${feature} is coming soon in the next update!`);
    };

    return (
        <div className="container px-6 pt-10 animate-fade-in block pb-32">

            <div className="flex flex-col items-center mb-10">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-gold p-1 mb-4">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full rounded-full bg-white/10" />
                    </div>
                    {syncStatus === 'connected' && (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-2 border-gold p-0.5 bg-black">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Partner" className="w-full h-full rounded-full bg-white/10" />
                        </div>
                    )}
                </div>
                <h1 className="text-2xl font-serif">Felix Stargazer</h1>

                {syncStatus === 'connected' ? (
                    <div className="flex items-center gap-2 mt-2 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/50">
                        <HeartHandshake size={14} className="text-purple-300" />
                        <span className="text-xs uppercase tracking-wider text-purple-200">Alex • Synastry Active</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Premium Member</span>
                    </div>
                )}
            </div>

            {/* Sync Section - NEW */}
            <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest text-white/40 mb-4 font-serif">Relationships</h2>
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300">
                                <Link2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-serif">Partner Sync</h3>
                                <p className="text-xs text-white/50">Unlock Combined Horoscopes</p>
                            </div>
                        </div>
                        {syncStatus === 'connected' ? <CheckCircle2 className="text-green-400" size={24} /> : null}
                    </div>

                    {syncStatus === 'idle' && (
                        <button onClick={handleConnect} className="w-full py-2 rounded-lg border border-pink-500/50 text-pink-300 text-sm hover:bg-pink-500/10 transition-colors">
                            Connect Partner
                        </button>
                    )}

                    {syncStatus === 'generating' && (
                        <button disabled className="w-full py-2 rounded-lg border border-white/10 text-white/50 text-sm flex justify-center gap-2">
                            <span className="animate-spin">⏳</span> Generating Link...
                        </button>
                    )}

                    {syncStatus === 'connected' && (
                        <button className="w-full py-2 rounded-lg bg-pink-600 text-white text-sm shadow-[0_0_15px_rgba(219,39,119,0.4)]">
                            View Synastry Report
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm uppercase tracking-widest text-white/40 font-serif">Settings</h2>

                <div onClick={() => handlePlaceholder('Personal Details')} className="glass-panel p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                        <User size={20} className="text-white/60" />
                        <span>Personal Details</span>
                    </div>
                    <span className="text-white/40">›</span>
                </div>

                <div onClick={() => setShowSubscription(true)} className="glass-panel p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                        <CreditCard size={20} className="text-white/60" />
                        <span>Subscription Management</span>
                    </div>
                    <span className="text-white/40">›</span>
                </div>

                <div onClick={() => handlePlaceholder('App Settings')} className="glass-panel p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                        <Settings size={20} className="text-white/60" />
                        <span>App Settings</span>
                    </div>
                    <span className="text-white/40">›</span>
                </div>

                <div onClick={handleSignOut} className="p-4 flex items-center gap-4 text-red-400 cursor-pointer mt-8 justify-center hover:bg-red-500/10 rounded-lg transition-colors active:scale-[0.98]">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </div>

            </div>

            {showSubscription && (
                <SubscriptionModal
                    onClose={() => setShowSubscription(false)}
                    onSuccess={() => {
                        setShowSubscription(false);
                        alert("Cosmic Upgrade Complete! You are now Premium.");
                        // Force refresh or update state to show premium badge
                        window.location.reload();
                    }}
                />
            )}

        </div>
    );
};

export default Profile;
