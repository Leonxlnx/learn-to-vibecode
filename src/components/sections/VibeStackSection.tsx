import { AI_TOOLS } from '@/lib/constants';

const VibeStackSection = () => {
    // Double items for infinite scroll
    const tools = [...AI_TOOLS, ...AI_TOOLS, ...AI_TOOLS, ...AI_TOOLS];

    return (
        <section className="w-full py-20 bg-[#050505] overflow-hidden border-y border-white/5">
            <div className="flex animate-marquee-slow">
                {tools.map((tool, i) => (
                    <div key={i} className="flex-shrink-0 mx-8">
                        <span className="text-4xl md:text-6xl font-black text-white/5 uppercase font-display hover:text-red-600/20 transition-colors duration-300 cursor-default">
                            {tool}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VibeStackSection;
