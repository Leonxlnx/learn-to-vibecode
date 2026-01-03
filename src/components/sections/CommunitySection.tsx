import { motion } from 'framer-motion';

const statements = [
    {
        text: "Coding is now 90% logic, 10% syntax. I focus on the architecture, AI handles the typing.",
        author: "SENIOR DEV"
    },
    {
        text: "I built my entire SaaS backend in a weekend. Supabase + Cursor is a cheat code.",
        author: "FOUNDER"
    },
    {
        text: "Finally, I can build what I imagine without getting stuck on CSS grids for 4 hours.",
        author: "DESIGNER"
    },
    {
        text: "It's not about replacing developers. It's about becoming a 10x developer.",
        author: "LEAD ENG"
    },
    {
        text: "Vibecoding turned my ideas into deployed products. No more localhost graveyards.",
        author: "MAKER"
    }
];

const CommunitySection = () => {
    return (
        <section className="w-full py-40 px-6 bg-[#0a0a0a] relative overflow-hidden">
            {/* Aurora glow */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
                        COMMUNITY
                    </h2>
                </motion.div>

                {/* Bento Grid - Fixed animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Featured Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 bg-gradient-to-br from-[#0f0f0f] to-[#080808] p-10 rounded-3xl border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[280px]"
                        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", backgroundBlendMode: 'overlay' }}
                    >
                        <p className="text-2xl md:text-3xl font-medium text-white/90 leading-relaxed">
                            "{statements[0].text}"
                        </p>
                        <div className="flex items-center gap-4 mt-8">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="font-mono text-sm uppercase tracking-widest text-white/40">
                                {statements[0].author}
                            </span>
                        </div>
                    </motion.div>

                    {/* Regular Cards - using CSS transition instead of motion hover */}
                    {statements.slice(1).map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                            className="bg-[#080808] p-8 rounded-2xl border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[200px]"
                            style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", backgroundBlendMode: 'overlay', backgroundSize: '200px' }}
                        >
                            <p className="text-lg font-medium text-white/70 leading-relaxed">
                                "{s.text}"
                            </p>
                            <div className="flex items-center gap-3 mt-6">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="font-mono text-xs uppercase tracking-widest text-white/30">
                                    {s.author}
                                </span>
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default CommunitySection;
