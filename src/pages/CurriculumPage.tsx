import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Code, Layers, Zap, Target, Rocket } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

const modules = [
    { icon: BookOpen, title: "The Vibecoding Mindset", desc: "Understand the paradigm shift from syntax to logic." },
    { icon: Layers, title: "The AI Toolbox", desc: "Master ChatGPT, Claude, Cursor, Bolt, Lovable & more." },
    { icon: Code, title: "Environment Setup", desc: "Configure your development environment for AI-first coding." },
    { icon: Zap, title: "Prompt Engineering", desc: "Learn to communicate effectively with AI." },
    { icon: Target, title: "Frontend Fundamentals", desc: "HTML, CSS, JavaScript, React basics." },
    { icon: Rocket, title: "UI/UX for Vibecoders", desc: "Design principles that make AI-generated code shine." },
];

/**
 * Curriculum Page - Overview of course modules
 */
const Curriculum = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <CardNav items={[]} logoAlt="Learn2Vibecode" />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Back Link */}
                    <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12">
                        <ArrowLeft size={16} /> Back
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                            THE <span className="text-red-500">CURRICULUM</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl mx-auto">
                            12 modules. Text-based learning. Build real projects. No fluff.
                        </p>
                    </motion.div>

                    {/* Modules Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        {modules.map((mod, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                                        <mod.icon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white/30 font-mono text-xs">0{i + 1}</span>
                                            <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                                        </div>
                                        <p className="text-white/50 text-sm">{mod.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                    >
                        <Link to="/auth">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full uppercase tracking-wider"
                            >
                                Start Learning <ArrowRight size={18} />
                            </motion.button>
                        </Link>
                        <p className="mt-6 text-white/30 text-sm">Free • No credit card required</p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Curriculum;
