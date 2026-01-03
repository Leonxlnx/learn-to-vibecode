// Course Lessons Data
// Short, actionable content focused on Cursor/Antigravity and AI Studio

export interface Lesson {
    id: string;
    title: string;
    content: string;
    tips: string[];
    task?: string;
    codePoints: number;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    lessons: Lesson[];
    project?: string;
}

export const COURSE_MODULES: Module[] = [
    // === FUNDAMENTALS ===
    {
        id: 'intro',
        title: 'What is Vibecoding?',
        description: 'The new way to build software',
        duration: '5 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'intro-1',
                title: 'The Shift',
                content: 'Vibecoding is building software by describing what you want, not how to code it. You focus on logic and design while AI handles the syntax.',
                tips: ['You don\'t need to memorize code', 'Focus on what you want to build', 'AI is your pair programmer'],
                codePoints: 10
            },
            {
                id: 'intro-2',
                title: 'The Tools',
                content: 'Main tools: Cursor (AI code editor), Claude/GPT (reasoning), v0.dev (UI generation). These work together to turn ideas into code.',
                tips: ['Cursor is essential - get it free at cursor.com', 'Use Claude for complex logic', 'v0.dev for quick UI prototypes'],
                codePoints: 10
            }
        ]
    },
    {
        id: 'setup',
        title: 'Environment Setup',
        description: 'Get your tools ready',
        duration: '10 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'setup-1',
                title: 'Install Cursor',
                content: 'Download Cursor from cursor.com. It\'s VS Code with built-in AI. Login with your account to get started.',
                tips: ['Use Cmd/Ctrl+L for chat', 'Cmd/Ctrl+K for inline edit', 'Tab to accept suggestions'],
                task: 'Download and install Cursor',
                codePoints: 15
            },
            {
                id: 'setup-2',
                title: 'First Project',
                content: 'Create a new folder. Open it in Cursor. Type Cmd+L and ask: "Create a simple HTML page with a button that says hello".',
                tips: ['Always start in an empty folder', 'Accept the generated files', 'Click the play button to preview'],
                task: 'Create your first AI-generated page',
                codePoints: 20
            }
        ]
    },
    {
        id: 'prompting-101',
        title: 'Prompting Basics',
        description: 'How to talk to AI',
        duration: '15 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'prompt-1',
                title: 'Be Specific',
                content: 'Bad: "Make it look good". Good: "Add rounded corners (16px), dark background (#0a0a0a), white text, 20px padding".',
                tips: ['Include exact values', 'Reference specific files', 'Describe what you see vs what you want'],
                codePoints: 15
            },
            {
                id: 'prompt-2',
                title: 'Context is King',
                content: 'Always tell AI what you\'re building. "I\'m making a todo app. The button should add items to the list and clear the input."',
                tips: ['Start prompts with project context', 'Mention related files', 'Explain the user flow'],
                codePoints: 15
            },
            {
                id: 'prompt-3',
                title: 'Iterate Fast',
                content: 'Don\'t try to get it perfect in one prompt. Say "Now make the button bigger" or "Add a hover effect". Small steps work best.',
                tips: ['One change per prompt', 'Review before accepting', 'Use "undo" liberally'],
                codePoints: 15
            }
        ]
    },
    // === AI TOOLS ===
    {
        id: 'cursor',
        title: 'Cursor Deep Dive',
        description: 'Master the AI editor',
        duration: '20 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'cursor-1',
                title: 'Chat (Cmd+L)',
                content: 'The sidebar chat knows your entire codebase. Ask "Where is the login function?" or "Explain this file". It sees all your code.',
                tips: ['Reference files with @filename', 'Ask for explanations', 'Request code reviews'],
                codePoints: 20
            },
            {
                id: 'cursor-2',
                title: 'Inline Edit (Cmd+K)',
                content: 'Select code from line 5 to 15, hit Cmd+K, type "Add error handling". AI edits just that selection. Super precise.',
                tips: ['Select the exact lines to edit', 'Be specific about changes', 'Review diff before accepting'],
                codePoints: 20
            },
            {
                id: 'cursor-3',
                title: 'Tab Completion',
                content: 'Just start typing and watch. Cursor predicts your next lines. Press Tab to accept, or keep typing to ignore. It learns your style.',
                tips: ['Trust the suggestions', 'Tab Tab Tab is your new habit', 'It gets better over time'],
                codePoints: 15
            },
            {
                id: 'cursor-4',
                title: 'Composer',
                content: 'Cmd+I opens Composer for multi-file changes. "Add a dark mode toggle to settings and update all components". It edits multiple files at once.',
                tips: ['Use for big features', 'Review all changes carefully', 'Accept file by file'],
                codePoints: 25
            }
        ]
    },
    {
        id: 'v0',
        title: 'UI with v0.dev',
        description: 'Generate UIs from text',
        duration: '10 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'v0-1',
                title: 'What is v0?',
                content: 'v0.dev by Vercel generates React components from descriptions. "A pricing page with 3 cards" → production-ready code.',
                tips: ['Be descriptive with layout', 'Mention colors and spacing', 'Export as React code'],
                codePoints: 15
            },
            {
                id: 'v0-2',
                title: 'Iterating in v0',
                content: 'After generating, click parts to refine. "Make this button red" or "Add more padding". Edit until perfect, then copy to Cursor.',
                tips: ['Click to select elements', 'Stack refinements', 'Copy the final code'],
                task: 'Generate a hero section in v0.dev',
                codePoints: 20
            }
        ]
    },
    {
        id: 'asset-gen',
        title: 'AI Asset Generation',
        description: 'Create images and icons',
        duration: '10 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'asset-1',
                title: 'Icons & Illustrations',
                content: 'Use tools like DALL-E, Midjourney, or free alternatives. "Minimal line icon of a rocket, white on transparent, 64px". Save as PNG.',
                tips: ['Specify style clearly', 'Request transparent background', 'Use consistent style across project'],
                codePoints: 15
            },
            {
                id: 'asset-2',
                title: 'Quick Mockups',
                content: 'Need a placeholder image? Generate it. "Modern app dashboard screenshot, dark theme, analytics charts". Use in your designs.',
                tips: ['Generate at target resolution', 'Match your color scheme', 'Replace with real data later'],
                codePoints: 15
            }
        ]
    },
    // === DEVELOPMENT ===
    {
        id: 'git',
        title: 'Git Basics',
        description: 'Track your changes',
        duration: '15 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'git-1',
                title: 'Why Git?',
                content: 'Git saves snapshots of your code. Make a mistake? Go back. Working with others? Merge changes. It\'s like save points in a game.',
                tips: ['Commit after each feature', 'Write clear commit messages', 'Push to GitHub daily'],
                codePoints: 10
            },
            {
                id: 'git-2',
                title: 'Basic Commands',
                content: 'git add . (stage all), git commit -m "message" (save), git push (upload). That\'s 90% of what you need.',
                tips: ['Cursor has built-in Git UI', 'Commit often', 'Push before closing laptop'],
                task: 'Create a GitHub repo and push your code',
                codePoints: 20
            }
        ]
    },
    {
        id: 'vercel',
        title: 'Deploy with Vercel',
        description: 'Go live in minutes',
        duration: '10 min',
        difficulty: 'beginner',
        lessons: [
            {
                id: 'vercel-1',
                title: 'Connect & Deploy',
                content: 'Go to vercel.com, import your GitHub repo, click Deploy. That\'s it. Your site is live with a .vercel.app URL.',
                tips: ['Connect GitHub first', 'Auto-deploys on push', 'Free for hobby projects'],
                task: 'Deploy your project to Vercel',
                codePoints: 25
            },
            {
                id: 'vercel-2',
                title: 'Custom Domains',
                content: 'Buy a domain on Namecheap or Google. In Vercel settings, add it. Update DNS records. Your-name.com is now live.',
                tips: ['Vercel provides free SSL', 'DNS takes 1-48 hours', 'Use .com or .dev'],
                codePoints: 15
            }
        ]
    },
    // === BACKEND ===
    {
        id: 'supabase',
        title: 'Supabase Crash Course',
        description: 'Database and auth',
        duration: '25 min',
        difficulty: 'intermediate',
        lessons: [
            {
                id: 'supa-1',
                title: 'What is Supabase?',
                content: 'Supabase = database + auth + storage in one. Create tables visually, get login for free. Perfect for AI-built apps.',
                tips: ['Start at supabase.com', 'Create a new project', 'Use the Table Editor'],
                codePoints: 15
            },
            {
                id: 'supa-2',
                title: 'Creating Tables',
                content: 'Click "New Table", name it "posts", add columns: id (auto), title (text), content (text), created_at (timestamp). Done.',
                tips: ['Always have an id column', 'Use meaningful names', 'Add created_at for sorting'],
                codePoints: 20
            },
            {
                id: 'supa-3',
                title: 'Auth Setup',
                content: 'Enable Email auth in settings. Supabase handles signup, login, password reset. Just call supabase.auth.signUp().',
                tips: ['Enable email confirmations', 'Customize the emails', 'Add Google OAuth later'],
                codePoints: 25
            },
            {
                id: 'supa-4',
                title: 'Connecting to Code',
                content: 'Install @supabase/supabase-js. Initialize with your URL and anon key. Ask Cursor to "fetch all posts from Supabase".',
                tips: ['Never expose service key', 'Anon key is safe for client', 'Use environment variables'],
                task: 'Connect your app to Supabase',
                codePoints: 30
            }
        ]
    },
    // === PROJECTS ===
    {
        id: 'project-portfolio',
        title: 'Project: Portfolio',
        description: 'Build your personal site',
        duration: '45 min',
        difficulty: 'beginner',
        project: 'portfolio',
        lessons: [
            {
                id: 'proj-port-1',
                title: 'Plan Your Portfolio',
                content: 'Decide: Hero section, About, Projects, Contact. Sketch it on paper or describe it in words. You\'ll prompt Cursor with this.',
                tips: ['Keep it simple', '4-5 sections max', 'Mobile-first mindset'],
                codePoints: 15
            },
            {
                id: 'proj-port-2',
                title: 'Build with AI',
                content: 'Open Cursor, describe your portfolio: "Create a portfolio with hero section (name, tagline), about me, 3 project cards, contact form. Dark theme, modern, minimal."',
                tips: ['Be detailed in first prompt', 'Iterate section by section', 'Add real content after'],
                task: 'Generate your portfolio structure',
                codePoints: 40
            },
            {
                id: 'proj-port-3',
                title: 'Polish & Deploy',
                content: 'Add your real content, photos, links. Ask AI to "improve the hover effects" or "make it more premium". Deploy to Vercel.',
                tips: ['Use real photos', 'Add actual project links', 'Test on mobile'],
                task: 'Deploy your portfolio live',
                codePoints: 50
            }
        ]
    },
    {
        id: 'project-saas',
        title: 'Project: SaaS Landing',
        description: 'Create a product page',
        duration: '60 min',
        difficulty: 'intermediate',
        project: 'saas',
        lessons: [
            {
                id: 'proj-saas-1',
                title: 'Choose Your Product',
                content: 'Pick a simple SaaS idea. Todo app, habit tracker, link shortener. You\'re building the landing page, not the full product.',
                tips: ['Simple ideas work best', 'Focus on the story', 'One clear value proposition'],
                codePoints: 15
            },
            {
                id: 'proj-saas-2',
                title: 'Landing Structure',
                content: 'Hero with CTA, features grid, testimonials (fake is fine), pricing, FAQ, footer. Prompt each section in v0 or Cursor.',
                tips: ['Hero = 80% of conversion', 'Use social proof', 'Clear pricing tiers'],
                codePoints: 30
            },
            {
                id: 'proj-saas-3',
                title: 'Add Interactivity',
                content: 'Make the signup button work. Connect to Supabase auth. Store emails in a waitlist table. Real functionality!',
                tips: ['Start with email collection', 'Validate input', 'Show success message'],
                task: 'Build a working waitlist',
                codePoints: 50
            }
        ]
    }
];

export function getModuleById(id: string): Module | undefined {
    return COURSE_MODULES.find(m => m.id === id);
}

export function getTotalCodePoints(): number {
    return COURSE_MODULES.reduce((total, mod) =>
        total + mod.lessons.reduce((sum, l) => sum + l.codePoints, 0), 0
    );
}
