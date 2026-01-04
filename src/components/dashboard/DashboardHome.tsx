import { Link } from 'react-router-dom';
import { ArrowRight, Zap, MessageCircle, Bookmark } from 'lucide-react';

interface DashboardHomeProps {
    userName: string;
    learningPath: string;
    completedChapters: Record<string, string[]>;
}

const pathLabels: Record<string, { label: string; color: string }> = {
    speedrunner: { label: 'Speedrunner', color: 'text-orange-400' },
    builder: { label: 'Builder', color: 'text-blue-400' },
    developer: { label: 'Developer', color: 'text-cyan-400' },
    beginner: { label: 'Beginner', color: 'text-green-400' },
    expert: { label: 'Expert', color: 'text-purple-400' },
};

const DashboardHome = ({ userName, learningPath, completedChapters }: DashboardHomeProps) => {
    const pathInfo = pathLabels[learningPath] || pathLabels.beginner;
    
    // Calculate progress for module 1 (intro)
    const introProgress = completedChapters['intro']?.length || 0;
    const introTotal = 3; // Module 1 has 3 chapters
    const progressPercent = Math.round((introProgress / introTotal) * 100);

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
            <div className="p-8 rounded-3xl bg-[#0d0d0d] border border-white/5">
                <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div className="flex-1 min-w-[280px]">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap size={16} className="text-red-500" />
                            <span className="text-red-500 text-xs font-medium uppercase tracking-wider">Module 1</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">What is Vibecoding?</h2>
                        <p className="text-white/40 text-sm mb-6">
                            Introduction to AI-assisted development and your personalized path.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="h-1.5 flex-1 max-w-[200px] bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500" 
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <span className="text-white/30 text-xs">{progressPercent}%</span>
                        </div>
                    </div>
                    <Link to="/dashboard/course">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl text-sm font-semibold hover:bg-white/90 transition-colors">
                            Start Learning <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Quick Links - Smaller and cleaner */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <a
                    href="https://discord.gg/bQW2YtNB6G"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm"
                >
                    <MessageCircle size={16} />
                    Join Discord
                </a>
                <span className="text-white/10">|</span>
                <Link
                    to="/dashboard/resources"
                    className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm"
                >
                    <Bookmark size={16} />
                    Resources
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;
