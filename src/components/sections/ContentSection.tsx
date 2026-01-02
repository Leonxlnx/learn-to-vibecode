import { motion } from 'framer-motion';
import { SHOWCASE_IMAGES, AI_TOOLS } from '@/lib/constants';

// --- BENTO ITEM COMPONENT ---
interface BentoItemProps {
    children: React.ReactNode;
    index: number;
    span?: number;
    variant?: 'default' | 'dark' | 'glass';
}

const BentoItem = ({
    children,
    index,
    span = 1,
    variant = 'default'
}: BentoItemProps) => {
    // Variant styles
    const bgClass = variant === 'dark'
        ? 'bg-[#0a0a0a] hover:bg-[#111]'
        : variant === 'glass'
            ? 'bg-white/5 hover:bg-white/10 backdrop-blur-md'
            : 'bg-[#111] hover:bg-[#161616]';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            className={`
        relative overflow-hidden
        h-24 rounded-xl border border-white/5
        flex flex-col justify-between p-4
        group cursor-default transition-colors duration-300
        ${span === 2 ? 'md:col-span-2' : 'col-span-1'}
        ${bgClass}
      `}
        >
            {/* Top Tech Detail */}
            <div className="flex justify-between items-start opacity-30 text-[10px] font-mono">
                <span>0{index + 1}</span>
                <div className="w-1 h-1 bg-white rounded-full" />
            </div>

            {/* Main Text */}
            <span className="text-gray-400 font-mono text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300 z-10">
                {children}
            </span>

            {/* Tech Decoration Lines */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

/**
 * Content section with showcase images and bento grid of AI tools
 */
const ContentSection = () => {
    return (
        <section className="relative w-full bg-[#080808] py-40 px-4 md:px-12 overflow-hidden">

            <div className="max-w-[1400px] mx-auto flex flex-col gap-40">

                {/* --- BLOCK 1: FULL WIDTH + SCATTERED BENTO --- */}
                <div className="relative w-full flex flex-col gap-8">
                    {/* 5:1 Image - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full aspect-[5/1] rounded-[1.5rem] overflow-hidden relative shadow-2xl border border-white/10 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                        <img
                            src={SHOWCASE_IMAGES.left}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"
                            alt="Foundation"
                        />
                    </motion.div>

                    {/* Cyber Bento Grid - Irregular */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                        {AI_TOOLS.slice(0, 7).map((tool, i) => (
                            <BentoItem key={i} index={i} span={i === 0 || i === 4 ? 2 : 1}>
                                {tool}
                            </BentoItem>
                        ))}
                    </div>
                </div>

                {/* --- BLOCK 2: RIGHT ALIGNED (75%) + COMPACT LEFT BENTO --- */}
                <div className="relative w-full flex flex-col items-end gap-8">
                    {/* 5:1 Image - 75% Width */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-[75%] aspect-[5/1] rounded-[1.5rem] overflow-hidden relative shadow-2xl border border-white/10 group"
                    >
                        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10" />
                        <img
                            src={SHOWCASE_IMAGES.center}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"
                            alt="Motion"
                        />
                    </motion.div>

                    {/* Bento Grid - Aligned Left of the container */}
                    <div className="w-full md:w-[75%] grid grid-cols-2 md:grid-cols-4 gap-3">
                        {AI_TOOLS.slice(7, 14).map((tool, i) => (
                            <BentoItem key={i} index={i} variant="dark">
                                {tool}
                            </BentoItem>
                        ))}
                    </div>
                </div>

                {/* --- BLOCK 3: CENTERED (90%) + TECHNICAL ROW --- */}
                <div className="relative w-full flex flex-col items-center gap-8">
                    {/* 5:1 Image - 90% Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-[90%] aspect-[5/1] rounded-[1.5rem] overflow-hidden relative shadow-2xl border border-white/10 group"
                    >
                        <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay z-10" />
                        <img
                            src={SHOWCASE_IMAGES.right}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"
                            alt="WebGL"
                        />
                    </motion.div>

                    {/* Bento Grid - 7 cols centered */}
                    <div className="w-full md:w-[90%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                        {AI_TOOLS.slice(14).map((tool, i) => (
                            <BentoItem key={i} index={i} span={i === 3 ? 2 : 1} variant="glass">
                                {tool}
                            </BentoItem>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContentSection;
