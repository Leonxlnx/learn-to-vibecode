import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * The Tools Section (formerly VibeStack)
 * Features: 3 Horizontal 1:5 Images + Bento Grid of Tools
 */
const TheToolsSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const tools = [
        { name: "Cursor", cols: 2, rows: 2, color: "bg-blue-500/10 text-blue-400" },
        { name: "v0", cols: 1, rows: 1, color: "bg-white/5 text-white" },
        { name: "Supabase", cols: 1, rows: 1, color: "bg-emerald-500/10 text-emerald-400" },
        { name: "React", cols: 1, rows: 1, color: "bg-cyan-500/10 text-cyan-400" },
        { name: "Vite", cols: 1, rows: 1, color: "bg-purple-500/10 text-purple-400" },
        { name: "Claude", cols: 2, rows: 1, color: "bg-orange-500/10 text-orange-400" },
        { name: "OpenAI", cols: 1, rows: 1, color: "bg-green-500/10 text-green-400" },
        { name: "Bolt.new", cols: 1, rows: 2, color: "bg-white/10 text-white" },
        { name: "Lovable", cols: 2, rows: 1, color: "bg-pink-500/10 text-pink-400" },
        { name: "Framer", cols: 1, rows: 1, color: "bg-black/40 text-white" },
    ];

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-[#030303] overflow-hidden">

            {/* Header */}
            <div className="text-center mb-24 px-6 relative z-10">
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase">
                    The Tools
                </h2>
            </div>

            {/* 1. Horizontal 1:5 Images Showcase */}
            <div className="w-full max-w-[1600px] mx-auto mb-32 px-4 space-y-8">
                {[1, 2, 3].map((num, i) => (
                    <motion.div
                        key={num}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="relative w-full h-[20vw] md:h-[200px] rounded-[2rem] overflow-hidden border border-white/10 group bg-[#080808]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />
                        <img
                            src={`/images/6ai${num}.png`}
                            alt={`Tool Interface ${num}`}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        {/* Overlay Text */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="px-6 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white font-mono uppercase tracking-widest text-sm">
                                Interface 0{num}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>


            {/* 2. Responsive Bento Grid of Tools */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[100px]">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className={`
                            relative group p-6 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden
                            ${tool.cols === 2 ? 'col-span-2' : 'col-span-1'}
                            ${tool.rows === 2 ? 'row-span-2' : 'row-span-1'}
                            ${tool.color}
                        `}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <span className="relative z-10 font-bold text-lg md:text-xl tracking-tight group-hover:scale-110 transition-transform">
                                {tool.name}
                            </span>
                        </motion.div>
                    ))}

                    {/* Filler 'More' Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-2 row-span-1 relative group p-6 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden bg-white/5 text-white/40 hover:text-white transition-colors"
                    >
                        <span className="font-mono text-sm uppercase tracking-widest">+ Many More</span>
                    </motion.div>

                </div>
            </div>

        </section>
    );
};

export default TheToolsSection;
