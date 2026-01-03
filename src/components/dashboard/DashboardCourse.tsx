import { Lock, BookOpen, Code2, Layers, Zap, Palette, Database, Globe, Sparkles, Terminal, Cpu, Rocket } from 'lucide-react';

const modules = [
    { icon: BookOpen, title: 'Welcome to Vibecoding', desc: 'Introduction and setup' },
    { icon: Terminal, title: 'Your First AI Prompt', desc: 'Talking to AI effectively' },
    { icon: Code2, title: 'Understanding Code', desc: 'Reading without writing' },
    { icon: Layers, title: 'Building Components', desc: 'UI with AI assistance' },
    { icon: Palette, title: 'Styling & Design', desc: 'CSS and design systems' },
    { icon: Database, title: 'Data & State', desc: 'Managing application state' },
    { icon: Globe, title: 'APIs & Backend', desc: 'Connecting to services' },
    { icon: Zap, title: 'Supabase Integration', desc: 'Database and auth' },
    { icon: Sparkles, title: 'Advanced Prompting', desc: 'Complex instructions' },
    { icon: Cpu, title: 'Debugging with AI', desc: 'Fixing issues efficiently' },
    { icon: Rocket, title: 'Deployment', desc: 'Going live with Vercel' },
    { icon: Lock, title: 'Final Project', desc: 'Build your own app' },
];

const DashboardCourse = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Course</h1>
                <p className="text-white/40">12 modules to master vibecoding</p>
            </div>

            {/* Coming Soon Banner */}
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-3">
                    <Sparkles className="text-red-500" size={20} />
                    <div>
                        <p className="text-white font-medium">Course content coming soon</p>
                        <p className="text-white/40 text-sm">We're working hard on the curriculum. Stay tuned!</p>
                    </div>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 opacity-60 cursor-not-allowed"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
                                <module.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white/20 text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                                    <Lock size={12} className="text-white/20" />
                                </div>
                                <h3 className="font-medium text-white/60 mb-1">{module.title}</h3>
                                <p className="text-white/30 text-sm">{module.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCourse;
