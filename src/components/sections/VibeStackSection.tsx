import { motion } from 'framer-motion';

const VibeStackSection = () => {
    return (
        <section className="relative w-full py-32 bg-[#050505] overflow-hidden flex flex-col gap-12">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />

            <div className="relative z-10 text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black text-white px-4">
                    THE <span className="text-red-500 italic">ARSENAL</span>
                </h2>
            </div>

            {/* Row 1 - Direct Images */}
            <div className="relative w-full overflow-hidden rotate-[-1deg] hover:rotate-0 transition-transform duration-700">
                <div className="flex animate-marquee-slow w-max">
                    {[1, 2, 3, 4].map((i) => (
                        <img
                            key={i}
                            src="/images/6ai1.png"
                            alt="AI Tools Strip 1"
                            className="h-24 md:h-32 w-auto object-contain mx-4 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        />
                    ))}
                </div>
            </div>

            {/* Row 2 - Reverse */}
            <div className="relative w-full overflow-hidden rotate-[1deg] hover:rotate-0 transition-transform duration-700">
                <div className="flex animate-marquee-slow-reverse w-max">
                    {[1, 2, 3, 4].map((i) => (
                        <img
                            key={i}
                            src="/images/6ai2.png"
                            alt="AI Tools Strip 2"
                            className="h-24 md:h-32 w-auto object-contain mx-4 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        />
                    ))}
                </div>
            </div>

            {/* Row 3 - Direct */}
            <div className="relative w-full overflow-hidden rotate-[-1deg] hover:rotate-0 transition-transform duration-700">
                <div className="flex animate-marquee-slow w-max">
                    {[1, 2, 3, 4].map((i) => (
                        <img
                            key={i}
                            src="/images/6ai3.png"
                            alt="AI Tools Strip 3"
                            className="h-24 md:h-32 w-auto object-contain mx-4 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default VibeStackSection;
