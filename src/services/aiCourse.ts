// AI Service for course generation
// API key is obfuscated - DO NOT expose in client-side code in production
// This should ideally be in a serverless function

const getApiKey = () => {
    // Obfuscated key (base64 encoded, split for security)
    const parts = ['QUl6YVN5', 'QkNkTEtU', 'dWR3bWFv', 'aXgwSUdZ', 'NW5tamRw', 'RWc1VGhU', 'TWkw'];
    return atob(parts.join(''));
};

interface OnboardingData {
    name: string;
    expGeneral: number;
    expWebdev: number;
    expAppdev: number;
    expGamedev: number;
    vibecodeLevel: number;
    dreamProject: string;
    learningPath: string;
}

interface Module {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    required: boolean;
    order: number;
}

// All available modules
export const ALL_MODULES: Module[] = [
    // Fundamentals
    { id: 'intro', title: 'What is Vibecoding?', description: 'Understanding AI-assisted development', duration: '10 min', difficulty: 'beginner', required: true, order: 1 },
    { id: 'setup', title: 'Environment Setup', description: 'VSCode, Cursor, and essential tools', duration: '15 min', difficulty: 'beginner', required: true, order: 2 },
    { id: 'prompting-101', title: 'Prompting Basics', description: 'How to talk to AI effectively', duration: '20 min', difficulty: 'beginner', required: true, order: 3 },
    { id: 'prompting-advanced', title: 'Advanced Prompting', description: 'Complex instructions and context', duration: '25 min', difficulty: 'intermediate', required: false, order: 4 },

    // Development Basics
    { id: 'html-css', title: 'HTML & CSS Fundamentals', description: 'Web structure and styling basics', duration: '30 min', difficulty: 'beginner', required: false, order: 5 },
    { id: 'javascript', title: 'JavaScript Essentials', description: 'Core programming concepts', duration: '40 min', difficulty: 'beginner', required: false, order: 6 },
    { id: 'react-basics', title: 'React Fundamentals', description: 'Components, state, and props', duration: '45 min', difficulty: 'intermediate', required: false, order: 7 },
    { id: 'react-advanced', title: 'Advanced React', description: 'Hooks, context, and patterns', duration: '40 min', difficulty: 'advanced', required: false, order: 8 },

    // AI Tools
    { id: 'cursor', title: 'Cursor Deep Dive', description: 'Master the AI-powered editor', duration: '25 min', difficulty: 'beginner', required: true, order: 9 },
    { id: 'v0', title: 'UI with v0.dev', description: 'Generate UIs from prompts', duration: '20 min', difficulty: 'beginner', required: false, order: 10 },
    { id: 'claude', title: 'Claude for Coding', description: 'Best practices with Claude', duration: '20 min', difficulty: 'intermediate', required: false, order: 11 },
    { id: 'asset-gen', title: 'AI Asset Generation', description: 'Images, icons, and graphics', duration: '15 min', difficulty: 'beginner', required: false, order: 12 },

    // Backend & Data
    { id: 'git', title: 'Git & Version Control', description: 'Track changes and collaborate', duration: '25 min', difficulty: 'beginner', required: true, order: 13 },
    { id: 'supabase', title: 'Supabase Crash Course', description: 'Database, auth, and storage', duration: '35 min', difficulty: 'intermediate', required: false, order: 14 },
    { id: 'api', title: 'Working with APIs', description: 'Fetch data and integrate services', duration: '30 min', difficulty: 'intermediate', required: false, order: 15 },
    { id: 'auth', title: 'Authentication', description: 'Login systems and security', duration: '25 min', difficulty: 'intermediate', required: false, order: 16 },

    // Deployment & Polish
    { id: 'vercel', title: 'Deploy with Vercel', description: 'Go live in minutes', duration: '15 min', difficulty: 'beginner', required: true, order: 17 },
    { id: 'domains', title: 'Custom Domains', description: 'Professional URLs for your projects', duration: '10 min', difficulty: 'beginner', required: false, order: 18 },
    { id: 'debugging', title: 'AI-Assisted Debugging', description: 'Fix issues efficiently', duration: '20 min', difficulty: 'intermediate', required: false, order: 19 },
    { id: 'performance', title: 'Performance Optimization', description: 'Make your apps fast', duration: '25 min', difficulty: 'advanced', required: false, order: 20 },

    // Projects
    { id: 'project-portfolio', title: 'Build: Portfolio Site', description: 'Your first complete project', duration: '60 min', difficulty: 'beginner', required: false, order: 21 },
    { id: 'project-saas', title: 'Build: SaaS Landing', description: 'Professional landing page', duration: '45 min', difficulty: 'intermediate', required: false, order: 22 },
    { id: 'project-dashboard', title: 'Build: Dashboard App', description: 'Full-stack application', duration: '90 min', difficulty: 'advanced', required: false, order: 23 },
];

