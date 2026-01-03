import { Lock, Sparkles } from 'lucide-react';

const projects = [
    { title: 'Personal Portfolio', desc: 'Build a stunning portfolio website', difficulty: 'Beginner', tech: ['React', 'CSS'] },
    { title: 'Todo App', desc: 'Classic starter with modern UI', difficulty: 'Beginner', tech: ['React', 'State'] },
    { title: 'Weather Dashboard', desc: 'API integration practice', difficulty: 'Intermediate', tech: ['API', 'React'] },
    { title: 'Chat Application', desc: 'Real-time messaging', difficulty: 'Intermediate', tech: ['Supabase', 'React'] },
    { title: 'E-commerce Store', desc: 'Full shopping experience', difficulty: 'Advanced', tech: ['Stripe', 'Supabase'] },
    { title: 'SaaS Dashboard', desc: 'Complete admin panel', difficulty: 'Advanced', tech: ['Auth', 'Database'] },
];

const difficultyColors: Record<string, string> = {
    Beginner: 'text-green-400',
    Intermediate: 'text-yellow-400',
    Advanced: 'text-red-400',
};

const DashboardProjects = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Projects</h1>
                <p className="text-white/40">Hands-on projects to practice vibecoding</p>
            </div>

            {/* Coming Soon Banner */}
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-3">
                    <Sparkles className="text-red-500" size={20} />
                    <div>
                        <p className="text-white font-medium">Projects coming soon</p>
                        <p className="text-white/40 text-sm">Step-by-step project guides are in development.</p>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 opacity-60 cursor-not-allowed"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className={`text-xs font-medium ${difficultyColors[project.difficulty]}`}>
                                {project.difficulty}
                            </span>
                            <Lock size={14} className="text-white/20" />
                        </div>
                        <h3 className="font-medium text-white/60 mb-2">{project.title}</h3>
                        <p className="text-white/30 text-sm mb-4">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, j) => (
                                <span key={j} className="px-2 py-1 text-xs bg-white/5 rounded-md text-white/30">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardProjects;
