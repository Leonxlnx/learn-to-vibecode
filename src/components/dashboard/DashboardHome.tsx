import { Link } from 'react-router-dom';
import { ArrowRight, Zap, MessageCircle, Bookmark, Trophy, BookOpen, Clock } from 'lucide-react';
import { COURSE_MODULES } from '@/data/courseContent';

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
    
    // Calculate total progress
    const totalCompleted = Object.values(completedChapters).reduce((acc, chapters) => acc + chapters.length, 0);
    const totalChapters = COURSE_MODULES.reduce((t, m) => t + m.chapters.length, 0);
    const overallProgress = Math.round((totalCompleted / totalChapters) * 100);

    // Find current/next module to continue
    const currentModule = COURSE_MODULES.find(mod => {
        const completed = completedChapters[mod.id]?.length || 0;
        return completed < mod.chapters.length;
    }) || COURSE_MODULES[0];

    const currentModuleProgress = completedChapters[currentModule.id]?.length || 0;
    const currentModulePercent = Math.round((currentModuleProgress / currentModule.chapters.length) * 100);

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        Welcome back, {userName}
                    </h1>
                    <p className="text-white/40 text-sm">
                        Your path: <span className={pathInfo.color}>{pathInfo.label}</span>
                    </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex items-center gap-4">
                    <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-lg font-bold text-white">{overallProgress}%</p>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">Progress</p>
                    </div>
                </div>
            </div>

            {/* Continue Learning Card */}
            <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                                <Zap size={14} className="text-red-400" />
                            </div>
                            <span className="text-red-400 text-xs font-medium uppercase tracking-wider">
                                Module {currentModule.number}
                            </span>
                        </div>
                        
                        <h2 className="text-xl font-semibold text-white mb-2">{currentModule.title}</h2>
                        <p className="text-white/40 text-sm mb-4 max-w-lg">{currentModule.description}</p>
                        
                        <div className="flex items-center gap-4 text-white/30 text-xs mb-4">
                            <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {currentModule.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <BookOpen size={12} />
                                {currentModule.chapters.length} lessons
                            </span>
                            <span className="flex items-center gap-1 text-yellow-500/70">
                                <Trophy size={12} />
                                {currentModule.totalVibeCoins} VC
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 flex-1 max-w-[240px] bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500" 
                                    style={{ width: `${currentModulePercent}%` }}
                                />
                            </div>
                            <span className="text-white/40 text-xs">{currentModuleProgress}/{currentModule.chapters.length} completed</span>
                        </div>
                    </div>

                    <Link to={`/dashboard/course/${currentModule.id}`}>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors whitespace-nowrap">
                            Continue Learning <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/dashboard/course" className="group">
                    <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                            <BookOpen size={18} className="text-white/50" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-medium text-sm">View All Modules</h3>
                            <p className="text-white/30 text-xs">{COURSE_MODULES.length} modules available</p>
                        </div>
                        <ArrowRight size={16} className="text-white/20 group-hover:text-white/40 transition-colors" />
                    </div>
                </Link>

                <a 
                    href="https://discord.gg/xrCufejEa3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                >
                    <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <MessageCircle size={18} className="text-indigo-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-medium text-sm">Join Community</h3>
                            <p className="text-white/30 text-xs">Connect with other learners</p>
                        </div>
                        <ArrowRight size={16} className="text-white/20 group-hover:text-white/40 transition-colors" />
                    </div>
                </a>
            </div>

            {/* Footer Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <Link
                    to="/dashboard/resources"
                    className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm"
                >
                    <Bookmark size={14} />
                    Resources
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;