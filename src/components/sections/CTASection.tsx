import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="relative w-full py-40 bg-[#000] overflow-hidden flex flex-col items-center justify-center text-center border-t border-white/5">

            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-red-900/10 blur-[150px] rounded-[100%]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <div className="relative z-10 max-w-5xl px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                        <Sparkles size={14} className="text-red-500" />
                        <span className="text-xs font-mono uppercase tracking-widest text-white/60">Limited Alpha Access</span>
                    </div>

                    <h2 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        START YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">VIBE JOURNEY.</span>
                    </h2>

                    <p className="text-white/40 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-light">
                        Stop watching from the sidelines. <br />
                        <span className="text-white">Build the future today.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg mx-auto">
                        <button className="group relative w-full px-8 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Join the Waitlist <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-red-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                            <span className="absolute inset-0 z-20 flex items-center justify-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                Join the Waitlist <ArrowRight className="translate-x-1" />
                            </span>
                        </button>

                        <span className="text-white/30 text-sm">or press <span className="border border-white/20 px-1 rounded mx-1">J</span> to join</span>
                    </div>
                </motion.div>

            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
};

export default CTASection;
