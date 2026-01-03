import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const ModuleItem = ({ number, title, content, isOpen, onClick }: any) => (
    <div className="border-b border-white/5 last:border-none">
        <button
            onClick={onClick}
            className="w-full py-8 flex items-center justify-between text-left group"
        >
            <div className="flex items-center gap-6">
                <span className={`font-mono text-sm ${isOpen ? 'text-red-500' : 'text-white/30 group-hover:text-white'} transition-colors duration-300`}>
                    {number}
                </span>
                <span className={`text-xl md:text-2xl font-medium ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'} transition-colors duration-300`}>
                    {title}
                </span>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-red-500 bg-red-500 text-white' : 'border-white/10 text-white/40'}`}>
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="pb-8 pl-12 md:pl-16 pr-4">
                        <p className="text-white/50 leading-relaxed max-w-2xl">{content}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const CurriculumSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const modules = [
        {
            num: "01",
            title: "The Vibe Mindset",
            content: "Stop thinking like a coder. Start thinking like an architect. Learn how to prompt effectively and guide the AI to build exactly what you visualize."
        },
        {
            num: "02",
            title: "Environment Setup",
            content: "Master the stack: Cursor, v0, Supabase, and bolt.new. We setup your professional development environment in 15 minutes."
        },
        {
            num: "03",
            title: "Building the Frontend",
            content: "Create stunning, responsive UIs without writing CSS. Use v0 to generate components and Cursor to refine them."
        },
        {
            num: "04",
            title: "Data & Backend",
            content: "Connect your app to real data. Learn Supabase for database integration, auth, and logic - plain English required only."
        },
        {
            num: "05",
            title: "Deployment",
            content: "Go form localhost to live URL. Deploy your application to Vercel/Netlify and share it with the world."
        }
    ];

    return (
        <section className="w-full py-32 px-6 bg-[#050505] flex justify-center">
            <div className="max-w-4xl w-full">

                <div className="text-center mb-20">
                    <span className="text-white/30 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Curriculum</span>
                    <h2 className="text-4xl font-bold text-white">What you will learn.</h2>
                </div>

                <div className="w-full">
                    {modules.map((m, i) => (
                        <ModuleItem
                            key={i}
                            number={m.num}
                            title={m.title}
                            content={m.content}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CurriculumSection;
