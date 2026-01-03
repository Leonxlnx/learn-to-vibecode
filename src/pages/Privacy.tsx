import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

/**
 * Privacy Policy Page
 */
const Privacy = () => {
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
                            Privacy Policy
                        </h1>

                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-white/60 text-lg mb-8">
                                Last updated: January 2026
                            </p>

                            <div className="space-y-8 text-white/50">
                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
                                    <p>We collect information you provide directly to us, such as your name, email address, and any other information you choose to provide when creating an account or using our services.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                                    <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on Learn2Vibecode.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">3. Information Sharing</h2>
                                    <p>We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted service providers who assist us in operating our platform.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">4. Data Security</h2>
                                    <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">5. Cookies</h2>
                                    <p>We use cookies to enhance your experience on our platform. You can choose to disable cookies through your browser settings, though this may affect functionality.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">6. Your Rights</h2>
                                    <p>You have the right to access, correct, or delete your personal information. Contact us at <a href="mailto:leon.lin.privat@gmail.com" className="text-red-500 hover:underline">leon.lin.privat@gmail.com</a> to exercise these rights.</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-white mb-4">7. Contact</h2>
                                    <p>For questions about this Privacy Policy, contact us at <a href="mailto:leon.lin.privat@gmail.com" className="text-red-500 hover:underline">leon.lin.privat@gmail.com</a></p>
                                </section>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Privacy;
