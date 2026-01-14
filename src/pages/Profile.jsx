import React, { useState, useEffect } from 'react';
import { User, Settings, CreditCard, LogOut, Link2, HeartHandshake, CheckCircle2, X, Bell, Volume2, Moon, Globe, ChevronRight, Copy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createPartnershipInvite, getPartnershipStatus } from '../lib/api';
import SubscriptionModal from '../components/SubscriptionModal';

const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-white">{title}</h3>
                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
            {children}
        </div>
    </div>
);

const ToggleRow = ({ icon: Icon, label, value, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
        <div className="flex items-center gap-3 text-white/80">
            <Icon size={18} />
            <span className="text-sm">{label}</span>
        </div>
        <button
            onClick={() => onChange(!value)}
            className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-gold' : 'bg-white/20'}`}
        >
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : ''}`} />
        </button>
    </div>
);

const Profile = () => {
    const [user, setUser] = useState(null);
    const [syncStatus, setSyncStatus] = useState('idle'); // idle, generating, connected
    const [partnerName, setPartnerName] = useState(null);

    // Modals State
    const [activeModal, setActiveModal] = useState(null); // 'subscription', 'details', 'settings', 'sync'
    const [inviteLink, setInviteLink] = useState('');

    // Settings State (Mock)
    const [settings, setSettings] = useState({
        notifications: true,
        sound: true,
        darkMode: true,
        language: 'en'
    });

    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);

            if (data.user) {
                const partnership = await getPartnershipStatus(data.user.id);
                if (partnership) {
                    setSyncStatus('connected');
                    setPartnerName('Alex (Real)');
                }
            }
        };
        init();
    }, []);

    const handleConnect = async () => {
        setSyncStatus('generating');
        try {
            if (!user) return;

            const partnership = await createPartnershipInvite(user.id);
            setInviteLink(partnership.id); // In real app, make full link
            setActiveModal('sync');
            setSyncStatus('idle');

        } catch (err) {
            console.error(err);
            setSyncStatus('idle');
            alert("Connection error: " + err.message);
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            localStorage.removeItem('aura_session');
            window.location.href = '/auth';
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        alert('Invitation code copied!');
    };

    return (
        <div className="container px-6 pt-10 animate-fade-in block pb-32">

            {/* Header */}
            <div className="flex flex-col items-center mb-10">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-gold p-1 mb-4">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Felix'}`} alt="Profile" className="w-full h-full rounded-full bg-white/10" />
                    </div>
                    {syncStatus === 'connected' && (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-2 border-gold p-0.5 bg-black">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Partner" className="w-full h-full rounded-full bg-white/10" />
                        </div>
                    )}
                </div>
                <h1 className="text-2xl font-serif">{user?.email?.split('@')[0] || 'Stargazer'}</h1>

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

            {/* Sync Section */}
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

            {/* Menu Items */}
            <div className="space-y-4">
                <h2 className="text-sm uppercase tracking-widest text-white/40 font-serif">Settings</h2>

                <div onClick={() => setActiveModal('details')} className="glass-panel p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                        <User size={20} className="text-white/60" />
                        <span>Personal Details</span>
                    </div>
                    <ChevronRight size={16} className="text-white/40" />
                </div>

                <div onClick={() => setActiveModal('subscription')} className="glass-panel p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                        <CreditCard size={20} className="text-white/60" />
                        <span>Subscription Management</span>
                    </div>
                    <ChevronRight size={16} className="text-white/40" />
                </div>

                <div onClick={() => setActiveModal('settings')} className="glass-panel p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                        <Settings size={20} className="text-white/60" />
                        <span>App Settings</span>
                    </div>
                    <ChevronRight size={16} className="text-white/40" />
                </div>

                <div onClick={handleSignOut} className="p-4 flex items-center gap-4 text-red-400 cursor-pointer mt-8 justify-center hover:bg-red-500/10 rounded-lg transition-colors active:scale-[0.98]">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Sync Invite Modal */}
            {activeModal === 'sync' && (
                <Modal title="Connect Partner" onClose={() => setActiveModal(null)}>
                    <p className="text-white/70 text-sm mb-4">
                        Share this unique code with your partner to unlock deep synastry insights and daily combined horoscopes.
                    </p>
                    <div className="bg-black/50 p-4 rounded-lg flex items-center justify-between border border-white/10 mb-6">
                        <code className="text-gold font-mono tracking-wider">{inviteLink}</code>
                        <button onClick={copyToClipboard} className="text-white/60 hover:text-white">
                            <Copy size={18} />
                        </button>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="btn-cosmic w-full py-2 rounded-lg">
                        Done
                    </button>
                </Modal>
            )}

            {/* Personal Details Modal */}
            {activeModal === 'details' && (
                <Modal title="Personal Details" onClose={() => setActiveModal(null)}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1">Email</label>
                            <div className="text-white/90 font-sans">{user?.email}</div>
                        </div>
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1">User ID</label>
                            <div className="text-white/50 text-xs font-mono break-all">{user?.id}</div>
                        </div>
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1">Member Since</label>
                            <div className="text-white/90">January 14, 2026</div>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-xs text-white/40">To change your details, please contact support.</p>
                        </div>
                    </div>
                </Modal>
            )}

            {/* App Settings Modal */}
            {activeModal === 'settings' && (
                <Modal title="App Settings" onClose={() => setActiveModal(null)}>
                    <div className="mb-6">
                        <ToggleRow
                            icon={Bell}
                            label="Push Notifications"
                            value={settings.notifications}
                            onChange={(v) => setSettings({ ...settings, notifications: v })}
                        />
                        <ToggleRow
                            icon={Volume2}
                            label="Sound Effects"
                            value={settings.sound}
                            onChange={(v) => setSettings({ ...settings, sound: v })}
                        />
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <div className="flex items-center gap-3 text-white/80">
                                <Moon size={18} />
                                <span className="text-sm">Dark Mode</span>
                            </div>
                            <span className="text-xs text-white/40">Always On</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <div className="flex items-center gap-3 text-white/80">
                                <Globe size={18} />
                                <span className="text-sm">Language</span>
                            </div>
                            <span className="text-xs text-gold">English</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-white/30">Auralume v1.0.2 (Build 2026.01.14)</p>
                    </div>
                </Modal>
            )}

            {/* Subscription Modal (Existing) */}
            {activeModal === 'subscription' && (
                <SubscriptionModal
                    onClose={() => setActiveModal(null)}
                    onSuccess={() => {
                        setActiveModal(null);
                        alert("Cosmic Upgrade Complete! You are now Premium.");
                        window.location.reload();
                    }}
                />
            )}

        </div>
    );
};

export default Profile;
