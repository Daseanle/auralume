import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../../components/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-black text-white/80 font-sans flex flex-col">
            <div className="flex-1 p-6 md:p-12">
                <div className="max-w-3xl mx-auto">
                    <NavLink to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Auralume
                    </NavLink>

                    <h1 className="text-3xl md:text-4xl font-serif text-gold mb-8">Privacy Policy</h1>

                    <div className="space-y-6 text-sm leading-relaxed">
                        <p>Last updated: January 14, 2026</p>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">1. Information We Collect</h2>
                            <p>We collect information you provide directly to us, such as your name, birth date, birth time, and birth location. This data is strictly used to generate your astrological reading.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">2. How We Use Information</h2>
                            <p>We use your information to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Process your orders and deliver your digital reports.</li>
                                <li>Generate personalized astrology and aura insights.</li>
                                <li>Send administrative information, such as order confirmations.</li>
                                <li>Respond to your inquiries and provide customer support.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">3. Data Sharing</h2>
                            <p><strong>We do not sell your personal birth data.</strong> We may share payment data with our authorized payment processor (Paddle) solely as required to complete transactions and prevent fraud.</p>
                            <p className="mt-2">Your birth chart information (name, birth date, time, location) is never sold or shared with third parties for marketing purposes.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">4. Data Security</h2>
                            <p>We implement reasonable security measures to protect your personal information:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Secure authentication protocols</li>
                                <li>Regular security audits</li>
                            </ul>
                            <p className="mt-2 text-xs text-white/60">However, no method of transmission over the Internet is 100% secure.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">5. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Access your personal data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Export your data</li>
                            </ul>
                            <p className="mt-2">To exercise these rights, contact us at <a href="mailto:support@shopauralume.com" className="text-gold hover:text-gold/80">support@shopauralume.com</a></p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">6. Contact Us</h2>
                            <p>If you have questions about this Privacy Policy, please contact us at:</p>
                            <p className="mt-2">
                                <a href="mailto:support@shopauralume.com" className="text-gold hover:text-gold/80 transition-colors">support@shopauralume.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Privacy;
