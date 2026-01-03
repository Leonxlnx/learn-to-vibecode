# Learn2Vibecode - Course Curriculum

## Course Overview
A comprehensive guide to building software with AI. No videos required - text-based learning with screenshots and interactive exercises. Target completion: 30 hours.

---

## PART 1: FOUNDATIONS (4 Modules)

### Module 1: The Vibecoding Mindset
**What is Vibecoding?**
- Term coined by Andrej Karpathy (ex-Tesla AI Director, OpenAI co-founder)
- "Fully giving in to the vibes, embracing exponentials, and forgetting that the code even exists"
- Shift from **writing code** → **orchestrating AI**
- Focus on **logic and architecture** instead of syntax

**Key Concepts:**
| Term | Definition |
|------|------------|
| **Prompt Engineering** | The art of giving AI clear, specific instructions |
| **Iterative Refinement** | Describe → Generate → Test → Refine loop |
| **Context Window** | How much information AI can "remember" at once |
| **Hallucination** | When AI generates incorrect/made-up information |
| **Token** | Unit of text processing (≈4 characters) |

**The Mindset Shift:**
- Traditional: "How do I write this code?"
- Vibecoding: "How do I describe what I want?"

---

### Module 2: The AI Toolbox
**LLM Chat Models (for reasoning/planning):**
| Tool | Best For | Free Tier |
|------|----------|-----------|
| **ChatGPT (GPT-4o)** | General coding, explanations | ✅ Limited |
| **Claude (Sonnet/Opus)** | Complex reasoning, long context | ✅ Limited |
| **Gemini** | Multimodal (images + code) | ✅ Generous |
| **Deepseek** | Open source, cost-effective | ✅ Yes |
| **Grok** | Real-time info, X integration | ❌ Premium |
| **Qwen** | Chinese focus, open source | ✅ Yes |

**AI-Powered IDEs:**
| Tool | What It Does |
|------|--------------|
| **Cursor** | VS Code fork with AI chat, inline editing, agent mode |
| **Windsurf** | Agentic IDE by Codeium |
| **VSCode + Copilot** | GitHub's AI pair programmer |

**No-Code/Low-Code Builders:**
| Tool | Best For |
|------|----------|
| **Lovable** | Chat-based full-stack apps, fast MVPs |
| **Bolt.new** | Browser-based app builder with IDE |
| **v0** | UI component generation (Vercel) |
| **Base44** | Landing pages, simple apps |

**Backend-as-a-Service:**
| Tool | What It Provides |
|------|------------------|
| **Supabase** | Database, Auth, Storage, Edge Functions |
| **Firebase** | Google's realtime DB + hosting |
| **Planetscale** | Serverless MySQL |

---

### Module 3: Environment Setup
**Recommended Stack:**
```
1. Cursor IDE (free tier)
2. Claude or ChatGPT account
3. Supabase account
4. Vercel/Netlify for hosting
5. GitHub for version control
```

**Setting Up Cursor:**
1. Download from cursor.com
2. Import VS Code settings (optional)
3. Configure AI model (Claude Sonnet recommended)
4. Create `.cursorrules` file for project-specific guidelines

**CLAUDE.md / .cursorrules:**
```markdown
# Project Guidelines
- Use TypeScript for all code
- Prefer Tailwind CSS for styling
- Never use `any` type
- Always add error handling
- Use functional components in React
```

---

### Module 4: Prompt Engineering Fundamentals
**The SCQA Framework:**
- **S**ituation: What's the current state?
- **C**omplication: What's the problem?
- **Q**uestion: What do you need?
- **A**nswer: Expected output format

**Prompt Anatomy:**
```
Role: You are a senior React developer.
Context: I'm building a task manager app with Supabase.
Task: Create a component that displays a list of tasks.
Constraints: Use TypeScript, Tailwind, shadcn/ui.
Format: Export as a named function component.
```

**Key Techniques:**
| Technique | Example |
|-----------|---------|
| **Be Specific** | "Create a login form" → "Create a login form with email/password, validation using zod, error states, and loading indicator" |
| **Provide Examples** | "Format dates like: Jan 5, 2025" |
| **Chain of Thought** | "Think step by step: first analyze, then plan, then code" |
| **Iterate** | "Now make the button larger and add a hover effect" |

---

## PART 2: BUILDING SKILLS (5 Modules)

### Module 5: Frontend Fundamentals
**What You Need to Understand:**
- **HTML**: Structure (divs, headings, buttons)
- **CSS**: Styling (colors, spacing, layout)
- **JavaScript/TypeScript**: Logic, events, state
- **React**: Components, props, hooks

**Tailwind CSS Basics:**
```html
<!-- Instead of writing CSS: -->
<div style="padding: 16px; background: blue; border-radius: 8px;">

<!-- You write: -->
<div class="p-4 bg-blue-500 rounded-lg">
```

**Common Tailwind Classes:**
| Category | Classes |
|----------|---------|
| Spacing | `p-4`, `m-2`, `gap-4`, `px-6` |
| Colors | `bg-red-500`, `text-white`, `border-gray-200` |
| Layout | `flex`, `grid`, `justify-center`, `items-center` |
| Sizing | `w-full`, `h-screen`, `max-w-md` |
| Effects | `shadow-lg`, `rounded-xl`, `opacity-50` |

---