// Generate personalized course using AI
export async function generatePersonalizedCourse(data: OnboardingData): Promise<string[]> {
    const avgExp = (data.expGeneral + data.expWebdev + data.expAppdev + data.expGamedev) / 4;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${getApiKey()}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a course curator for Learn2Vibecode, a platform teaching AI-assisted development (vibecoding).

Based on the user's profile, select the most relevant modules for their personalized learning path. Return ONLY a JSON array of module IDs, no explanation.

Available modules: ${ALL_MODULES.map(m => `${m.id}: ${m.title} (${m.difficulty})`).join(', ')}

User profile:
- Name: ${data.name}
- Learning path: ${data.learningPath}
- Coding experience (0-5): ${avgExp.toFixed(1)}
- Vibecoding experience (0-4): ${data.vibecodeLevel}
- Dream project: ${data.dreamProject || 'Not specified'}

Rules:
1. Always include required modules (intro, setup, prompting-101, cursor, git, vercel)
2. Skip beginner modules if avgExp >= 3
3. Include advanced modules only if avgExp >= 3 or vibecodeLevel >= 3
4. Match modules to dream project when possible
5. Return 8-15 modules max
6. Order by learning progression

Return format: ["module-id-1", "module-id-2", ...]`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 500,
                    }
                })
            }
        );

        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Parse JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const moduleIds = JSON.parse(jsonMatch[0]);
            return moduleIds.filter((id: string) => ALL_MODULES.some(m => m.id === id));
        }
    } catch (error) {
        console.error('AI course generation failed, using fallback:', error);
    }

    // Fallback algorithm
    return generateFallbackCourse(data);
}

// Fallback course generation without AI
function generateFallbackCourse(data: OnboardingData): string[] {
    const avgExp = (data.expGeneral + data.expWebdev + data.expAppdev + data.expGamedev) / 4;
    const vibeLvl = data.vibecodeLevel;

    // Always required
    const modules = ['intro', 'setup', 'prompting-101', 'cursor', 'git', 'vercel'];

    // Add based on experience
    if (avgExp < 2) {
        modules.push('html-css', 'javascript');
    }
    if (avgExp < 3) {
        modules.push('react-basics');
    }
    if (avgExp >= 3) {
        modules.push('react-advanced', 'performance');
    }

    // Vibecoding specific
    if (vibeLvl < 2) {
        modules.push('prompting-advanced');
    }
    if (vibeLvl < 3) {
        modules.push('v0', 'claude', 'asset-gen');
    }

    // Backend
    if (data.dreamProject?.toLowerCase().includes('app') || data.dreamProject?.toLowerCase().includes('saas')) {
        modules.push('supabase', 'api', 'auth');
    }

    // Projects based on level
    modules.push('project-portfolio');
    if (avgExp >= 2) modules.push('project-saas');
    if (avgExp >= 3) modules.push('project-dashboard');

    // Sort by module order
    const orderedIds = ALL_MODULES.map(m => m.id);
    return modules.sort((a, b) => orderedIds.indexOf(a) - orderedIds.indexOf(b));
}

export function getModuleById(id: string): Module | undefined {
    return ALL_MODULES.find(m => m.id === id);
}
