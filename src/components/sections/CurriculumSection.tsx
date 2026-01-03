import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Maximize2, Laptop, Palette, Database, Rocket } from 'lucide-react';

const ModuleItem = ({ number, title, content, icon: Icon, isOpen, onClick }: any) => (
    <motion.div
        layout
        onClick={onClick}
        className={`group border border-white/5 rounded-2xl p-1 cursor-pointer transition-all duration-500 ${isOpen ? 'bg-white/5 border-white/10' : 'hover:bg-white/[0.02]'}`}
    >
        <div className={`relative rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center transition-all duration-500 ${isOpen ? 'bg-[#0a0a0a]' : ''}`}>

            {/* Number & Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-500 ${isOpen ? 'bg-red-500 text-white scale-110 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white'}`}>
                {isOpen ? <Icon size={28} /> : number}
            </div>

            {/* Content Header */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                        {title}
                    </h3>
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        className={`text-white/20 group-hover:text-white transition-colors`}
                    >
                        <ChevronRight size={24} />
                    </motion.div>
                </div>
                {!isOpen && <p className="text-white/40 line-clamp-1">{content}</p>}
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full md:w-full overflow-hidden"
                    >
                        <div className="pt-6 border-t border-white/10 mt-6">
                            <p className="text-lg text-white/70 leading-relaxed mb-8">
                                {content}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono uppercase text-white/40 tracking-wider">
                                    Theory
                                </span>
                                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono uppercase text-white/40 tracking-wider">
                                    Practical Config
                                </span>
                                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono uppercase text-white/40 tracking-wider">
                                    Project
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    </motion.div>
);

const CurriculumSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            content: "Connect your app to real data. Learn Supabase for database integration, auth, and logic - plain English required only."
        },
        {
            num: "05",
            title: "Deployment",
            icon: Rocket,
            content: "Go from localhost to live URL. Deploy your application to Vercel/Netlify and share it with the world."
        }
    ];

    return (
        <section className="relative w-full py-32 px-6 bg-[#030303]">
            <div className="max-w-5xl mx-auto mb-20 text-center">
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8">
                    CURRICULUM
                </h2>
                <p className="text-xl text-white/50 max-w-2xl mx-auto">
                    A structured path from zero to shipping production-grade software using AI.
                </p>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                {modules.map((m, i) => (
                    <ModuleItem
                        key={i}
                        {...m}
                        isOpen={openIndex === i}
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                ))}
            </div>
        </section>
    );
};

export default CurriculumSection;
