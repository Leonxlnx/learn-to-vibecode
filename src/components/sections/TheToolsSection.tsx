import { motion } from 'framer-motion';

/**
 * The Tools Section
 * - 3 Horizontal Images (no hover text)
 * - Tool names listed cleanly below each image
 */
const TheToolsSection = () => {

    const rows = [
        {
            img: "/images/6ai1.png",
            tools: ["Qwen", "ChatGPT", "Claude", "Grok", "Deepseek", "Z.ai"]
        },
        {
            img: "/images/6ai2.png",
            tools: ["Gemini", "Kimi", "Minimax", "Cursor", "VSCode", "Windsurf"]
        },
        {
            img: "/images/6ai3.png",
            tools: ["Base44", "Bolt.new", "Lovable", "Antigravity", "v0", "Copilot"]
        }
    ];

    return (
        <section className="relative w-full py-32 bg-[#030303] overflow-hidden">

            {/* Header */}
            <div className="text-center mb-20 px-6 relative z-10">
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase">
                    The Tools
                </h2>
            </div>

            {/* Images + Tool Names */}
            <div className="w-full max-w-[1400px] mx-auto px-6 space-y-16">
                {rows.map((row, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.7 }}
                        className="space-y-6"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-[5/1] rounded-2xl overflow-hidden border border-white/10 bg-[#080808]">
                            <img
                                src={row.img}
                                alt={`AI Tools Interface ${i + 1}`}
                                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>

                        {/* Tool Names - Clean List */}
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                            {row.tools.map((tool, j) => (
                                <span
                                    key={j}
                                    className="text-white/60 hover:text-white text-lg md:text-xl font-medium tracking-tight transition-colors"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default TheToolsSection;
