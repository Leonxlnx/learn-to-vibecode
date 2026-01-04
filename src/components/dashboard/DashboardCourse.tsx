import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Check, ArrowRight, Clock } from 'lucide-react';
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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Course</h1>
                    <p className="text-white/40">Master AI-powered development with Google AI Studio</p>
                </div>
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="text-lg font-bold text-white">{totalCompleted}/{totalChapters}</p>
                    <p className="text-white/30 text-xs">Chapters Done</p>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="space-y-4">
                {COURSE_MODULES.map((module, index) => {
                    const completed = completedModules[module.id] || 0;
                    const isComplete = completed === module.chapters.length;
                    const progress = (completed / module.chapters.length) * 100;

                    return (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={`/dashboard/course/${module.id}`}
                                className="block p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex items-start gap-5">
                                    {/* Module Number */}
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${isComplete
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-white/5 text-white/40'
                                        }`}>
                                        {isComplete ? <Check size={20} /> : module.number}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div>
                                                <h3 className="font-medium text-white group-hover:text-white/90 mb-1">
                                                    {module.title}
                                                </h3>
                                                <p className="text-white/40 text-sm">{module.description}</p>
                                            </div>
                                            <ArrowRight size={18} className="text-white/20 group-hover:text-white/40 transition-colors flex-shrink-0 mt-1" />
                                        </div>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-white/30 text-xs mb-3">
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {module.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BookOpen size={12} />
                                                {module.chapters.length} chapters
                                            </span>
                                            <span>+{module.totalVibeCoins} VC</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                                className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-white/30'}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardCourse;
