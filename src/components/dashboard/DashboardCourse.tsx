import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Check, Lightbulb, Zap, BookOpen, Play } from 'lucide-react';
import { COURSE_MODULES, Module, Lesson } from '@/data/courseContent';

interface DashboardCourseProps {
    learningPath: string;
}

const DashboardCourse = ({ learningPath }: DashboardCourseProps) => {
    const [expandedModule, setExpandedModule] = useState<string | null>('intro');
    const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

    const toggleComplete = (lessonId: string) => {
        const newCompleted = new Set(completedLessons);
        if (newCompleted.has(lessonId)) {
            newCompleted.delete(lessonId);
        } else {
            newCompleted.add(lessonId);
        }
        setCompletedLessons(newCompleted);
    };

    const totalPoints = completedLessons.size > 0
        ? COURSE_MODULES.reduce((total, mod) =>
            total + mod.lessons.filter(l => completedLessons.has(l.id)).reduce((sum, l) => sum + l.codePoints, 0), 0)
        : 0;

    const difficultyColors = {
        beginner: 'text-green-400 bg-green-500/10',
        intermediate: 'text-yellow-400 bg-yellow-500/10',
        advanced: 'text-red-400 bg-red-500/10',
    };

    return (
        <div className="space-y-6">
            {/* Header with Points */}
            <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Course</h1>
                    <p className="text-white/40">{COURSE_MODULES.length} modules • {COURSE_MODULES.reduce((t, m) => t + m.lessons.length, 0)} lessons</p>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                    <Zap size={18} className="text-yellow-400" />
                    <div>
                        <p className="text-xl font-bold text-white">{totalPoints}</p>
                        <p className="text-white/30 text-xs">CodePoints</p>
                    </div>
                </div>
            </div>

            {/* Modules */}
            <div className="space-y-3">
                {COURSE_MODULES.map((module) => {
                    const completedCount = module.lessons.filter(l => completedLessons.has(l.id)).length;
                    const isExpanded = expandedModule === module.id;

                    return (
                        <div key={module.id} className="rounded-2xl bg-[#0d0d0d] border border-white/5 overflow-hidden">
                            {/* Module Header */}
                            <button
                                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                                className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${completedCount === module.lessons.length ? 'bg-green-500/20' : 'bg-white/5'
                                        }`}>
                                        {completedCount === module.lessons.length ? (
                                            <Check size={16} className="text-green-400" />
                                        ) : (
                                            <BookOpen size={16} className="text-white/30" />
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-white">{module.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-white/30 text-xs">{module.duration}</span>
                                            <span className="text-white/10">•</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[module.difficulty]}`}>
                                                {module.difficulty}
                                            </span>
                                            <span className="text-white/10">•</span>
                                            <span className="text-white/30 text-xs">{completedCount}/{module.lessons.length}</span>
                                        </div>
                                    </div>
                                </div>
                                {isExpanded ? (
                                    <ChevronDown size={18} className="text-white/30" />
                                ) : (
                                    <ChevronRight size={18} className="text-white/30" />
                                )}
                            </button>

                            {/* Lessons */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t border-white/5"
                                    >
                                        {module.lessons.map((lesson) => {
                                            const isComplete = completedLessons.has(lesson.id);
                                            const isOpen = expandedLesson === lesson.id;

                                            return (
                                                <div key={lesson.id} className="border-b border-white/5 last:border-0">
                                                    {/* Lesson Header */}
                                                    <button
                                                        onClick={() => setExpandedLesson(isOpen ? null : lesson.id)}
                                                        className={`w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors ${isComplete ? 'opacity-60' : ''}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); toggleComplete(lesson.id); }}
                                                                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${isComplete
                                                                        ? 'bg-green-500 text-white'
                                                                        : 'bg-white/5 text-white/20 hover:bg-white/10'
                                                                    }`}
                                                            >
                                                                <Check size={12} />
                                                            </button>
                                                            <span className={`font-medium text-sm ${isComplete ? 'text-white/50 line-through' : 'text-white'}`}>
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-yellow-400/60 text-xs">+{lesson.codePoints} CP</span>
                                                            <Play size={14} className="text-white/20" />
                                                        </div>
                                                    </button>

                                                    {/* Lesson Content */}
                                                    <AnimatePresence>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="px-5 pb-5"
                                                            >
                                                                <div className="pl-10 space-y-4">
                                                                    {/* Content */}
                                                                    <p className="text-white/60 text-sm leading-relaxed">
                                                                        {lesson.content}
                                                                    </p>

                                                                    {/* Tips */}
                                                                    <div className="p-4 rounded-xl bg-white/5">
                                                                        <div className="flex items-center gap-2 mb-3">
                                                                            <Lightbulb size={14} className="text-yellow-400" />
                                                                            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Tips</span>
                                                                        </div>
                                                                        <ul className="space-y-2">
                                                                            {lesson.tips.map((tip, i) => (
                                                                                <li key={i} className="text-white/50 text-sm flex items-start gap-2">
                                                                                    <span className="text-white/20 mt-1">•</span>
                                                                                    {tip}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>

                                                                    {/* Task */}
                                                                    {lesson.task && (
                                                                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                                                            <div className="flex items-center gap-2 mb-2">
                                                                                <Zap size={14} className="text-green-400" />
                                                                                <span className="text-green-400 text-xs font-medium uppercase tracking-wider">Task</span>
                                                                            </div>
                                                                            <p className="text-white/70 text-sm">{lesson.task}</p>
                                                                        </div>
                                                                    )}

                                                                    {/* Complete Button */}
                                                                    <button
                                                                        onClick={() => toggleComplete(lesson.id)}
                                                                        className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${isComplete
                                                                                ? 'bg-white/5 text-white/40'
                                                                                : 'bg-white text-black hover:bg-white/90'
                                                                            }`}
                                                                    >
                                                                        {isComplete ? 'Completed' : 'Mark Complete'}
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardCourse;
