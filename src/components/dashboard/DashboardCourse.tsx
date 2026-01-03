import { useState } from 'react';
import { Lock, Check, ChevronDown, ChevronUp, Sparkles, BookOpen, Code2, Layers, Zap, Palette, Database, Globe, Terminal, Cpu, Rocket, FolderOpen, Wrench, Key, Timer, Image, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_MODULES, getModuleById } from '@/services/aiCourse';

const iconMap: Record<string, any> = {
    'intro': BookOpen,
    'setup': Wrench,
    'prompting-101': MessageCircle,
    'prompting-advanced': MessageCircle,
    'html-css': Code2,
    'javascript': Terminal,
    'react-basics': Layers,
    'react-advanced': Layers,
    'cursor': Zap,
    'v0': Sparkles,
    'claude': Cpu,
    'asset-gen': Image,
    'git': FolderOpen,
    'supabase': Database,
    'api': Globe,
    'auth': Key,
    'vercel': Rocket,
    'domains': Globe,
    'debugging': Wrench,
    'performance': Timer,
    'project-portfolio': FolderOpen,
    'project-saas': FolderOpen,
    'project-dashboard': FolderOpen,
};

interface DashboardCourseProps {
    learningPath: string;
}

const DashboardCourse = ({ learningPath }: DashboardCourseProps) => {
    const [expandedSection, setExpandedSection] = useState<string | null>('fundamentals');
    const [skippedModules, setSkippedModules] = useState<Set<string>>(new Set());

    // Group modules by category
    const sections = [
        { id: 'fundamentals', title: 'Fundamentals', modules: ['intro', 'setup', 'prompting-101', 'prompting-advanced'] },
        { id: 'development', title: 'Development Basics', modules: ['html-css', 'javascript', 'react-basics', 'react-advanced'] },
        { id: 'ai-tools', title: 'AI Tools', modules: ['cursor', 'v0', 'claude', 'asset-gen'] },
        { id: 'backend', title: 'Backend & Data', modules: ['git', 'supabase', 'api', 'auth'] },
        { id: 'deployment', title: 'Deployment', modules: ['vercel', 'domains', 'debugging', 'performance'] },
        { id: 'projects', title: 'Projects', modules: ['project-portfolio', 'project-saas', 'project-dashboard'] },
    ];

    const toggleSkip = (moduleId: string) => {
        const newSkipped = new Set(skippedModules);
        if (newSkipped.has(moduleId)) {
            newSkipped.delete(moduleId);
        } else {
            newSkipped.add(moduleId);
        }
        setSkippedModules(newSkipped);
    };

    const difficultyColors = {
        beginner: 'text-green-400',
        intermediate: 'text-yellow-400',
        advanced: 'text-red-400',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Course</h1>
                <p className="text-white/40">23 modules organized by topic</p>
            </div>

            {/* Coming Soon Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center">
                        <Sparkles size={16} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-white font-medium text-sm">Content coming soon</p>
                        <p className="text-white/40 text-xs">Mark modules you already know to skip</p>
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-3">
                {sections.map((section) => (
                    <div key={section.id} className="rounded-2xl bg-[#0d0d0d] border border-white/5 overflow-hidden">
                        {/* Section Header */}
                        <button
                            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                            className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-white font-medium">{section.title}</span>
                                <span className="text-white/20 text-xs">{section.modules.length} modules</span>
                            </div>
                            {expandedSection === section.id ? (
                                <ChevronUp size={18} className="text-white/30" />
                            ) : (
                                <ChevronDown size={18} className="text-white/30" />
                            )}
                        </button>

                        {/* Modules */}
                        <AnimatePresence>
                            {expandedSection === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-white/5"
                                >
                                    {section.modules.map((moduleId) => {
                                        const module = getModuleById(moduleId);
                                        if (!module) return null;

                                        const Icon = iconMap[moduleId] || BookOpen;
                                        const isSkipped = skippedModules.has(moduleId);

                                        return (
                                            <div
                                                key={moduleId}
                                                className={`px-5 py-4 flex items-center justify-between border-b border-white/5 last:border-0 ${isSkipped ? 'opacity-40' : ''}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSkipped ? 'bg-white/5' : 'bg-white/5'}`}>
                                                        {isSkipped ? (
                                                            <Check size={16} className="text-green-500" />
                                                        ) : (
                                                            <Icon size={16} className="text-white/40" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`font-medium text-sm ${isSkipped ? 'text-white/40 line-through' : 'text-white'}`}>
                                                            {module.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-white/30 text-xs">{module.duration}</span>
                                                            <span className="text-white/10">•</span>
                                                            <span className={`text-xs ${difficultyColors[module.difficulty]}`}>
                                                                {module.difficulty}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => toggleSkip(moduleId)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isSkipped
                                                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                                            : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                                                        }`}
                                                >
                                                    {isSkipped ? 'Skipped' : 'I know this'}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCourse;
