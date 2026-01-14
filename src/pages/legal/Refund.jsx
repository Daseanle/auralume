import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../../components/Footer';

const Refund = () => {
    return (
        <div className="min-h-screen bg-black text-white/80 font-sans flex flex-col">
            <div className="flex-1 p-6 md:p-12">
                <div className="max-w-3xl mx-auto">
                    <NavLink to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Auralume
                    </NavLink>

                    <h1 className="text-3xl md:text-4xl font-serif text-gold mb-8">Refund Policy</h1>

                    <div className="space-y-6 text-sm leading-relaxed">
                        <p>Last updated: January 14, 2026</p>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">1. Digital Products</h2>
                            <p>Because our products (Soulmate Reports, Aura Art, Oracle readings) are digital goods delivered immediately upon purchase, we generally do not offer refunds once the service has been rendered and the report has been unlocked.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">2. Refund Window</h2>
                            <p><strong>14-Day Satisfaction Guarantee:</strong> If you are not completely satisfied with your purchase, you may request a refund within 14 days of the original purchase date, provided you have not used the service excessively.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">3. Subscription Refunds</h2>
                            <p>For subscription plans (Monthly Premium at $9.99/month or Yearly Premium at $99.99/year):</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>You may cancel your subscription at any time</li>
                                <li>Cancellation takes effect at the end of the current billing period</li>
                                <li>No partial refunds for unused portions of a billing period</li>
                                <li>You retain access to Premium features until the end of the paid period</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">4. Exceptions</h2>
                            <p>We may offer a full refund or replacement under the following circumstances:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li><strong>Technical Defect:</strong> If the report is corrupted, blank, or technically inaccessible</li>
                                <li><strong>Non-Delivery:</strong> If you did not receive the report after payment confirmation</li>
                                <li><strong>Duplicate Charge:</strong> If you were accidentally charged twice for the same transaction</li>
                                <li><strong>Service Disruption:</strong> If our service was unavailable for an extended period affecting your use</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">5. How to Request a Refund</h2>
                            <p>To request a refund, please:</p>
                            <ol className="list-decimal pl-5 space-y-1 mt-2">
                                <li>Email us at <a href="mailto:support@shopauralume.com" className="text-gold hover:text-gold/80">support@shopauralume.com</a></li>
                                <li>Include your Transaction ID (found in your purchase confirmation email)</li>
                                <li>Include the email address used during purchase</li>
                                <li>Briefly explain the reason for your refund request</li>
                            </ol>
                            <p className="mt-2 text-xs text-white/60">We will process your refund request within 5-7 business days.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-bold mb-3">6. Contact</h2>
                            <p>If you have questions about this Refund Policy, please contact us at:</p>
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

export default Refund;
