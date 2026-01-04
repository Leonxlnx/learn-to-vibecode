// AI Service for course generation
// Now uses secure Edge Function via Lovable Cloud

import { supabase } from '@/integrations/supabase/client';

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

// Generate personalized course using secure Edge Function
export async function generatePersonalizedCourse(data: OnboardingData): Promise<string[]> {
    try {
        const { data: result, error } = await supabase.functions.invoke('generate-course', {
            body: {
                name: data.name,
                expGeneral: data.expGeneral,
                expWebdev: data.expWebdev,
                expAppdev: data.expAppdev,
                expGamedev: data.expGamedev,
                vibecodeLevel: data.vibecodeLevel,
                dreamProject: data.dreamProject,
                learningPath: data.learningPath
            }
        });

        if (error) {
            console.error('Edge function error:', error);
            return generateFallbackCourse(data);
        }

        if (result?.modules && result.modules.length >= 5) {
            console.log('Course generated via:', result.method);
            return result.modules;
        }

        return generateFallbackCourse(data);
    } catch (error) {
        console.error('AI course generation failed, using fallback:', error);
        return generateFallbackCourse(data);
    }
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
