import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Check, ChevronRight, Clock, Trophy, PlayCircle } from 'lucide-react';
import { COURSE_MODULES } from '@/data/courseContent';

interface DashboardCourseProps {
    learningPath: string;
    completedChapters: Record<string, string[]>;
}

const DashboardCourse = ({ learningPath, completedChapters }: DashboardCourseProps) => {
    // Calculate completion status from props (database data)
    const completedModules: Record<string, number> = {};
    COURSE_MODULES.forEach(mod => {
        completedModules[mod.id] = completedChapters[mod.id]?.length || 0;
    });

    const totalCompleted = Object.values(completedModules).reduce((a, b) => a + b, 0);
    const totalChapters = COURSE_MODULES.reduce((t, m) => t + m.chapters.length, 0);
    const overallProgress = Math.round((totalCompleted / totalChapters) * 100);

    // Find first incomplete module for "Continue" button
    const currentModule = COURSE_MODULES.find(mod => {
        const completed = completedModules[mod.id] || 0;
        return completed < mod.chapters.length;
    }) || COURSE_MODULES[0];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Learning Path</h1>
                    <p className="text-white/50 text-sm">Master AI-powered development step by step</p>
                </div>

                {/* Progress Overview */}
                <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#111] border border-white/5">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{totalCompleted}</p>
                        <p className="text-white/40 text-xs">Completed</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{totalChapters}</p>
                        <p className="text-white/40 text-xs">Total Lessons</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{overallProgress}%</p>
                        <p className="text-white/40 text-xs">Progress</p>
                    </div>
                </div>
            </div>

            {/* Continue Learning Card */}
            {currentModule && (
                <Link to={`/dashboard/course/${currentModule.id}`}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 hover:border-red-500/40 transition-all group cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                                    <PlayCircle className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <p className="text-red-400 text-xs font-medium uppercase tracking-wider mb-1">Continue Learning</p>
                                    <h3 className="text-white font-semibold">{currentModule.title}</h3>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                        </div>
                    </motion.div>
                </Link>
            )}

            {/* Modules List */}
            <div className="space-y-3">
                <h2 className="text-sm font-medium text-white/40 uppercase tracking-wider px-1">All Modules</h2>
                
                <div className="space-y-2">
                    {COURSE_MODULES.map((module, index) => {
                        const completed = completedModules[module.id] || 0;
                        const isComplete = completed === module.chapters.length;
                        const progress = (completed / module.chapters.length) * 100;
                        const isLocked = index > 0 && completedModules[COURSE_MODULES[index - 1].id] === 0;

                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <Link
                                    to={isLocked ? '#' : `/dashboard/course/${module.id}`}
                                    className={`block p-4 rounded-xl border transition-all group ${
                                        isLocked 
                                            ? 'bg-[#0a0a0a] border-white/5 opacity-50 cursor-not-allowed' 
                                            : 'bg-[#0d0d0d] border-white/5 hover:border-white/15 hover:bg-[#111]'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Status Icon */}
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            isComplete 
                                                ? 'bg-green-500/20 text-green-400' 
                                                : 'bg-white/5 text-white/40'
                                        }`}>
                                            {isComplete ? <Check size={18} /> : <span className="text-sm font-bold">{module.number}</span>}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-medium text-white text-sm truncate">{module.title}</h3>
                                                {isComplete && (
                                                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-medium rounded-full">
                                                        Complete
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-white/30 text-xs">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={11} />
                                                    {module.duration}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <BookOpen size={11} />
                                                    {module.chapters.length} lessons
                                                </span>
                                                <span className="flex items-center gap-1 text-yellow-500/70">
                                                    <Trophy size={11} />
                                                    {module.totalVibeCoins} VC
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="hidden sm:flex items-center gap-3">
                                            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.5, delay: index * 0.03 }}
                                                    className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-white/30'}`}
                                                />
                                            </div>
                                            <span className="text-white/30 text-xs w-8">{completed}/{module.chapters.length}</span>
                                        </div>

                                        <ChevronRight size={16} className="text-white/20 group-hover:text-white/40 transition-colors flex-shrink-0" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardCourse;