import { ArrowUpRight, Code2, Palette, Layers, Sparkles, BookOpen, Zap } from 'lucide-react';

const resources = [
    {
        name: 'ReactBits',
        description: 'Beautiful animated React components',
        url: 'https://reactbits.dev',
        icon: Code2,
    },
    {
        name: 'Mobbin',
        description: 'UI/UX patterns from real apps',
        url: 'https://mobbin.com',
        icon: Palette,
    },
    {
        name: 'shadcn/ui',
        description: 'Copy-paste component library',
        url: 'https://ui.shadcn.com',
        icon: Layers,
    },
    {
        name: 'v0.dev',
        description: 'AI-powered UI generation',
        url: 'https://v0.dev',
        icon: Sparkles,
    },
];

const comingSoon = [
    'Prompt library',
    'Figma templates',
    'Video tutorials',
    'Community showcases',
];

const DashboardResources = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Resources</h1>
                <p className="text-white/40">Curated tools and inspiration for vibecoders</p>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                    <a
                        key={resource.name}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                                <resource.icon size={20} />
                            </div>
                            <ArrowUpRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-medium text-white mb-1">{resource.name}</h3>
                        <p className="text-white/40 text-sm">{resource.description}</p>
                    </a>
                ))}
            </div>

            {/* Coming Soon */}
            <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={16} className="text-red-500" />
                    <span className="text-white/40 text-sm font-medium">More coming soon</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {comingSoon.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/30 text-sm">
                            <Zap size={12} className="text-red-500/50" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardResources;
