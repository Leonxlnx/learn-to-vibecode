import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Lightbulb, Zap } from 'lucide-react';
import { COURSE_MODULES, getModuleById } from '@/data/courseContent';
import { supabase } from '@/integrations/supabase/client';
import confetti from 'canvas-confetti';

interface ChapterPageProps {
    userId: string;
}

const ChapterPage = ({ userId }: ChapterPageProps) => {
    const { moduleId, chapterId } = useParams<{ moduleId: string; chapterId: string }>();
    const navigate = useNavigate();
    const module = getModuleById(moduleId || '');
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const chapter = module?.chapters.find(c => c.id === chapterId);
    const chapterIndex = module?.chapters.findIndex(c => c.id === chapterId) ?? -1;
    const prevChapter = chapterIndex > 0 ? module?.chapters[chapterIndex - 1] : null;
    const nextChapter = module && chapterIndex < module.chapters.length - 1 ? module.chapters[chapterIndex + 1] : null;

    // Find next module if we're at the last chapter
    const currentModuleIndex = COURSE_MODULES.findIndex(m => m.id === moduleId);
    const nextModule = currentModuleIndex < COURSE_MODULES.length - 1 ? COURSE_MODULES[currentModuleIndex + 1] : null;

    useEffect(() => {
        const loadProgress = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('completed_chapters')
                .eq('id', userId)
                .single();

            if (data?.completed_chapters && moduleId && chapterId) {
                const chapters = (data.completed_chapters as Record<string, string[]>)[moduleId] || [];
                setIsComplete(chapters.includes(chapterId));
            }
            setIsLoading(false);
        };

        loadProgress();
    }, [moduleId, chapterId, userId]);

    const triggerConfetti = () => {
        // Multiple bursts for smooth effect
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'],
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'],
            });
        }, 250);
    };

    const toggleComplete = async () => {
        if (!chapter || !moduleId) return;

        const wasComplete = isComplete;
        const newIsComplete = !isComplete;
        setIsComplete(newIsComplete);

        // Trigger confetti when completing (not uncompleting)
        if (newIsComplete) {
            triggerConfetti();
        }

        // Get current data from database
        const { data: profile } = await supabase
            .from('profiles')
            .select('completed_chapters, vibe_coins')
            .eq('id', userId)
            .single();

        if (profile) {
            const allCompleted = (profile.completed_chapters as Record<string, string[]>) || {};
            const moduleChapters = new Set(allCompleted[moduleId] || []);

            if (newIsComplete) {
                moduleChapters.add(chapterId!);
            } else {
                moduleChapters.delete(chapterId!);
            }

            allCompleted[moduleId] = [...moduleChapters];

            const newCoins = newIsComplete
                ? (profile.vibe_coins || 0) + chapter.vibeCoins
                : Math.max(0, (profile.vibe_coins || 0) - chapter.vibeCoins);

            await supabase
                .from('profiles')
                .update({
                    completed_chapters: allCompleted,
                    vibe_coins: newCoins
                })
                .eq('id', userId);

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

    if (!module || !chapter) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white/40 mb-4">Chapter not found</p>
                    <Link to="/dashboard/course" className="text-white underline">Back to Course</Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 max-w-3xl mx-auto"
        >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40">
                <Link to="/dashboard/course" className="hover:text-white transition-colors">
                    Course
                </Link>
                <span>/</span>
                <Link to={`/dashboard/course/${moduleId}`} className="hover:text-white transition-colors">
                    {module.title}
                </Link>
                <span>/</span>
                <span className="text-white/60">{chapter.title}</span>
            </div>

            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold ${isComplete ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'}`}>
                        {isComplete ? <Check size={18} /> : chapterIndex + 1}
                    </div>
                    <div>
                        <p className="text-white/30 text-xs uppercase tracking-wider">Chapter {chapterIndex + 1} of {module.chapters.length}</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{chapter.title}</h1>
                    </div>
                </div>

                {/* AI Studio Note */}
                <div className="text-sm text-white/40 italic">
                    Note: We are using Google AI Studio since you don't have to pay for it and it is great for demonstration purposes.
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 p-6 md:p-8 rounded-3xl bg-[#0d0d0d] border border-white/5">
                {/* Content Paragraphs */}
                <div className="space-y-4">
                    {chapter.content.map((para, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-white/70 leading-relaxed text-lg"
                        >
                            {para}
                        </motion.p>
                    ))}
                </div>

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb size={18} className="text-yellow-400" />
                        <span className="text-white/70 text-sm font-bold uppercase tracking-wider">Pro Tips</span>
                    </div>
                    <ul className="space-y-3">
                        {chapter.tips.map((tip, i) => (
                            <li key={i} className="text-white/60 flex items-start gap-3">
                                <span className="text-yellow-400/60 mt-1">•</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Task Section */}
                {chapter.task && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Zap size={18} className="text-green-400" />
                            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">Your Task</span>
                        </div>
                        <p className="text-white/80 text-lg">{chapter.task}</p>
                    </motion.div>
                )}
            </div>

            {/* Complete Button */}
            <motion.button
                onClick={toggleComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${isComplete
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    }`}
            >
                {isComplete ? (
                    <span className="flex items-center justify-center gap-2">
                        <Check size={20} />
                        Completed - +{chapter.vibeCoins} VibeCoins earned
                    </span>
                ) : (
                    <span>Complete & Earn {chapter.vibeCoins} VibeCoins</span>
                )}
            </motion.button>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                {prevChapter ? (
                    <Link
                        to={`/dashboard/course/${moduleId}/${prevChapter.id}`}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <ArrowLeft size={16} />
                        <div className="text-left">
                            <p className="text-xs text-white/30">Previous</p>
                            <p className="text-sm">{prevChapter.title}</p>
                        </div>
                    </Link>
                ) : (
                    <Link
                        to={`/dashboard/course/${moduleId}`}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm">Back to Module</span>
                    </Link>
                )}

                {nextChapter ? (
                    <Link
                        to={`/dashboard/course/${moduleId}/${nextChapter.id}`}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <div className="text-right">
                            <p className="text-xs text-white/30">Next</p>
                            <p className="text-sm">{nextChapter.title}</p>
                        </div>
                        <ArrowRight size={16} />
                    </Link>
                ) : nextModule ? (
                    <Link
                        to={`/dashboard/course/${nextModule.id}`}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                        <div className="text-right">
                            <p className="text-xs text-white/50">Next Module</p>
                            <p className="text-sm font-medium">{nextModule.title}</p>
                        </div>
                        <ArrowRight size={16} />
                    </Link>
                ) : (
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                        <span className="text-sm font-medium">Course Complete</span>
                        <ArrowRight size={16} />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default ChapterPage;
