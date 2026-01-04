// AI Studio Course Content - 10 Modules
// Focus: Google AI Studio Build Tab for vibecoding

export interface Chapter {
    id: string;
    title: string;
    content: string[];
    tips: string[];
    task?: string;
    vibeCoins: number;
}

export interface Module {
    id: string;
    number: number;
    title: string;
    description: string;
    duration: string;
    chapters: Chapter[];
    totalVibeCoins: number;
}

export const COURSE_MODULES: Module[] = [
    // MODULE 1: AI Studio Introduction
    {
        id: 'intro',
        number: 1,
        title: 'Welcome to AI Studio',
        description: 'Your gateway to AI-powered development',
        duration: '15 min',
        totalVibeCoins: 100,
        chapters: [
            {
                id: 'intro-1',
                title: 'What is Google AI Studio?',
                content: [
                    'Google AI Studio is a free web-based platform that lets you build with Gemini, Google\'s most capable AI model.',
                    'Unlike ChatGPT or Claude, AI Studio is specifically designed for developers and creators who want to build real applications.',
                    'The Build tab is where magic happens - you can create interactive AI apps without writing a single line of code.',
                    'Think of it as your AI playground where ideas become reality in minutes, not days.',
                    'Everything you create can be exported as code and integrated into your own projects.',
                ],
                tips: [
                    'AI Studio is 100% free to use with generous daily limits',
                    'No credit card required - just sign in with Google',
                    'Your projects are saved automatically to your account',
                    'You can share your creations with a simple link',
                ],
                vibeCoins: 20
            },
            {
                id: 'intro-2',
                title: 'Getting Started',
                content: [
                    'Go to aistudio.google.com and sign in with your Google account.',
                    'You\'ll see the main dashboard with options: Chat, Build, Library, and more.',
                    'Click on "Build" in the left sidebar - this is your creative workspace.',
                    'The interface is clean and minimal: a prompt area, settings panel, and preview.',
                    'Start with a blank canvas or choose from templates to learn the patterns.',
                ],
                tips: [
                    'Bookmark aistudio.google.com for quick access',
                    'Use Chrome for the best experience',
                    'Explore the template gallery first for inspiration',
                    'Your API key is in the settings - you\'ll need it later',
                ],
                task: 'Sign up and explore the AI Studio interface',
                vibeCoins: 30
            },
            {
                id: 'intro-3',
                title: 'The Build Tab Overview',
                content: [
                    'The Build tab has three main areas: System Instructions, User Input, and Output.',
                    'System Instructions tell the AI how to behave - like giving it a job description.',
                    'User Input is where you or your users will type prompts and questions.',
                    'The Output shows the AI\'s response in real-time as you test.',
                    'On the right, you have model settings: temperature, token limits, and safety settings.',
                ],
                tips: [
                    'Low temperature (0.1-0.3) = more consistent, factual responses',
                    'High temperature (0.7-1.0) = more creative, varied responses',
                    'Start with default settings and adjust based on results',
                    'Use the "Test" button to see how your app responds',
                ],
                vibeCoins: 25
            },
            {
                id: 'intro-4',
                title: 'Your First AI App',
                content: [
                    'Let\'s build a simple app: a code explainer that breaks down any code you paste.',
                    'In System Instructions, write: "You are a friendly coding teacher. When given code, explain it line by line in simple terms. Use analogies for complex concepts."',
                    'Leave User Input empty - this is where users will paste their code.',
                    'Click "Test" and paste some simple code like: const greeting = "Hello World";',
                    'Watch as the AI explains the code clearly and helpfully.',
                ],
                tips: [
                    'Be specific in system instructions - the more detail, the better results',
                    'Test with different types of input to see edge cases',
                    'Save your app with a descriptive name',
                    'Share the link with friends to get feedback',
                ],
                task: 'Build and test your first Code Explainer app',
                vibeCoins: 25
            },
        ]
    },
    // MODULE 2: System Instructions Mastery
    {
        id: 'system-instructions',
        number: 2,
        title: 'System Instructions Mastery',
        description: 'The secret to consistent AI behavior',
        duration: '20 min',
        totalVibeCoins: 120,
        chapters: [
            {
                id: 'sys-1',
                title: 'What Are System Instructions?',
                content: [
                    'System instructions are the foundation of every AI app you build.',
                    'They define the AI\'s personality, knowledge scope, response format, and limitations.',
                    'Think of them as the "DNA" of your AI - they shape everything it does.',
                    'Good system instructions lead to consistent, predictable behavior.',
                    'Bad system instructions lead to unpredictable, off-topic responses.',
                ],
                tips: [
                    'Write system instructions like you\'re briefing a new employee',
                    'Be explicit about what the AI should and shouldn\'t do',
                    'Include examples of ideal responses',
                    'Test extensively and refine based on failures',
                ],
                vibeCoins: 25
            },
            {
                id: 'sys-2',
                title: 'The Anatomy of Great Instructions',
                content: [
                    'Start with ROLE: "You are a [specific role] who specializes in [specific area]."',
                    'Add TASK: "Your job is to [primary action] when the user [trigger]."',
                    'Define TONE: "Communicate in a [adjective] tone. Use [language style]."',
                    'Set CONSTRAINTS: "Never [forbidden action]. Always [required action]."',
                    'Include FORMAT: "Structure your response as [format]. Use [specific elements]."',
                ],
                tips: [
                    'ROLE + TASK + TONE + CONSTRAINTS + FORMAT = reliable AI',
                    'Use bullet points for multiple rules',
                    'Include negative examples: "Don\'t say X, say Y instead"',
                    'Keep instructions under 500 words for best performance',
                ],
                vibeCoins: 30
            },
            {
                id: 'sys-3',
                title: 'Templates for Common Use Cases',
                content: [
                    'CHATBOT: "You are a friendly assistant for [brand]. Answer questions about [topic]. If unsure, say so. Never make up information."',
                    'WRITER: "You are a professional [type] writer. Write in [style]. Always include [elements]. Target audience is [audience]."',
                    'TUTOR: "You are a patient tutor for [subject]. Explain concepts step-by-step. Use analogies. Ask follow-up questions to check understanding."',
                    'ANALYZER: "You are a [type] analyst. When given [input], provide [output format]. Include [specific metrics]."',
                    'GENERATOR: "You are a creative [type] generator. When given [input], create [number] unique [outputs]. Style should be [description]."',
                ],
                tips: [
                    'Save your best templates for reuse',
                    'Combine templates for complex apps',
                    'Customize placeholders for your specific needs',
                    'Test templates with edge cases before deploying',
                ],
                vibeCoins: 30
            },
            {
                id: 'sys-4',
                title: 'Advanced Techniques',
                content: [
                    'CHAIN OF THOUGHT: "Before answering, think step by step. Show your reasoning, then give the final answer."',
                    'FEW-SHOT LEARNING: Include 2-3 example inputs and outputs in your instructions.',
                    'PERSONAS: Give the AI a detailed backstory and personality for more natural responses.',
                    'GUARDRAILS: "If the user asks about [topic], politely redirect to [alternative]."',
                    'DYNAMIC RESPONSES: "Match the length of your response to the complexity of the question."',
                ],
                tips: [
                    'Chain of thought improves accuracy for complex tasks',
                    'Few-shot examples are worth 1000 words of instructions',
                    'Personas work great for customer-facing apps',
                    'Always include guardrails for production apps',
                ],
                task: 'Create system instructions for your own app idea',
                vibeCoins: 35
            },
        ]
    },
    // MODULE 3: Building Interactive Apps
    {
        id: 'interactive-apps',
        number: 3,
        title: 'Building Interactive Apps',
        description: 'From chatbots to generators',
        duration: '25 min',
        totalVibeCoins: 150,
        chapters: [
            {
                id: 'app-1',
                title: 'App Types You Can Build',
                content: [
                    'CHATBOTS: Conversational interfaces for support, education, or entertainment.',
                    'GENERATORS: Create content - stories, code, images descriptions, marketing copy.',
                    'ANALYZERS: Process and extract insights from data, text, or documents.',
                    'TRANSLATORS: Convert between languages, formats, or technical levels.',
                    'ASSISTANTS: Help with specific workflows like coding, writing, or research.',
                ],
                tips: [
                    'Start with a simple chatbot to learn the basics',
                    'Generators are great for creative projects',
                    'Analyzers need clear output formats',
                    'Combine types for powerful hybrid apps',
                ],
                vibeCoins: 25
            },
            {
                id: 'app-2',
                title: 'Build: Smart Chatbot',
                content: [
                    'Let\'s create a customer support chatbot for a fictional coffee shop.',
                    'System Instructions: "You are Barista Bot, the friendly AI assistant for Cloud Coffee. Answer questions about our menu, hours (7am-7pm daily), and locations (Downtown and Airport). Be warm and use coffee puns occasionally. If asked about something unrelated, gently redirect to coffee topics."',
                    'Test with: "What\'s your best drink for a morning meeting?"',
                    'The AI should recommend something AND stay in character.',
                    'Try edge cases: "Can you help me with my taxes?" - it should politely redirect.',
                ],
                tips: [
                    'Include business hours, locations, and key info in instructions',
                    'Add personality with specific word choices or catchphrases',
                    'Test redirects for off-topic questions',
                    'Save variations for A/B testing',
                ],
                task: 'Build a chatbot for your favorite brand or hobby',
                vibeCoins: 35
            },
            {
                id: 'app-3',
                title: 'Build: Content Generator',
                content: [
                    'Now let\'s build a Twitter/X thread generator for tech topics.',
                    'System Instructions: "You are a viral tech content creator. When given a topic, create a 5-tweet thread. Tweet 1: Hook with a bold statement. Tweets 2-4: Key insights with emojis. Tweet 5: Call to action. Each tweet under 280 characters. Use line breaks between tweets."',
                    'Test with: "Create a thread about why everyone should learn vibecoding"',
                    'Check character counts and formatting.',
                    'Refine until the output is share-worthy.',
                ],
                tips: [
                    'Specify exact formats: character limits, structure, elements',
                    'Include examples of good hooks and CTAs',
                    'Test with various topics to ensure consistency',
                    'Add your personal style to make content unique',
                ],
                vibeCoins: 35
            },
            {
                id: 'app-4',
                title: 'Build: Code Assistant',
                content: [
                    'Let\'s create an assistant that helps debug code.',
                    'System Instructions: "You are Debug Buddy, a patient coding assistant. When given code with an error: 1) Identify the bug. 2) Explain why it\'s wrong in simple terms. 3) Show the fixed code. 4) Give a tip to avoid this error in the future. Always be encouraging - debugging is how we learn!"',
                    'Test with buggy code: "const x = 5; x = 10; console.log(x);"',
                    'The AI should identify the const reassignment error.',
                    'Test with different languages and error types.',
                ],
                tips: [
                    'Structure output with numbered steps for clarity',
                    'Include encouragement to reduce debugging frustration',
                    'Test with common beginner mistakes',
                    'Add language detection for multi-language support',
                ],
                task: 'Build a code assistant for your preferred language',
                vibeCoins: 35
            },
            {
                id: 'app-5',
                title: 'Testing and Iteration',
                content: [
                    'Every app needs thorough testing before sharing.',
                    'Test HAPPY PATH: Normal inputs that should work perfectly.',
                    'Test EDGE CASES: Unusual but valid inputs (empty, very long, special characters).',
                    'Test ADVERSARIAL: Inputs that try to break or manipulate the AI.',
                    'Document failures and refine system instructions until robust.',
                ],
                tips: [
                    'Create a test checklist for each app',
                    'Ask friends to try breaking your app',
                    'Add specific handling for common edge cases',
                    'Version your system instructions as you iterate',
                ],
                vibeCoins: 20
            },
        ]
    },
    // MODULE 4: Multimodal Capabilities
    {
        id: 'multimodal',
        number: 4,
        title: 'Multimodal AI',
        description: 'Beyond text: images, audio, and more',
        duration: '20 min',
        totalVibeCoins: 130,
        chapters: [
            {
                id: 'multi-1',
                title: 'What is Multimodal AI?',
                content: [
                    'Multimodal means the AI can understand and work with multiple types of content.',
                    'Gemini can process text, images, audio, video, and code together.',
                    'This opens up possibilities that text-only AI cannot achieve.',
                    'Imagine: upload a screenshot of an error and get a fix. Upload a design and get code.',
                    'AI Studio lets you experiment with all these modalities in the Build tab.',
                ],
                tips: [
                    'Start with image + text combinations - they\'re most practical',
                    'Image analysis is great for UI feedback and bug reports',
                    'Audio features require specific model versions',
                    'Video processing uses more tokens - use short clips',
                ],
                vibeCoins: 25
            },
            {
                id: 'multi-2',
                title: 'Image Understanding',
                content: [
                    'Upload images directly in AI Studio to test image understanding.',
                    'Use cases: analyze screenshots, read documents, describe photos, extract data.',
                    'System instruction example: "When given an image of a website, analyze its design. Comment on: layout, color scheme, typography, and user experience. Rate each from 1-10."',
                    'Test with website screenshots and see detailed feedback.',
                    'The AI can read text in images (OCR) automatically.',
                ],
                tips: [
                    'Higher resolution = better analysis, but more tokens',
                    'Crop images to focus on relevant areas',
                    'Combine with text context for better results',
                    'Use for rapid UI feedback during development',
                ],
                task: 'Build a UI feedback tool that analyzes screenshots',
                vibeCoins: 35
            },
            {
                id: 'multi-3',
                title: 'Document Processing',
                content: [
                    'Upload PDFs, docs, and images of documents for analysis.',
                    'Extract key information, summarize, or convert to structured data.',
                    'Example: "Given a resume image, extract: Name, Email, Skills (as list), Experience (as list), Education. Output as JSON."',
                    'This is incredibly useful for automation workflows.',
                    'Combine with text instructions for specific extraction tasks.',
                ],
                tips: [
                    'Clear, high-contrast documents work best',
                    'Specify exact output format (JSON, markdown, etc.)',
                    'Break long documents into sections for better accuracy',
                    'Use for invoice processing, form extraction, etc.',
                ],
                vibeCoins: 35
            },
            {
                id: 'multi-4',
                title: 'Creative Applications',
                content: [
                    'Use multimodal for creative workflows that weren\'t possible before.',
                    'IMAGE TO CODE: Upload a design mockup, get HTML/CSS. "Convert this design to responsive HTML and Tailwind CSS."',
                    'STYLE TRANSFER: "Describe this image in the style of a nature documentary narrator."',
                    'DIAGRAM TO EXPLANATION: Upload a flowchart or diagram, get a text explanation.',
                    'MEME ANALYSIS: Yes, the AI understands memes and can explain or create captions.',
                ],
                tips: [
                    'For code generation, specify the exact framework you want',
                    'Creative applications benefit from higher temperature',
                    'Combine multiple images for comparison tasks',
                    'Experiment with unusual combinations for unique results',
                ],
                vibeCoins: 35
            },
        ]
    },
    // MODULE 5: Prompt Engineering Deep Dive
    {
        id: 'prompt-engineering',
        number: 5,
        title: 'Prompt Engineering',
        description: 'The art of getting exactly what you want',
        duration: '25 min',
        totalVibeCoins: 140,
        chapters: [
            {
                id: 'prompt-1',
                title: 'Prompting Fundamentals',
                content: [
                    'Prompting is how you communicate with AI - it\'s a skill that can be learned.',
                    'The clearer your prompt, the better your results. Always.',
                    'Bad prompt: "Write something about dogs." - Too vague.',
                    'Good prompt: "Write a 100-word product description for a premium dog food brand. Tone: friendly and trustworthy. Include health benefits and taste appeal."',
                    'The difference is specificity: format, length, tone, content requirements.',
                ],
                tips: [
                    'Always specify length or format when you need specific output',
                    'Include context: who is this for? what\'s the purpose?',
                    'Use examples of what you want to see',
                    'Iterate: first prompt rarely gives perfect results',
                ],
                vibeCoins: 25
            },
            {
                id: 'prompt-2',
                title: 'The CRAFT Framework',
                content: [
                    'C - CONTEXT: Background information the AI needs.',
                    'R - ROLE: Who should the AI pretend to be?',
                    'A - ACTION: What specific task should it perform?',
                    'F - FORMAT: How should the output be structured?',
                    'T - TONE: What style or voice should it use?',
                ],
                tips: [
                    'CRAFT works for any type of prompt',
                    'Not every prompt needs all 5 elements',
                    'Start with Action, add other elements as needed',
                    'Memorize CRAFT and use it automatically',
                ],
                vibeCoins: 30
            },
            {
                id: 'prompt-3',
                title: 'Advanced Techniques',
                content: [
                    'ZERO-SHOT: Just ask for what you want directly. Works for simple tasks.',
                    'FEW-SHOT: Provide 2-3 examples before your actual request. Much more accurate.',
                    'CHAIN-OF-THOUGHT: Ask the AI to "think step by step" before answering. Better for logic.',
                    'SELF-CONSISTENCY: Ask the same question 3 ways, take the most common answer.',
                    'TREE-OF-THOUGHTS: Ask AI to consider multiple approaches before choosing the best.',
                ],
                tips: [
                    'Few-shot is the most generally useful technique',
                    'Chain-of-thought dramatically improves math and logic',
                    'Combine techniques for complex problems',
                    'Document which techniques work for which tasks',
                ],
                task: 'Practice each technique with a real problem',
                vibeCoins: 35
            },
            {
                id: 'prompt-4',
                title: 'Common Pitfalls',
                content: [
                    'VAGUE INSTRUCTIONS: "Make it better" - what does "better" mean? Be specific.',
                    'CONFLICTING REQUIREMENTS: "Be brief AND include all details" - pick one priority.',
                    'ASSUMED KNOWLEDGE: Don\'t assume the AI knows your project context.',
                    'NO FORMAT: Without format guidance, output is unpredictable.',
                    'OVERLOADING: Too many requirements in one prompt leads to some being ignored.',
                ],
                tips: [
                    'Read your prompt as if you know nothing about the project',
                    'Prioritize requirements - what MUST be included?',
                    'Break complex tasks into sequential prompts',
                    'Test with fresh eyes after writing',
                ],
                vibeCoins: 25
            },
            {
                id: 'prompt-5',
                title: 'Prompt Templates Library',
                content: [
                    'BUILD A LIBRARY of reusable prompts for your common tasks.',
                    'CODING: "You are a senior [language] developer. Review this code for: bugs, performance issues, and best practices. Suggest improvements with explanations."',
                    'WRITING: "You are an editor for [publication type]. Edit this text for: clarity, grammar, and engagement. Maintain the author\'s voice."',
                    'LEARNING: "Explain [topic] to me like I\'m [level]. Use analogies and examples. Then quiz me with 3 questions."',
                    'ANALYSIS: "Analyze [subject] considering: [factor 1], [factor 2], [factor 3]. Provide pros, cons, and recommendation."',
                ],
                tips: [
                    'Save your best prompts in a notes app or doc',
                    'Tag prompts by use case for easy retrieval',
                    'Share prompts with your team for consistency',
                    'Evolve templates based on what works',
                ],
                vibeCoins: 25
            },
        ]
    },
    // MODULE 6: Exporting and Integration
    {
        id: 'export-integration',
        number: 6,
        title: 'Export & Integration',
        description: 'Take your apps to production',
        duration: '20 min',
        totalVibeCoins: 120,
        chapters: [
            {
                id: 'export-1',
                title: 'Getting Your API Key',
                content: [
                    'To use your AI apps in real projects, you need an API key.',
                    'In AI Studio, click the gear icon (settings) in the top right.',
                    'Click "Create API Key" and copy it somewhere safe.',
                    'This key authenticates your requests to Gemini.',
                    'Keep it secret! Never commit it to public repositories.',
                ],
                tips: [
                    'Store API keys in environment variables',
                    'Create separate keys for development and production',
                    'Set up billing alerts to monitor usage',
                    'Regenerate keys if you suspect they\'re compromised',
                ],
                task: 'Create and save your API key',
                vibeCoins: 25
            },
            {
                id: 'export-2',
                title: 'Exporting as Code',
                content: [
                    'AI Studio can generate code for your apps in multiple languages.',
                    'Click "Get Code" button in the top right of your app.',
                    'Choose your language: Python, JavaScript, cURL, etc.',
                    'The code includes your system instructions and settings.',
                    'Copy and paste into your project as a starting point.',
                ],
                tips: [
                    'JavaScript code works great with React, Next.js, etc.',
                    'Python code is perfect for backends and scripts',
                    'Modify the generated code to fit your architecture',
                    'The code uses the @google/genai SDK',
                ],
                vibeCoins: 25
            },
            {
                id: 'export-3',
                title: 'Integration Patterns',
                content: [
                    'SERVERLESS FUNCTION: Wrap your AI call in a Vercel, Netlify, or Cloud Function.',
                    'API ENDPOINT: Create an Express/FastAPI endpoint that proxies to Gemini.',
                    'DIRECT CLIENT: For demos, call Gemini directly from the browser (expose key carefully).',
                    'EDGE FUNCTION: For low latency, use Cloudflare Workers or Vercel Edge.',
                    'BACKGROUND JOB: For long tasks, use queues and webhooks.',
                ],
                tips: [
                    'Always use server-side calls in production',
                    'Rate limit your endpoints to prevent abuse',
                    'Cache responses when possible to save costs',
                    'Log all API calls for debugging',
                ],
                vibeCoins: 35
            },
            {
                id: 'export-4',
                title: 'Handling Responses',
                content: [
                    'API responses come as JSON with the text in response.text.',
                    'Always handle errors: rate limits, invalid input, API downtime.',
                    'Parse structured output (JSON, markdown) for easier use.',
                    'Stream responses for better UX - show text as it generates.',
                    'Set timeouts to prevent hanging requests.',
                ],
                tips: [
                    'Use try/catch for all API calls',
                    'Show loading states in your UI',
                    'Implement retry logic with exponential backoff',
                    'Validate AI output before using in your app',
                ],
                vibeCoins: 35
            },
        ]
    },
    // MODULE 7: Building a Complete App
    {
        id: 'complete-app',
        number: 7,
        title: 'Project: Complete App',
        description: 'Build a real AI-powered product',
        duration: '45 min',
        totalVibeCoins: 200,
        chapters: [
            {
                id: 'complete-1',
                title: 'Project Overview',
                content: [
                    'We\'re building "Code Mentor" - an AI that reviews your code and teaches you.',
                    'Features: paste code, get feedback, ask follow-up questions, save history.',
                    'Tech stack: React (Vite), AI Studio for the AI, localStorage for history.',
                    'This is a real app you can deploy and use daily.',
                    'By the end, you\'ll have a portfolio piece and a useful tool.',
                ],
                tips: [
                    'Follow along step by step',
                    'Customize the design to your style',
                    'Add your own features after completing the base',
                    'Deploy it to show in your portfolio',
                ],
                vibeCoins: 20
            },
            {
                id: 'complete-2',
                title: 'Step 1: System Instructions',
                content: [
                    'First, design the AI behavior in AI Studio.',
                    '"You are Code Mentor, a friendly but rigorous code reviewer. When given code: 1) Identify the language. 2) List positive aspects (what\'s done well). 3) List issues (bugs, style, performance). 4) Provide corrected code. 5) Explain key improvements. 6) Give one pro tip for better code. Format with markdown headers. Be encouraging but thorough."',
                    'Test with good code, bad code, and edge cases.',
                    'Refine until responses are consistently helpful.',
                    'Export the code once you\'re satisfied.',
                ],
                tips: [
                    'Start strict and loosen if feedback is too harsh',
                    'Test with multiple programming languages',
                    'Check that formatting is consistent',
                    'Save the final system instructions for reference',
                ],
                task: 'Create and test your Code Mentor system instructions',
                vibeCoins: 40
            },
            {
                id: 'complete-3',
                title: 'Step 2: Build the UI',
                content: [
                    'Create a new Vite project or use your existing setup.',
                    'Design: Dark theme, code input area (textarea or code editor), submit button, response display with markdown rendering.',
                    'Use a code highlighting library like highlight.js or Prism.',
                    'Add a loading spinner for when the AI is thinking.',
                    'Make it responsive for mobile use.',
                ],
                tips: [
                    'Monaco Editor gives a VS Code-like experience',
                    'react-markdown renders markdown beautifully',
                    'Keep the design minimal - focus on functionality',
                    'Add keyboard shortcuts (Cmd+Enter to submit)',
                ],
                vibeCoins: 40
            },
            {
                id: 'complete-4',
                title: 'Step 3: Connect the AI',
                content: [
                    'Install @google/genai: npm install @google/genai',
                    'Create a function that sends code to Gemini and returns the review.',
                    'Handle the API key: store in .env or let users input their own (BYOK).',
                    'Display the response with markdown formatting.',
                    'Add error handling for failed requests.',
                ],
                tips: [
                    'Never hardcode API keys in frontend code',
                    'BYOK is great for demos and personal tools',
                    'Stream responses for better perceived speed',
                    'Log errors for debugging',
                ],
                vibeCoins: 50
            },
            {
                id: 'complete-5',
                title: 'Step 4: Polish and Deploy',
                content: [
                    'Add history: save past reviews to localStorage.',
                    'Add a clear button to start fresh.',
                    'Test thoroughly with various code samples.',
                    'Deploy to Vercel: just push to GitHub and import.',
                    'Share your project and get feedback!',
                ],
                tips: [
                    'LocalStorage is perfect for simple persistence',
                    'Add export functionality to save reviews',
                    'Vercel deployment is one-click from GitHub',
                    'Add this to your portfolio with a case study',
                ],
                task: 'Deploy your Code Mentor app',
                vibeCoins: 50
            },
        ]
    },
    // MODULE 8: Advanced Patterns
    {
        id: 'advanced-patterns',
        number: 8,
        title: 'Advanced Patterns',
        description: 'Pro-level AI development',
        duration: '25 min',
        totalVibeCoins: 140,
        chapters: [
            {
                id: 'adv-1',
                title: 'Chaining AI Calls',
                content: [
                    'Complex tasks often need multiple AI calls in sequence.',
                    'Example flow: Input → Analyze → Generate → Refine → Output.',
                    'Each step can have different system instructions optimized for that task.',
                    'Pass the output of one call as input to the next.',
                    'This creates more reliable, higher-quality results than single mega-prompts.',
                ],
                tips: [
                    'Design the chain on paper before coding',
                    'Each step should have one clear responsibility',
                    'Cache intermediate results to recover from failures',
                    'Log each step for debugging',
                ],
                vibeCoins: 30
            },
            {
                id: 'adv-2',
                title: 'Context Management',
                content: [
                    'Long conversations need context management to stay coherent.',
                    'Options: full history (expensive), summarized history, sliding window.',
                    'Summarized: After N messages, ask AI to summarize the conversation.',
                    'Sliding window: Keep only the last N messages, drop older ones.',
                    'Choose based on your token budget and use case.',
                ],
                tips: [
                    'Monitor token usage in your app',
                    'Summarize when context gets long but memory is needed',
                    'Some conversations don\'t need history - treat each message fresh',
                    'Test with very long conversations to find breaking points',
                ],
                vibeCoins: 30
            },
            {
                id: 'adv-3',
                title: 'Function Calling',
                content: [
                    'Gemini can call functions you define - enabling real actions.',
                    'Define functions with name, description, and parameters.',
                    'The AI decides when to call functions based on user input.',
                    'Example: "get_weather(city)" - when user asks about weather, AI calls it.',
                    'You handle the function execution and return results to the AI.',
                ],
                tips: [
                    'Function descriptions are critical - write them clearly',
                    'Start with 1-2 functions, expand gradually',
                    'Validate all function inputs before executing',
                    'Use for database queries, API calls, calculations',
                ],
                task: 'Implement a simple function call in your app',
                vibeCoins: 40
            },
            {
                id: 'adv-4',
                title: 'Structured Output',
                content: [
                    'Force AI to output JSON or specific formats reliably.',
                    'Use responseSchema in generationConfig to define the structure.',
                    'This guarantees parseable output for your code.',
                    'Example: { name: string, score: number, feedback: string }',
                    'Eliminates regex parsing and handles edge cases automatically.',
                ],
                tips: [
                    'Always use structured output for data extraction',
                    'Define optional fields with nullable: true',
                    'Test edge cases to ensure schema compliance',
                    'Combine with system instructions for best results',
                ],
                vibeCoins: 40
            },
        ]
    },
    // MODULE 9: Production Best Practices
    {
        id: 'production',
        number: 9,
        title: 'Production Ready',
        description: 'Ship with confidence',
        duration: '20 min',
        totalVibeCoins: 120,
        chapters: [
            {
                id: 'prod-1',
                title: 'Security Essentials',
                content: [
                    'NEVER expose API keys in client-side code or public repos.',
                    'Use environment variables for all secrets.',
                    'Implement rate limiting to prevent abuse.',
                    'Validate all user input before sending to AI.',
                    'Monitor for prompt injection attempts.',
                ],
                tips: [
                    'Use .env files and .gitignore properly',
                    'Server-side API calls are always safer',
                    'Set up Vercel/Netlify environment variables for deployment',
                    'Review security regularly as your app grows',
                ],
                vibeCoins: 25
            },
            {
                id: 'prod-2',
                title: 'Error Handling',
                content: [
                    'AI calls can fail: network issues, rate limits, invalid responses.',
                    'Implement retry logic with exponential backoff.',
                    'Show user-friendly error messages, not raw errors.',
                    'Have fallback behavior when AI is unavailable.',
                    'Log errors with enough context to debug later.',
                ],
                tips: [
                    'Retry 2-3 times with increasing delays',
                    'Distinguish between retryable and fatal errors',
                    'User sees: "Having trouble, please try again" not stack traces',
                    'Consider a fallback AI model or cached responses',
                ],
                vibeCoins: 25
            },
            {
                id: 'prod-3',
                title: 'Cost Optimization',
                content: [
                    'AI costs scale with usage - optimize early.',
                    'Cache responses for identical or similar queries.',
                    'Use the smallest model that achieves your quality bar.',
                    'Limit input/output tokens where possible.',
                    'Monitor daily costs and set billing alerts.',
                ],
                tips: [
                    'gemini-2.5-flash is 10x cheaper than gemini-ultra',
                    'Hash inputs to create cache keys',
                    'Truncate very long inputs intelligently',
                    'Free tier is generous - start there',
                ],
                vibeCoins: 35
            },
            {
                id: 'prod-4',
                title: 'Monitoring and Analytics',
                content: [
                    'Track: response times, error rates, user satisfaction.',
                    'Log interesting prompts and responses for improvement.',
                    'A/B test system instruction changes.',
                    'Collect user feedback directly in the app.',
                    'Review logs weekly to find improvement opportunities.',
                ],
                tips: [
                    'Simple analytics: log to Supabase or Google Sheets',
                    'Track prompt → response pairs for fine-tuning later',
                    'User ratings are gold - make feedback easy',
                    'Celebrate improvements with data!',
                ],
                task: 'Add basic logging to your AI app',
                vibeCoins: 35
            },
        ]
    },
    // MODULE 10: What's Next
    {
        id: 'whats-next',
        number: 10,
        title: 'What\'s Next',
        description: 'Keep building and learning',
        duration: '10 min',
        totalVibeCoins: 100,
        chapters: [
            {
                id: 'next-1',
                title: 'Project Ideas',
                content: [
                    'PERSONAL ASSISTANT: Daily planner + email summarizer + task manager.',
                    'STUDY BUDDY: Upload notes, quiz yourself, get explanations.',
                    'CONTENT CREATOR: Blog post generator, social media scheduler, caption writer.',
                    'DEVELOPER TOOLS: Documentation generator, test writer, PR reviewer.',
                    'BUSINESS TOOLS: Customer feedback analyzer, meeting summarizer, report generator.',
                ],
                tips: [
                    'Start with a problem YOU have',
                    'Build in public and share progress',
                    'Launch early, iterate based on feedback',
                    'The best learning is building real things',
                ],
                vibeCoins: 25
            },
            {
                id: 'next-2',
                title: 'Growing Your Skills',
                content: [
                    'PRACTICE DAILY: Even 15 minutes of prompting practice improves skills.',
                    'STUDY OTHERS: Look at how successful AI apps are built.',
                    'COMMUNITY: Join Discord servers, Reddit, Twitter spaces about AI.',
                    'STAY UPDATED: AI moves fast - follow Google AI, OpenAI, Anthropic blogs.',
                    'EXPERIMENT: Try new models, techniques, and combinations.',
                ],
                tips: [
                    'Set a daily prompt practice goal',
                    'Share your experiments on Twitter/X',
                    'Teach others - you learn more by explaining',
                    'Don\'t fear being wrong - iteration is the process',
                ],
                vibeCoins: 25
            },
            {
                id: 'next-3',
                title: 'Resources',
                content: [
                    'Google AI Studio: aistudio.google.com - Your main workspace.',
                    'Gemini Docs: ai.google.dev/docs - Official documentation.',
                    'Prompt Gallery: Look at examples in AI Studio for inspiration.',
                    'Learn2Vibecode: Right here! Join our Discord for help.',
                    'Build in public: Share your journey, get feedback, inspire others.',
                ],
                tips: [
                    'Bookmark the docs - you\'ll reference them often',
                    'Documentation examples are great templates',
                    'Ask questions in Discord - community helps',
                    'You\'re now a vibecoder - keep building!',
                ],
                task: 'Share your first AI app with the community',
                vibeCoins: 50
            },
        ]
    },
];

export function getModuleById(id: string): Module | undefined {
    return COURSE_MODULES.find(m => m.id === id);
}

export function getModuleByNumber(num: number): Module | undefined {
    return COURSE_MODULES.find(m => m.number === num);
}

export function getTotalVibeCoins(): number {
    return COURSE_MODULES.reduce((total, mod) => total + mod.totalVibeCoins, 0);
}
