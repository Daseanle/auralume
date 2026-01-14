import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-black text-white/80 font-sans p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <NavLink to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Auralume
                </NavLink>

                <h1 className="text-3xl md:text-4xl font-serif text-gold mb-8">Terms and Conditions</h1>

                <div className="space-y-6 text-sm leading-relaxed">
                    <p>Last updated: January 13, 2026</p>

                    <h2 className="text-xl text-white font-bold mb-3">1. Introduction</h2>
                    <p>Welcome to Auralume ("Company", "we", "our", "us"). By accessing or using our website and services, you agree to be bound by these Terms of Service.</p>
                    <p className="mt-2 text-white/60 text-xs">Auralume uses third-party Merchants of Record (e.g., Paddle) to handle payments and billing. By purchasing, you also agree to their respective checkout terms.</p>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">2. Services</h2>
                        <p>Auralume provides AI-generated astrology reports and digital artwork ("Services"). These services are for entertainment and spiritual exploration purposes only. We do not guarantee specific life outcomes.</p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">3. Payments</h2>
                        <p>You agree to pay the fees associated with your selected Service (e.g., $9.99 for Soulmate Report). All payments are one-time transactions unless explicitly stated effectively as a subscription.</p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">4. Intellectual Property</h2>
                        <p>Unlock purchasing a report, you are granted a non-exclusive, personal license to use the generated Aura Art for personal use. Auralume retains ownership of the underlying generation technology.</p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">5. Disclaimer</h2>
                        <p>Our services are not a substitute for professional psychological, medical, or financial advice. Use the insights at your own discretion.</p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">6. Contact</h2>
                        <p>For questions about these Terms, please contact us at support@shopauralume.com.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
