import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Zap, Layout, Code2, GraduationCap, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TargetCard = ({ title, subtitle, desc, icon: Icon, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-white">
                <Icon size={24} strokeWidth={1.5} />
            </div>

            <span className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2 block">
                {subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {title}
            </h3>
            <p className="text-white/50 leading-relaxed font-light">
                {desc}
            </p>
        </div>
    </motion.div>
);

const WhatIsVibecodingSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section className="relative w-full py-40 bg-[#030303] overflow-hidden" ref={containerRef}>

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* What is Vibecoding Explanation */}
                <motion.div
                    style={{ y }}
                    className="text-center mb-32"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                        WHAT IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">VIBECODING?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                        Vibecoding is the art of building software by orchestrating AI.
                        Instead of writing every line, you <span className="text-white font-medium">think in logic</span>,
                        describe what you need, and let AI handle the syntax.
                        It's faster, cleaner, and way more fun.
                    </p>
                    <p className="text-lg text-white/40 max-w-3xl mx-auto">
                        No more getting stuck on semicolons or CSS grids. Focus on what matters: the product.
                    </p>
                </motion.div>


                {/* Made for Builders Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        MADE FOR <span className="text-red-500">BUILDERS.</span>
                    </h3>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TargetCard
                        title="Entrepreneurs"
                        subtitle="Idea to App in 48h"
                        desc="Stop funding agencies. Build your own MVP this weekend and iterate instantly based on feedback."
                        icon={Sparkles}
                        delay={0.1}
                    />
                    <TargetCard
                        title="Junior Devs"
                        subtitle="Skip Junior Hell"
                        desc="Don't just write functions. Architect systems. Become the developer that everyone wants to hire."
                        icon={Code2}
                        delay={0.15}
                    />
                    <TargetCard
                        title="Designers & PMs"
                        subtitle="Make it Real"
                        desc="Stop handing off Figma files. Build the actual product and show them exactly how it should work."
                        icon={Layout}
                        delay={0.2}
                    />
                    <TargetCard
                        title="Teachers"
                        subtitle="Teach the Future"
                        desc="Prepare your students for the real world. Show them how modern software is actually built."
                        icon={GraduationCap}
                        delay={0.25}
                    />
                    <TargetCard
                        title="Learners"
                        subtitle="Start from Zero"
                        desc="No coding background? No problem. If you can think logically, you can build software."
                        icon={Lightbulb}
                        delay={0.3}
                    />
                    <TargetCard
                        title="Creators"
                        subtitle="Ship Your Ideas"
                        desc="Turn your creative vision into real products. No more waiting for developers."
                        icon={Zap}
                        delay={0.35}
                    />
                </div>

            </div>
        </section>
    );
};

export default WhatIsVibecodingSection;
