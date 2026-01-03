import { motion } from 'framer-motion';
import { Rocket, Code2, Palette, ArrowUpRight } from 'lucide-react';

const AudienceCard = ({ icon, title, tagline, description, index }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="relative h-full bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-red-500/30 hover:bg-[#0f0f0f] transition-all duration-500 flex flex-col items-start">

                <div className="mb-6 p-4 rounded-xl bg-white/5 group-hover:bg-red-500/10 transition-colors duration-500">
                    {icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm font-mono text-red-500 mb-6 uppercase tracking-wider opacity-80">{tagline}</p>

                <p className="text-white/50 leading-relaxed text-sm mb-8 flex-grow">
                    {description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
                    <span>Read more</span>
                    <ArrowUpRight className="w-3 h-3" />
                </div>

            </div>
        </motion.div>
    );
};

const TargetAudienceSection = () => {
    const audiences = [
        {
            icon: <Rocket className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" />,
            title: "Entrepreneurs",
            tagline: "Idea to App in 48h",
            description: "Stop funding agencies. Build your own MVP this weekend and iterate instantly based on feedback.",
        },
        {
            icon: <Code2 className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" />,
            title: "Junior Devs",
            tagline: "Skip Junior Hell",
            description: "Don't just write functions. Architect systems. Become the 10x developer that everyone wants to hire.",
        },
        {
            icon: <Palette className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" />,
            title: "Designers & PMs",
            tagline: "Make it Real",
            description: "Stop handing off Figma files. Build the actual product and show them exactly how it should work.",
        },
    ];

    return (
        <section className="w-full py-32 px-6 bg-[#050505] flex justify-center">
            <div className="max-w-7xl w-full">

                <div className="text-center mb-20">
                    <span className="text-white/30 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Target Audience</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Made for <span className="border-b-2 border-red-500 text-white">Builders</span>.
                    </h2>
                </div>

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
