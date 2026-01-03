import { motion } from 'framer-motion';
import { Rocket, Code2, Palette, ArrowUpRight } from 'lucide-react';

interface AudienceCardProps {
    icon: React.ReactNode;
    title: string;
    tagline: string;
    description: string;
    index: number;
    gradient: string;
}

const AudienceCard = ({ icon, title, tagline, description, index, gradient }: AudienceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
        >
            {/* Glow effect */}
            <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

            {/* Card */}
            <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:translate-y-[-4px]">

                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    {icon}
                </div>

                {/* Title */}
                <h3 className="relative text-2xl font-bold text-white mb-3 tracking-tight">
                    {title}
                </h3>

                {/* Tagline */}
                <p className={`relative text-lg font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4`}>
                    {tagline}
                </p>

                {/* Description */}
                <p className="relative text-white/50 leading-relaxed mb-6">
                    {description}
                </p>

                {/* Link */}
                <div className="relative flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
};

/**
 * Target Audience Section - Who is this for?
 * Features 3 premium glass cards for different audiences
 */
const TargetAudienceSection = () => {
    const audiences = [
        {
            icon: <Rocket className="w-7 h-7 text-white" />,
            title: "Entrepreneurs",
            tagline: "Idea to App in 48h.",
            description: "No more waiting for tech co-founders. No more burning cash on agencies. Build your MVP yourself and iterate at the speed of thought.",
            gradient: "from-orange-500 to-rose-500",
        },
        {
            icon: <Code2 className="w-7 h-7 text-white" />,
            title: "Junior Devs",
            tagline: "Skip the Junior Hell.",
            description: "Stop grinding tutorials for years. Learn to architect systems, not just write code. Become the developer who ships, not the one who studies.",
            gradient: "from-purple-500 to-indigo-500",
        },
        {
            icon: <Palette className="w-7 h-7 text-white" />,
            title: "PMs & Designers",
            tagline: "Build Your Prototypes.",
            description: "Stop handing off Figma files and hoping for the best. Make it real. Ship it yourself. Then show the devs how it's done.",
            gradient: "from-emerald-500 to-cyan-500",
        },
    ];

    return (
        <section className="relative w-full py-32 px-4 md:px-12 bg-[#050505] overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 mb-6 text-xs font-mono uppercase tracking-[0.3em] text-white/40 border border-white/10 rounded-full">
                        Who is this for?
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        Made for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">builders</span>
                    </h2>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto">
                        Whether you're starting fresh or leveling up, vibe coding meets you where you are.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {audiences.map((audience, index) => (
                        <AudienceCard key={index} {...audience} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TargetAudienceSection;
