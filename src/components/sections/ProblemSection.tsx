import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Problem/Why Now Section
 * Updated: Darker styling, stats, motion, less white.
 */
const ProblemSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative w-full py-48 bg-[#030303] z-10 overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-900/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <motion.div style={{ y }} className="relative rounded-[3rem] bg-[#080808] border border-white/10 overflow-hidden shadow-2xl p-12 md:p-24">

                    {/* Inner Glow */}
                    <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-red-600/10 blur-[100px] rounded-full pointing-events-none" />

                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Content */}
                        <div>
                            <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono uppercase tracking-widest mb-8">
                                Why Now?
                            </span>
                            <h3 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95]">
                                THE BARRIER <br />
                                HAS <span className="text-red-500">COLLAPSED</span>.
                            </h3>
                            <p className="text-xl text-white/50 leading-relaxed mb-12 font-light">
                                What used to take a team of 10 engineers and 6 months now takes 1 vibecoder and 1 weekend. The era of syntax is over. The era of logic has begun.
                            </p>

                            <Link to="/auth">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                                >
                                    Start the Shift <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>

                        {/* Right Stats - More Motion */}
                        <div className="space-y-6">
                            {[
                                { icon: TrendingUp, val: "10x", label: "Development Velocity", desc: "Build at the speed of thought." },
                                { icon: Clock, val: "4h", label: "Time to MVP", desc: "From idea to deployed URL." },
                                { icon: Zap, val: "0", label: "Tech Debt", desc: "Clean, typed, modern code." }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                                    className="flex items-center gap-8 p-6 rounded-2xl border border-white/5 bg-black/20 hover:border-white/10 transition-all cursor-default"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-red-500 flex-shrink-0">
                                        <stat.icon size={32} />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-white mb-1">{stat.val}</div>
                                        <div className="text-white/40 font-mono uppercase text-xs tracking-wider">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default ProblemSection;
