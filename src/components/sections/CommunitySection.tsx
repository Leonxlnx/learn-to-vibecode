import { motion } from 'framer-motion';

const statements = [
    {
        text: "Coding is now 90% logic, 10% syntax. I focus on the architecture, AI handles the typing.",
        author: "SENIOR DEV"
    },
    {
        text: "I built my entire SaaS backend in a weekend. Supersbase + Cursor is a cheat code.",
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
    },
    {
        text: "The barrier to entry is gone. If you can think logically, you can build software.",
        author: "STUDENT"
    }
];

const CommunitySection = () => {
    return (
        <section className="w-full py-40 px-6 bg-[#030303] relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="mb-24 flex flex-col items-center text-center">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-red-500 mb-6 border px-4 py-1 rounded-full border-red-500/20 bg-red-500/5">
                        New Paradigm
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
                        THE VIBE
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statements.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-[#080808] p-10 rounded-3xl border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between h-[300px]"
                        >
                            <p className="text-2xl font-medium text-white/80 leading-relaxed">
                                "{s.text}"
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="font-mono text-sm uppercase tracking-widest text-white/40">
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
