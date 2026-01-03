import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Lightbulb, Rocket } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

/**
 * Our Vision Page
 */
const Vision = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <CardNav items={[]} logoAlt="Learn2Vibecode" />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">

                    <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12">
                        <ArrowLeft size={16} /> Back
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                            OUR <span className="text-red-500">VISION</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl">
                            Redefining what it means to build software in the age of AI.
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-6"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                                <Target size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Democratize Software Creation</h3>
                                <p className="text-white/50 leading-relaxed">
                                    We believe everyone should be able to bring their ideas to life. The barrier between imagination and implementation has collapsed. Learn2Vibecode exists to help you cross that threshold—whether you're an entrepreneur, designer, student, or dreamer.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-6"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                                <Lightbulb size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Logic Over Syntax</h3>
                                <p className="text-white/50 leading-relaxed">
                                    Traditional coding education focuses on memorizing syntax, debugging semicolons, and fighting with configuration files. We focus on what actually matters: thinking in systems, understanding logic, and orchestrating AI to execute your vision.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-6"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                                <Rocket size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Build the Future</h3>
                                <p className="text-white/50 leading-relaxed">
                                    The next generation of builders won't be defined by what languages they know, but by what they can create. We're preparing that generation today. Join us in building the future—one vibe at a time.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Vision;
