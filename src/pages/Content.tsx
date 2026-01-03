import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, BookOpen, Layers, Zap } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

const contentTypes = [
    {
        icon: BookOpen,
        title: "Text-Based Lessons",
        description: "No fluff, no filler. Concise, actionable lessons you can read at your own pace. Every word matters."
    },
    {
        icon: Play,
        title: "Interactive Projects",
        description: "Learn by building. Each module includes hands-on projects that you'll actually want to finish."
    },
    {
        icon: Layers,
        title: "Real-World Templates",
        description: "Start faster with battle-tested templates. Landing pages, dashboards, apps—ready to customize."
    },
    {
        icon: Zap,
        title: "Prompt Libraries",
        description: "Copy-paste prompts that work. Battle-tested instructions for common development tasks."
    }
];

/**
 * Content Page (formerly Manifesto)
 */
const Content = () => {
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
                            OUR <span className="text-red-500">CONTENT</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl">
                            How we teach vibecoding. No videos, no lectures—just actionable content that respects your time.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contentTypes.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-white/50 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-red-950/20 to-black/40 border border-red-500/10 text-center"
                    >
                        <h3 className="text-2xl font-bold mb-4">Ready to start learning?</h3>
                        <p className="text-white/50 mb-6">Join 20,000+ builders already on their journey.</p>
                        <Link to="/auth">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-black font-bold rounded-full uppercase tracking-wider"
                            >
                                Get Started Free
                            </motion.button>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Content;
