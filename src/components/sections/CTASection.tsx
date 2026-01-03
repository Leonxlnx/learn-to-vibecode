import { ArrowRight } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="relative w-full py-40 px-6 bg-[#050505] overflow-hidden flex flex-col items-center justify-center text-center">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-4xl">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                    Start your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Vibe Journey.</span>
                </h2>

                <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto">
                    Join the waiting list today and get early access to the course and community.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                        Join Waitlist <ArrowRight size={18} />
                    </button>
                </div>
            </div>

        </section>
    );
};

export default CTASection;
