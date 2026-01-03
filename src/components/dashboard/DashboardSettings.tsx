import { User, Mail, Zap, Calendar } from 'lucide-react';

interface DashboardSettingsProps {
    profile: {
        name: string;
        email: string;
        learningPath: string;
        createdAt: string;
    };
}

const pathLabels: Record<string, { label: string; color: string; desc: string }> = {
    speedrunner: { label: 'Speedrunner', color: 'text-orange-400', desc: 'Skip basics, straight to building' },
    builder: { label: 'Builder', color: 'text-blue-400', desc: 'Balanced approach with projects' },
    developer: { label: 'Developer', color: 'text-cyan-400', desc: 'Fast-track for experienced devs' },
    beginner: { label: 'Beginner', color: 'text-green-400', desc: 'Full curriculum from scratch' },
    expert: { label: 'Expert', color: 'text-purple-400', desc: 'Advanced techniques only' },
};

const DashboardSettings = ({ profile }: DashboardSettingsProps) => {
    const pathInfo = pathLabels[profile.learningPath] || pathLabels.beginner;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Settings</h1>
                <p className="text-white/40">Your profile and preferences</p>
            </div>

            {/* Profile Card */}
            <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-6">
                <h2 className="text-lg font-medium text-white">Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <User size={18} className="text-white/40" />
                        </div>
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Name</p>
                            <p className="text-white font-medium">{profile.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Mail size={18} className="text-white/40" />
                        </div>
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                            <p className="text-white font-medium">{profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Path */}
            <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-6">
                <h2 className="text-lg font-medium text-white">Learning Path</h2>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <Zap size={18} className="text-red-500" />
                    </div>
                    <div>
                        <p className={`font-medium ${pathInfo.color}`}>{pathInfo.label}</p>
                        <p className="text-white/40 text-sm">{pathInfo.desc}</p>
                    </div>
                </div>
            </div>

            {/* Member Since */}
            <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Calendar size={18} className="text-white/40" />
                    </div>
                    <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Member since</p>
                        <p className="text-white font-medium">{profile.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSettings;
