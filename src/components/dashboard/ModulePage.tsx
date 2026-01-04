import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Lightbulb, Zap, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { COURSE_MODULES, getModuleById, Chapter } from '@/data/courseContent';
import { supabase } from '@/integrations/supabase/client';

interface ModulePageProps {
    userId: string;
}

const ModulePage = ({ userId }: ModulePageProps) => {
    const { moduleId } = useParams<{ moduleId: string }>();
    const module = getModuleById(moduleId || '');
    const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
    const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load completed chapters from database
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
        
        // Auto-expand first chapter
        if (module && module.chapters.length > 0) {
            setExpandedChapter(module.chapters[0].id);
        }
    }, [moduleId, module, userId]);

    const toggleComplete = async (chapterId: string, vibeCoins: number) => {
        const newCompleted = new Set(completedChapters);
        const isCompleting = !newCompleted.has(chapterId);
        
        if (isCompleting) {
            newCompleted.add(chapterId);
        } else {
            newCompleted.delete(chapterId);
        }
        
        setCompletedChapters(newCompleted);
        
        // Get current data from database
        const { data: profile } = await supabase
            .from('profiles')
            .select('completed_chapters, vibe_coins')
            .eq('id', userId)
            .single();
        
        if (profile && moduleId) {
            const allCompleted = (profile.completed_chapters as Record<string, string[]>) || {};
            allCompleted[moduleId] = [...newCompleted];
            
            const newCoins = isCompleting 
                ? (profile.vibe_coins || 0) + vibeCoins 
                : Math.max(0, (profile.vibe_coins || 0) - vibeCoins);
            
            await supabase
                .from('profiles')
                .update({ 
                    completed_chapters: allCompleted,
                    vibe_coins: newCoins 
                })
                .eq('id', userId);
            
            // Trigger update in Dashboard
            window.dispatchEvent(new Event('progressUpdate'));
        }
    };

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

    return (
        <div className="space-y-8">
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
                        <p className="text-white/40">{module.description}</p>
                    </div>
                    <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-lg font-bold text-white">{completedChapters.size}/{module.chapters.length}</p>
                        <p className="text-white/30 text-xs">Completed</p>
                    </div>
                </div>
            </div>

            {/* Chapters */}
            <div className="space-y-3">
                {module.chapters.map((chapter, index) => {
                    const isComplete = completedChapters.has(chapter.id);
                    const isExpanded = expandedChapter === chapter.id;

                    return (
                        <div key={chapter.id} className="rounded-2xl bg-[#0d0d0d] border border-white/5 overflow-hidden">
                            {/* Chapter Header */}
                            <button
                                onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold ${isComplete ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40'
                                        }`}>
                                        {isComplete ? <Check size={18} /> : index + 1}
                                    </div>
                                    <div className="text-left">
                                        <p className={`font-medium ${isComplete ? 'text-white/50' : 'text-white'}`}>
                                            {chapter.title}
                                        </p>
                                        <p className="text-white/30 text-sm">+{chapter.vibeCoins} ViobeCoins</p>
                                    </div>
                                </div>
                                {isExpanded ? (
                                    <ChevronDown size={20} className="text-white/30" />
                                ) : (
                                    <ChevronRight size={20} className="text-white/30" />
                                )}
                            </button>

                            {/* Chapter Content */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t border-white/5"
                                    >
                                        <div className="p-6 space-y-6">
                                            {/* Content Paragraphs */}
                                            <div className="space-y-4">
                                                {chapter.content.map((para, i) => (
                                                    <p key={i} className="text-white/60 leading-relaxed">
                                                        {para}
                                                    </p>
                                                ))}
                                            </div>

                                            {/* Tips */}
                                            <div className="p-5 rounded-2xl bg-white/5">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Lightbulb size={16} className="text-white/40" />
                                                    <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Pro Tips</span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {chapter.tips.map((tip, i) => (
                                                        <li key={i} className="text-white/50 text-sm flex items-start gap-3">
                                                            <span className="text-white/20 mt-0.5">•</span>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Task */}
                                            {chapter.task && (
                                                <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Zap size={16} className="text-green-400" />
                                                        <span className="text-green-400 text-xs font-medium uppercase tracking-wider">Your Task</span>
                                                    </div>
                                                    <p className="text-white/70">{chapter.task}</p>
                                                </div>
                                            )}

                                            {/* Complete Button */}
                                            <button
                                                onClick={() => toggleComplete(chapter.id, chapter.vibeCoins)}
                                                className={`w-full py-4 rounded-2xl font-medium transition-all ${isComplete
                                                        ? 'bg-white/5 text-white/40'
                                                        : 'bg-white text-black hover:bg-white/90'
                                                    }`}
                                            >
                                                {isComplete ? '✓ Completed' : `Complete & Earn ${chapter.vibeCoins} ViobeCoins`}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
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
