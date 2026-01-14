import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Refund = () => {
    return (
        <div className="min-h-screen bg-black text-white/80 font-sans p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <NavLink to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Auralume
                </NavLink>

                <h1 className="text-3xl md:text-4xl font-serif text-gold mb-8">Refund Policy</h1>

                <div className="space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">Digital Products</h2>
                        <p>Because our products (Soulmate Reports, Aura Art) are digital goods delivered immediately upon purchase, we generally do not offer refunds once the service has been rendered and the report has been unlocked.</p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">Exceptions</h2>
                        <p>We may offer a full refund or replacement under the following circumstances:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>**Technical Error**: If a system failure prevented you from receiving your report.</li>
                            <li>**Duplicate Charge**: If you were accidentally charged twice for the same transaction.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-3">How to Request</h2>
                        <p>To request a refund, please email support@shopauralume.com within 7 days of purchase. Please include your Transaction ID and the email address used during purchase.</p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Refund;
