import { ArrowUpRight, Code2, Palette, Layers, Sparkles, Zap, BookOpen, Terminal, Globe, Database, Cpu, MessageCircle, Image, FolderOpen } from 'lucide-react';

const resources = [
    // AI Code Editors
    {
        category: 'AI Code Editors',
        items: [
            { name: 'Cursor', desc: 'The AI-first code editor', url: 'https://cursor.com', icon: Terminal },
            { name: 'GitHub Copilot', desc: 'AI pair programmer in VS Code', url: 'https://github.com/features/copilot', icon: Code2 },
            { name: 'Windsurf', desc: 'Collaborative AI coding', url: 'https://codeium.com/windsurf', icon: Sparkles },
        ]
    },
    // UI Generation
    {
        category: 'UI Generation',
        items: [
            { name: 'v0.dev', desc: 'Generate UIs from text', url: 'https://v0.dev', icon: Sparkles },
            { name: 'shadcn/ui', desc: 'Copy-paste components', url: 'https://ui.shadcn.com', icon: Layers },
            { name: 'ReactBits', desc: 'Animated React components', url: 'https://reactbits.dev', icon: Zap },
            { name: 'Aceternity UI', desc: 'Premium animated components', url: 'https://ui.aceternity.com', icon: Palette },
        ]
    },
    // AI Assistants
    {
        category: 'AI Assistants',
        items: [
            { name: 'Claude', desc: 'Best for code reasoning', url: 'https://claude.ai', icon: MessageCircle },
            { name: 'ChatGPT', desc: 'Versatile coding help', url: 'https://chat.openai.com', icon: Cpu },
            { name: 'Google AI Studio', desc: 'Gemini API playground', url: 'https://aistudio.google.com', icon: Sparkles },
        ]
    },
    // Asset Generation
    {
        category: 'Asset Generation',
        items: [
            { name: 'DALL-E', desc: 'Generate images from text', url: 'https://labs.openai.com', icon: Image },
            { name: 'Ideogram', desc: 'Text-to-image with typography', url: 'https://ideogram.ai', icon: Image },
            { name: 'Remove.bg', desc: 'Remove image backgrounds', url: 'https://remove.bg', icon: Image },
        ]
    },
    // Backend & Deployment
    {
        category: 'Backend & Deploy',
        items: [
            { name: 'Supabase', desc: 'Database, auth, storage', url: 'https://supabase.com', icon: Database },
            { name: 'Vercel', desc: 'Deploy in seconds', url: 'https://vercel.com', icon: Globe },
            { name: 'Netlify', desc: 'Alternative deployment', url: 'https://netlify.com', icon: Globe },
        ]
    },
    // Design Inspiration
    {
        category: 'Design Inspiration',
        items: [
            { name: 'Mobbin', desc: 'Real app UI patterns', url: 'https://mobbin.com', icon: Palette },
            { name: 'Dribbble', desc: 'Design inspiration', url: 'https://dribbble.com', icon: Palette },
            { name: 'Godly', desc: 'Curated web design', url: 'https://godly.website', icon: Palette },
        ]
    },
    // Learning
    {
        category: 'Learning',
        items: [
            { name: 'MDN Web Docs', desc: 'Web reference docs', url: 'https://developer.mozilla.org', icon: BookOpen },
            { name: 'React Docs', desc: 'Official React docs', url: 'https://react.dev', icon: BookOpen },
            { name: 'freeCodeCamp', desc: 'Free coding courses', url: 'https://freecodecamp.org', icon: BookOpen },
        ]
    },
];

const DashboardResources = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Resources</h1>
                <p className="text-white/40">Curated tools for vibecoders</p>
            </div>

            {/* Resource Categories */}
            <div className="space-y-8">
                {resources.map((category) => (
                    <div key={category.category}>
                        <h2 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4">{category.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {category.items.map((resource) => (
                                <a
                                    key={resource.name}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all group flex items-center gap-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white/50 transition-colors flex-shrink-0">
                                        <resource.icon size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white text-sm truncate">{resource.name}</p>
                                        <p className="text-white/30 text-xs truncate">{resource.desc}</p>
                                    </div>
                                    <ArrowUpRight size={14} className="text-white/10 group-hover:text-white/30 transition-colors flex-shrink-0" />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardResources;
