import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// All available modules
const ALL_MODULES = [
  { id: 'intro', title: 'What is Vibecoding?', difficulty: 'beginner', required: true, order: 1 },
  { id: 'setup', title: 'Environment Setup', difficulty: 'beginner', required: true, order: 2 },
  { id: 'prompting-101', title: 'Prompting Basics', difficulty: 'beginner', required: true, order: 3 },
  { id: 'prompting-advanced', title: 'Advanced Prompting', difficulty: 'intermediate', required: false, order: 4 },
  { id: 'html-css', title: 'HTML & CSS Fundamentals', difficulty: 'beginner', required: false, order: 5 },
  { id: 'javascript', title: 'JavaScript Essentials', difficulty: 'beginner', required: false, order: 6 },
  { id: 'react-basics', title: 'React Fundamentals', difficulty: 'intermediate', required: false, order: 7 },
  { id: 'react-advanced', title: 'Advanced React', difficulty: 'advanced', required: false, order: 8 },
  { id: 'cursor', title: 'Cursor Deep Dive', difficulty: 'beginner', required: true, order: 9 },
  { id: 'v0', title: 'UI with v0.dev', difficulty: 'beginner', required: false, order: 10 },
  { id: 'claude', title: 'Claude for Coding', difficulty: 'intermediate', required: false, order: 11 },
  { id: 'asset-gen', title: 'AI Asset Generation', difficulty: 'beginner', required: false, order: 12 },
  { id: 'git', title: 'Git & Version Control', difficulty: 'beginner', required: true, order: 13 },
  { id: 'supabase', title: 'Supabase Crash Course', difficulty: 'intermediate', required: false, order: 14 },
  { id: 'api', title: 'Working with APIs', difficulty: 'intermediate', required: false, order: 15 },
  { id: 'auth', title: 'Authentication', difficulty: 'intermediate', required: false, order: 16 },
  { id: 'vercel', title: 'Deploy with Vercel', difficulty: 'beginner', required: true, order: 17 },
  { id: 'domains', title: 'Custom Domains', difficulty: 'beginner', required: false, order: 18 },
  { id: 'debugging', title: 'AI-Assisted Debugging', difficulty: 'intermediate', required: false, order: 19 },
  { id: 'performance', title: 'Performance Optimization', difficulty: 'advanced', required: false, order: 20 },
  { id: 'project-portfolio', title: 'Build: Portfolio Site', difficulty: 'beginner', required: false, order: 21 },
  { id: 'project-saas', title: 'Build: SaaS Landing', difficulty: 'intermediate', required: false, order: 22 },
  { id: 'project-dashboard', title: 'Build: Dashboard App', difficulty: 'advanced', required: false, order: 23 },
];

// Fallback algorithm
function generateFallbackCourse(data: {
  avgExp: number;
  vibecodeLevel: number;
  dreamProject: string;
}): string[] {
  const { avgExp, vibecodeLevel, dreamProject } = data;
  
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
  if (vibecodeLevel < 2) {
    modules.push('prompting-advanced');
  }
  if (vibecodeLevel < 3) {
    modules.push('v0', 'claude', 'asset-gen');
  }

  // Backend
  if (dreamProject?.toLowerCase().includes('app') || dreamProject?.toLowerCase().includes('saas')) {
    modules.push('supabase', 'api', 'auth');
  }

  // Projects based on level
  modules.push('project-portfolio');
  if (avgExp >= 2) modules.push('project-saas');
  if (avgExp >= 3) modules.push('project-dashboard');

  // Sort by module order
  const orderedIds = ALL_MODULES.map(m => m.id);
  return [...new Set(modules)].sort((a, b) => orderedIds.indexOf(a) - orderedIds.indexOf(b));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, expGeneral, expWebdev, expAppdev, expGamedev, vibecodeLevel, dreamProject, learningPath } = await req.json();

    const avgExp = (expGeneral + expWebdev + expAppdev + expGamedev) / 4;

    console.log('Generating course for:', { name, avgExp, vibecodeLevel, dreamProject });

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.log('No API key, using fallback algorithm');
      const modules = generateFallbackCourse({ avgExp, vibecodeLevel, dreamProject });
      return new Response(JSON.stringify({ modules, method: 'fallback' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: 'You are a course curator for Learn2Vibecode. Return ONLY a JSON array of module IDs, no explanation or markdown.'
            },
            {
              role: 'user',
              content: `Select modules for a personalized learning path.

Available modules: ${ALL_MODULES.map(m => `${m.id}: ${m.title} (${m.difficulty})`).join(', ')}

User profile:
- Name: ${name}
- Learning path: ${learningPath}
- Coding experience (0-5): ${avgExp.toFixed(1)}
- Vibecoding experience (0-4): ${vibecodeLevel}
- Dream project: ${dreamProject || 'Not specified'}

Rules:
1. Always include required modules (intro, setup, prompting-101, cursor, git, vercel)
2. Skip beginner modules if avgExp >= 3
3. Include advanced modules only if avgExp >= 3 or vibecodeLevel >= 3
4. Match modules to dream project when possible
5. Return 8-15 modules max
6. Order by learning progression

Return ONLY: ["module-id-1", "module-id-2", ...]`
            }
          ],
          max_tokens: 500,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        console.error('AI API error:', response.status, await response.text());
        throw new Error('AI API failed');
      }

      const result = await response.json();
      const text = result.choices?.[0]?.message?.content || '';

      console.log('AI response:', text);

      // Parse JSON from response
      const jsonMatch = text.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        const moduleIds = JSON.parse(jsonMatch[0]);
        const validModules = moduleIds.filter((id: string) => ALL_MODULES.some(m => m.id === id));
        
        if (validModules.length >= 5) {
          return new Response(JSON.stringify({ modules: validModules, method: 'ai' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      throw new Error('Invalid AI response format');
    } catch (aiError) {
      console.error('AI generation failed, using fallback:', aiError);
      const modules = generateFallbackCourse({ avgExp, vibecodeLevel, dreamProject });
      return new Response(JSON.stringify({ modules, method: 'fallback' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in generate-course function:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
