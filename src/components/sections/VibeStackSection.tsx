import { motion } from 'framer-motion';
import { AI_TOOLS } from '@/lib/constants';

// Tool logos/icons - using text for now, can be replaced with actual logos
const ToolItem = ({ name, index }: { name: string; index: number }) => (
    <div
        className="flex-shrink-0 px-8 py-4 mx-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
    >
        <span className="text-white/70 font-mono text-sm uppercase tracking-wider group-hover:text-white transition-colors">
            {name}
        </span>
    </div>
);

/**
 * Vibe Stack Section - Infinite scrolling AI tools marquee
 * Shows all the AI tools covered in the course
 */
const VibeStackSection = () => {
    // Double the items for seamless infinite scroll
    const doubledTools = [...AI_TOOLS, ...AI_TOOLS];

    return (
        <section className="relative w-full py-24 bg-[#050505] overflow-hidden">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#050505] to-[#080808]" />

            <div className="relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 px-4"
                >
                    <span className="inline-block px-4 py-2 mb-6 text-xs font-mono uppercase tracking-[0.3em] text-white/40 border border-white/10 rounded-full">
                        The Vibe Stack
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Every Tool</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Learn to leverage the full arsenal of AI coding tools
                    </p>
                </motion.div>

                {/* Infinite scroll marquee - Row 1 (left to right) */}
                <div className="relative mb-6">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                    <div className="flex animate-marquee-slow">
                        {doubledTools.map((tool, index) => (
                            <ToolItem key={`row1-${index}`} name={tool} index={index} />
                        ))}
                    </div>
                </div>

                {/* Infinite scroll marquee - Row 2 (right to left) */}
                <div className="relative">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                    <div className="flex animate-marquee-slow-reverse">
                        {doubledTools.reverse().map((tool, index) => (
                            <ToolItem key={`row2-${index}`} name={tool} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VibeStackSection;
