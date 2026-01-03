import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * VibeStack Section - The Arsenal
 * REFINED: Clear presentation of 3 images + Complex Bento Grid of Terms.
 */
const VibeStackSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const terms = [
        "Qwen", "Codex", "Claude Code", "Antigravity",
        "Gemini", "Kimi", "Grok", "Deepseek",
        "Z.ai", "Minimax", "Cursor", "Vscode",
        "Windsurf", "Bolt.new", "Lovable", "Base44",
        "v0", "Copilot"
    ];

    return (
        <section ref={containerRef} className="relative w-full py-48 bg-[#030303] overflow-hidden">

            {/* Header */}
            <div className="text-center mb-32 px-6 relative z-10">
                <span className="inline-block border border-white/10 px-4 py-1 rounded-full bg-white/5 text-sm font-mono text-white/40 mb-6 uppercase tracking-widest">
                    The Stack
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
                    THE ARSENAL
                </h2>
            </div>

            {/* 1. The 3 Images Showcase */}
            <div className="max-w-[1400px] mx-auto px-6 mb-48">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((num) => (
                        <motion.div
                            key={num}
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-[#080808]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 group-hover:opacity-40 transition-opacity" />
                            <motion.img
                                src={`/images/6ai${num}.png`}
                                alt={`AI Interface ${num}`}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105"
                            />
                            {/* Number Overlay */}
                            <div className="absolute bottom-6 left-6 text-6xl font-black text-white/5 pointer-events-none">
                                0{num}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* 2. Complex Motion Bento Grid for Terms */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {terms.map((term, i) => (
                        <motion.div
                            key={term}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.5, type: "spring" }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            className={`
                            relative group p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center
                            ${[0, 5, 6, 11].includes(i) ? 'md:col-span-2' : 'col-span-1'}
                            ${[2, 9].includes(i) ? 'md:row-span-2' : 'row-span-1'}
                        `}
                        >
                            <span className="text-white/60 font-mono text-sm tracking-wider uppercase group-hover:text-white transition-colors">
                                {term}
                            </span>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default VibeStackSection;
