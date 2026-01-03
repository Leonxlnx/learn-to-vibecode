import { motion } from 'framer-motion';

const TestimonialCard = ({ quote, author, role, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl mb-6 break-inside-avoid hover:border-white/10 transition-colors"
    >
        <p className="text-white/80 text-lg leading-relaxed mb-6">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                {author.charAt(0)}
            </div>
            <div>
                <p className="text-white font-bold text-sm">{author}</p>
                <p className="text-white/40 text-xs">{role}</p>
            </div>
        </div>
    </motion.div>
);

const CommunitySection = () => {
    const testimonials = [
        {
            quote: "I laid off my agency and built it myself in a weekend. Saved $20k instantly.",
            author: "Sarah J.",
            role: "Founder, E-com Brand"
        },
        {
            quote: "I thought I was too old to learn coding. With Vibe Coding, I shipped my first SaaS at 45.",
            author: "Michael R.",
            role: "Ex-Sales"
        },
        {
            quote: "This is not just coding. This is architectural creativity unleashed.",
            author: "Davide",
            role: "Product Designer"
        },
        {
            quote: "Finally I understand SQL because the AI explains it while writing it. It's like having a senior engineer next to me.",
            author: "Jessica",
            role: "Marketing Lead"
        },
        {
            quote: "Vibe Coding is basically cheating, but legal. I built a CRM in 4 hours.",
            author: "Tom H.",
            role: "Freelancer"
        },
        {
            quote: "The clear explanation of the stack changed everything for me. Cursor is a superpower.",
            author: "Alex",
            role: "Student"
        }
    ];

    return (
        <section className="w-full py-32 px-6 bg-[#050505] flex justify-center">
            <div className="max-w-6xl w-full">

                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold text-white mb-4">The Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Vibes</span></h2>
                    <p className="text-white/40">Real results from the community.</p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} {...t} delay={i * 0.1} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CommunitySection;
