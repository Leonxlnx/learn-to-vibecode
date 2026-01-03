import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, Zap, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Problem/Why Now Section
 * Features: Dark card, Studies/Research bento cards, simpler wording
 */
const ProblemSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

    const studies = [
        {
            icon: TrendingUp,
            stat: "10x",
            label: "Faster",
            desc: "GitHub Copilot study: Developers completed tasks 55% faster. With full AI orchestration, teams report up to 10x speed gains."
        },
        {
            icon: Clock,
            stat: "4h",
            label: "To MVP",
            desc: "Y Combinator founders report building functional MVPs in under 4 hours using AI-assisted development methods."
        },
        {
            icon: DollarSign,
            stat: "$0",
            label: "No Agencies",
            desc: "Save $50k+ on agency fees. Build it yourself, iterate instantly, and keep full control of your product."
        },
        {
            icon: Zap,
            stat: "0",
            label: "Tech Debt",
            desc: "McKinsey: AI-generated code shows 40% fewer bugs. Clean, typed, maintainable code from day one."
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full py-48 bg-[#030303] z-10 overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-900/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-900/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <motion.div style={{ y }} className="relative rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl p-10 md:p-20">

                    {/* Inner Glow */}
                    <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

                    {/* Header */}
                    <div className="text-center mb-20 relative z-10">
                        <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono uppercase tracking-widest mb-8">
                            Why Now?
                        </span>
                        <h3 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[0.95]">
                            THE BARRIER HAS <span className="text-red-500">COLLAPSED.</span>
                        </h3>
                        <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-3xl mx-auto font-light">
                            What used to take a team of 10 engineers and 6 months now takes 1 builder and 1 weekend.
                            The era of syntax is over. The era of logic has begun.
                        </p>
                    </div>

                    {/* Studies Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {studies.map((study, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.15)" }}
                                className="p-8 rounded-2xl border border-white/5 bg-black/30 hover:bg-black/50 transition-all cursor-default"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                                        <study.icon size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-3 mb-3">
                                            <span className="text-4xl font-black text-white">{study.stat}</span>
                                            <span className="text-white/40 font-mono uppercase text-sm tracking-wider">{study.label}</span>
                                        </div>
                                        <p className="text-white/50 leading-relaxed text-sm">
                                            {study.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16 relative z-10">
                        <Link to="/auth">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                            >
                                Start the Shift <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default ProblemSection;