### Module 6: UI/UX Principles for Vibecoding
**Visual Hierarchy:**
- Size: Bigger = More important
- Color: Contrast draws attention
- Spacing: Whitespace creates breathing room
- Position: Top-left gets noticed first

**The 60-30-10 Rule:**
- 60% Dominant color (background)
- 30% Secondary color (content areas)
- 10% Accent color (CTAs, highlights)

**Good Prompts for UI:**
```
"Create a modern landing page with:
- Dark theme (#0a0a0a background)
- Clean typography (Inter or Space Grotesk)
- Subtle glassmorphism on cards
- Red (#ef4444) accent color
- Smooth hover animations
- Mobile-responsive design"
```

**Component Libraries:**
| Library | Use Case |
|---------|----------|
| **shadcn/ui** | Copy-paste components, highly customizable |
| **Radix UI** | Headless, accessible primitives |
| **Framer Motion** | Animations |
| **Lucide** | Icons |

---

### Module 7: Backend Basics
**What AI Handles vs What You Decide:**
| AI Handles | You Decide |
|------------|------------|
| Writing SQL queries | Database schema design |
| Creating API routes | What data to store |
| Auth implementation | User permissions |
| CRUD operations | Business logic |

**Supabase Essentials:**
```typescript
// Connecting to Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Reading data
const { data } = await supabase.from('tasks').select('*');

// Inserting data
await supabase.from('tasks').insert({ title: 'New Task' });

// Updating data
await supabase.from('tasks').update({ done: true }).eq('id', 1);

// Deleting data
await supabase.from('tasks').delete().eq('id', 1);
```

**Row Level Security (RLS):**
- Controls who can read/write data
- Essential for user-specific content
- AI can help write policies

---

### Module 8: Debugging & Problem Solving
**When AI Gets It Wrong:**
1. **Read the error message** - Often contains the solution
2. **Share the full error** - Copy-paste to AI
3. **Provide context** - What were you trying to do?
4. **Ask for explanation** - "Why is this happening?"

**Common Issues:**
| Problem | Likely Cause |
|---------|--------------|
| "Cannot find module" | Missing npm install |
| "undefined is not a function" | Wrong variable name or scope |
| "CORS error" | Backend needs to allow frontend origin |
| "Authentication required" | Missing or expired auth token |

**The Debug Prompt:**
```
I'm getting this error: [PASTE ERROR]

Here's my code: [PASTE CODE]

Expected behavior: [WHAT SHOULD HAPPEN]
Actual behavior: [WHAT'S HAPPENING]

Please help me debug this step by step.
```

---

### Module 9: Deployment Workflow
**From Code to Live:**
1. **Push to GitHub** - Version control
2. **Connect to Vercel/Netlify** - Auto-deploy on push
3. **Set environment variables** - API keys, secrets
4. **Custom domain** - Optional

**Vercel Deployment:**
```bash
1. Push code to GitHub
2. Go to vercel.com → New Project
3. Import repository
4. Configure build settings (usually auto-detected)
5. Add environment variables
6. Deploy!
```

**Environment Variables:**
```env
# .env.local (never commit!)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

---

## PART 3: PROJECTS (3 Modules)

### Module 10: Project 1 - Personal Portfolio
**Goal:** Build a responsive portfolio website
**Skills:** HTML structure, Tailwind styling, animations
**Time:** 2-3 hours

**Steps:**
1. Describe your portfolio to AI
2. Generate sections: Hero, About, Projects, Contact
3. Add animations with Framer Motion
4. Deploy to Vercel

---

### Module 11: Project 2 - Task Manager App
**Goal:** Full-stack CRUD application
**Skills:** React, Supabase, Authentication
**Time:** 4-6 hours

**Features:**
- User registration/login
- Create, read, update, delete tasks
- Mark tasks as complete
- Filter by status

---

### Module 12: Project 3 - Your Dream App
**Goal:** Build the app you described in onboarding
**Skills:** Everything learned + research
**Time:** 8-12 hours

**Process:**
1. Define MVP features
2. Design database schema
3. Build UI with AI assistance
4. Connect to backend
5. Test and iterate
6. Deploy and share

---

## GLOSSARY

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - how different software talks to each other |
| **Backend** | Server-side code, database, business logic |
| **CRUD** | Create, Read, Update, Delete - basic data operations |
| **Component** | Reusable piece of UI (React) |
| **Deploy** | Make your app live on the internet |
| **Frontend** | What users see and interact with |
| **Git** | Version control system |
| **Hook** | React feature for state and side effects |
| **IDE** | Integrated Development Environment (code editor) |
| **MVP** | Minimum Viable Product - simplest working version |
| **npm** | Node Package Manager - install dependencies |
| **Props** | Data passed to React components |
| **Repository** | Project folder tracked by Git |
| **State** | Data that changes over time in a component |
| **TypeScript** | JavaScript with type checking |

---

## LEARNING PATH BY EXPERIENCE

### Beginner (No Code Experience)
1. Module 1-3: Foundations
2. Module 5: Frontend Fundamentals (deep dive)
3. Module 6: UI/UX Principles
4. Project 1: Portfolio

### Intermediate (Some Coding)
1. Module 1-2: Quick intro
2. Module 4: Prompt Engineering
3. Module 7-8: Backend + Debugging
4. Projects 1-2

### Advanced (Developer)
1. Module 1: Mindset shift
2. Module 4: Advanced prompting
3. Project 3: Dream app
4. Focus on speed and iteration
