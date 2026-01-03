import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Zap } from 'lucide-react';

interface DashboardHomeProps {
    userName: string;
    learningPath: string;
}

const pathLabels: Record<string, { label: string; color: string }> = {
    speedrunner: { label: 'Speedrunner', color: 'text-orange-400' },
    builder: { label: 'Builder', color: 'text-blue-400' },
    developer: { label: 'Developer', color: 'text-cyan-400' },
    beginner: { label: 'Beginner', color: 'text-green-400' },
    expert: { label: 'Expert', color: 'text-purple-400' },
};

const DashboardHome = ({ userName, learningPath }: DashboardHomeProps) => {
    const pathInfo = pathLabels[learningPath] || pathLabels.beginner;

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Welcome back, {userName}
                </h1>
                <p className="text-white/40">
                    Your path: <span className={pathInfo.color}>{pathInfo.label}</span>
                </p>
            </div>

            {/* Continue Learning */}
            <div className="p-8 rounded-2xl bg-[#0d0d0d] border border-white/5">
                <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div className="flex-1 min-w-[280px]">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap size={16} className="text-red-500" />
                            <span className="text-red-500 text-xs font-medium uppercase tracking-wider">Module 1</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Welcome to Vibecoding</h2>
                        <p className="text-white/40 text-sm mb-6">
                            Introduction to AI-assisted development and setting up your environment.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="h-1 flex-1 max-w-[200px] bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-0 bg-red-500 rounded-full" />
                            </div>
                            <span className="text-white/30 text-xs">0%</span>
                        </div>
                    </div>
                    <Link to="/dashboard/course">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
                            Start Learning <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                    href="https://discord.gg/bQW2YtNB6G"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <MessageCircle className="text-purple-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white group-hover:text-white/90">Join Discord</h3>
                            <p className="text-white/40 text-sm">Connect with builders</p>
                        </div>
                    </div>
                </a>
                <Link
                    to="/dashboard/resources"
                    className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Zap className="text-orange-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white group-hover:text-white/90">Resources</h3>
                            <p className="text-white/40 text-sm">Tools and templates</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;
