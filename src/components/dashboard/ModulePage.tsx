import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, PlayCircle } from 'lucide-react';
import { COURSE_MODULES, getModuleById } from '@/data/courseContent';
import { supabase } from '@/integrations/supabase/client';

interface ModulePageProps {
    userId: string;
}

const ModulePage = ({ userId }: ModulePageProps) => {
    const { moduleId } = useParams<{ moduleId: string }>();
    const module = getModuleById(moduleId || '');
    const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProgress = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('completed_chapters')
                .eq('id', userId)
                .single();

            if (data?.completed_chapters && moduleId) {
                const chapters = (data.completed_chapters as Record<string, string[]>)[moduleId] || [];
                setCompletedChapters(new Set(chapters));
            }
            setIsLoading(false);
        };

        loadProgress();
    }, [moduleId, userId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    if (!module) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white/40 mb-4">Module not found</p>
                    <Link to="/dashboard/course" className="text-white underline">Back to Course</Link>
                </div>
            </div>
        );
    }

    const currentIndex = COURSE_MODULES.findIndex(m => m.id === moduleId);
    const prevModule = currentIndex > 0 ? COURSE_MODULES[currentIndex - 1] : null;
    const nextModule = currentIndex < COURSE_MODULES.length - 1 ? COURSE_MODULES[currentIndex + 1] : null;

    const totalVibeCoins = module.chapters.reduce((sum, ch) => sum + ch.vibeCoins, 0);
    const earnedVibeCoins = module.chapters
        .filter(ch => completedChapters.has(ch.id))
        .reduce((sum, ch) => sum + ch.vibeCoins, 0);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <Link
                    to="/dashboard/course"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Course
                </Link>

                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <p className="text-white/30 text-sm mb-2">Module {module.number}</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{module.title}</h1>
                        <p className="text-white/40 mb-4">{module.description}</p>

                        {/* AI Studio Note */}
                        <p className="text-sm text-white/40 italic">
                            📝 Note: We are using Google AI Studio since you don't have to pay for it and it is great for demonstration purposes.
                        </p>
                    </div>

                    <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[120px]">
                        <p className="text-2xl font-bold text-white">{completedChapters.size}/{module.chapters.length}</p>
                        <p className="text-white/30 text-xs mb-2">Chapters</p>
                        <div className="text-sm text-green-400 font-medium">+{earnedVibeCoins}/{totalVibeCoins}</div>
                        <p className="text-white/30 text-[10px]">VibeCoins</p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedChapters.size / module.chapters.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                />
            </div>

            {/* Chapters Grid */}
            <div className="grid gap-4">
                {module.chapters.map((chapter, index) => {
                    const isComplete = completedChapters.has(chapter.id);
                    const isFirst = index === 0;
                    const prevComplete = index > 0 ? completedChapters.has(module.chapters[index - 1].id) : true;
                    const isUnlocked = isFirst || prevComplete || isComplete;

                    return (
                        <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={isUnlocked ? `/dashboard/course/${moduleId}/${chapter.id}` : '#'}
                                className={`block rounded-2xl bg-[#0d0d0d] border transition-all duration-300 ${isUnlocked
                                    ? 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                                    : 'border-white/5 opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={e => !isUnlocked && e.preventDefault()}
                            >
                                <div className="px-6 py-5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${isComplete
                                            ? 'bg-green-500/20 text-green-400'
                                            : isUnlocked
                                                ? 'bg-white/5 text-white/40'
                                                : 'bg-white/5 text-white/20'
                                            }`}>
                                            {isComplete ? <Check size={20} /> : index + 1}
                                        </div>
                                        <div>
                                            <p className={`font-medium text-lg ${isComplete ? 'text-white/50' : 'text-white'}`}>
                                                {chapter.title}
                                            </p>
                                            <p className="text-white/30 text-sm">
                                                +{chapter.vibeCoins} VibeCoins
                                                {isComplete && <span className="text-green-400 ml-2">✓ Earned</span>}
                                            </p>
                                        </div>
                                    </div>

                                    {isUnlocked && (
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isComplete
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                                            }`}>
                                            {isComplete ? (
                                                <span className="text-sm font-medium">Review</span>
                                            ) : (
                                                <>
                                                    <PlayCircle size={16} />
                                                    <span className="text-sm font-medium">Start</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                {prevModule ? (
                    <Link
                        to={`/dashboard/course/${prevModule.id}`}
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm">{prevModule.title}</span>
                    </Link>
                ) : <div />}
                {nextModule ? (
                    <Link
                        to={`/dashboard/course/${nextModule.id}`}
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                    >
                        <span className="text-sm">{nextModule.title}</span>
                        <ArrowRight size={16} />
                    </Link>
                ) : (
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-white hover:text-white/80 transition-colors bg-white/5 px-4 py-2 rounded-xl"
                    >
                        <span className="text-sm">Back to Dashboard</span>
                        <ArrowRight size={16} />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ModulePage;
