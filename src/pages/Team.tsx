import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

const team = [
    {
        name: "Leon Lin",
        role: "Co-Founder & Lead Developer",
        location: "Germany",
        bio: "Full-stack developer and AI enthusiast. Obsessed with building tools that make software creation accessible to everyone. Believes vibecoding is the future of development."
    },
    {
        name: "Ulrik Berntzen",
        role: "Co-Founder & Creative Director",
        location: "Norway",
        bio: "Designer and strategist with a passion for beautiful, functional products. Focused on creating learning experiences that actually stick. Making education feel premium."
    }
];

/**
 * Team Page
 */
const Team = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <CardNav items={[]} logoAlt="Learn2Vibecode" />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">

                    <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12">
                        <ArrowLeft size={16} /> Back
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                            THE <span className="text-red-500">TEAM</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl">
                            Two builders on a mission to democratize software creation.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center mb-6">
                                    <Sparkles className="text-red-500" size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                <p className="text-red-500 text-sm font-mono uppercase tracking-wider mb-2">{member.role}</p>
                                <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                                    <MapPin size={14} />
                                    {member.location}
                                </div>
                                <p className="text-white/50 leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Team;
