import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Palette, Code2, Layers, Sparkles, BookOpen, Zap } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

const resources = [
    {
        name: "ReactBits",
        description: "Beautiful animated React components you can copy and paste.",
        url: "https://reactbits.dev",
        icon: Code2,
        color: "from-blue-500/10 to-blue-600/5"
    },
    {
        name: "Mobbin",
        description: "UI/UX design patterns from real apps. Perfect for inspiration.",
        url: "https://mobbin.com",
        icon: Palette,
        color: "from-purple-500/10 to-purple-600/5"
    },
    {
        name: "shadcn/ui",
        description: "Copy-paste component library. The vibecoder's best friend.",
        url: "https://ui.shadcn.com",
        icon: Layers,
        color: "from-white/10 to-white/5"
    },
    {
        name: "v0.dev",
        description: "AI-powered UI generation by Vercel. Describe and build.",
        url: "https://v0.dev",
        icon: Sparkles,
        color: "from-green-500/10 to-green-600/5"
    }
];

const comingSoon = [
    "Prompt library for common tasks",
    "Curated Figma templates",
    "API documentation guides",
    "Video tutorials (pro)",
    "Community project showcases",
    "AI model comparison guides"
];

/**
 * Resources Page - Curated tools and links for vibecoders
 */
const Resources = () => {
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
                            <span className="text-red-500">RESOURCES</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl mx-auto">
                            Curated tools, libraries, and inspiration for vibecoders. Everything you need to build faster.
                        </p>
                    </motion.div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        {resources.map((resource, i) => (
                            <motion.a
                                key={resource.name}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`group p-8 rounded-2xl bg-gradient-to-br ${resource.color} border border-white/5 hover:border-white/15 transition-all hover:-translate-y-1`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
                                        <resource.icon size={24} />
                                    </div>
                                    <ArrowUpRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{resource.name}</h3>
                                <p className="text-white/50 text-sm">{resource.description}</p>
                            </motion.a>
                        ))}
                    </div>

                    {/* Coming Soon */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-10 rounded-3xl bg-white/[0.02] border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="text-red-500" size={20} />
                            <span className="text-sm font-mono uppercase tracking-widest text-white/40">Coming Soon</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-6">More resources on the way</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {comingSoon.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-white/40">
                                    <Zap size={14} className="text-red-500/50" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Resources;
