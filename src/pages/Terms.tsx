import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

/**
 * Terms of Service Page
 */
const Terms = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <CardNav items={[]} logoAlt="Learn2Vibecode" />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">

                    <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12">
                        <ArrowLeft size={16} /> Back
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
                            Terms of Service
                        </h1>

                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-white/60 text-lg mb-8">
                                Last updated: January 2026
                            </p>

                            <div className="space-y-8 text-white/50">
                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                                    <p>By accessing and using Learn2Vibecode, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">2. Use of Service</h2>
                                    <p>Learn2Vibecode provides educational content for AI-assisted software development. You may use our content for personal and commercial learning purposes. You may not redistribute our content without permission.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">3. User Accounts</h2>
                                    <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
                                    <p>All content on Learn2Vibecode, including but not limited to text, graphics, logos, and software, is the property of Learn2Vibecode and is protected by intellectual property laws.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                                    <p>Learn2Vibecode is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our services.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">6. Contact</h2>
                                    <p>For questions about these Terms, contact us at <a href="mailto:leon.lin.privat@gmail.com" className="text-red-500 hover:underline">leon.lin.privat@gmail.com</a></p>
                                </section>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Terms;
