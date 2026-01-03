import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Maximize2, Laptop, Palette, Database, Rocket } from 'lucide-react';

const modules = [
    {
        num: "01",
        title: "The Vibe Mindset",
        icon: Maximize2,
        content: "Stop thinking like a coder. Start thinking like an architect. Learn how to prompt effectively and guide the AI to build exactly what you visualize."
    },
    {
        num: "02",
        title: "Environment Setup",
        icon: Laptop,
        content: "Master the stack: Cursor, v0, Supabase, and bolt.new. We setup your professional development environment in 15 minutes."
    },
    {
        num: "03",
        title: "Building the Frontend",
        icon: Palette,
        content: "Create stunning, responsive UIs without writing CSS. Use v0 to generate components and Cursor to refine them."
    },
    {
        num: "04",
        title: "Data & Backend",
        icon: Database,
        content: "Connect your app to real data. Learn Supabase for database integration, auth, and logic."
    },
    {
        num: "05",
        title: "Deployment",
        icon: Rocket,
        content: "Go from localhost to live URL. Deploy your application to Vercel/Netlify and share it with the world."
    }
];

const CurriculumSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative w-full py-32 px-6 bg-[#030303]">
            <div className="max-w-5xl mx-auto mb-20 text-center">
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
                    CURRICULUM
                </h2>
                <p className="text-lg text-white/50 max-w-2xl mx-auto">
                    A structured path from zero to shipping production-grade software.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
                {modules.map((m, i) => {
                    const isOpen = openIndex === i;
                    const Icon = m.icon;

                    return (
                        <motion.div
                            key={i}
                            initial={false}
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-white/[0.03] border-white/10' : 'bg-transparent border-white/5 hover:border-white/10'}`}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-6 p-6">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${isOpen ? 'bg-red-500 text-white' : 'bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white'}`}>
                                    {isOpen ? <Icon size={24} /> : m.num}
                                </div>

                                <h3 className={`flex-1 text-xl md:text-2xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                    {m.title}
                                </h3>

                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-white/30"
                                >
                                    <ChevronDown size={24} />
                                </motion.div>
                            </div>

                            {/* Content */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2">
                                            <div className="pl-20">
                                                <p className="text-white/50 leading-relaxed">
                                                    {m.content}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default CurriculumSection;
