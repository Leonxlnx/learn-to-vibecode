import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Key, Trash2, Maximize2, Minimize2, MessageCircle } from 'lucide-react';
import { COURSE_MODULES } from '@/data/courseContent';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Generate website context from course content
const generateWebsiteContext = () => {
  const modulesList = COURSE_MODULES.map((module, index) => {
    const totalCoins = module.totalVibeCoins;
    const chapterTitles = module.chapters.map(ch => ch.title).join(', ');
    return `${index + 1}. ${module.title} (${module.duration}, ${totalCoins} VibeCoins)\n   Chapters: ${chapterTitles}`;
  }).join('\n');

  return `You are the AI Assistant for Learn2Vibecode, an innovative learning platform for "Vibecoding".

🎯 WHAT IS VIBECODING?
Vibecoding is a new way of software development where you collaborate with AI tools like Google AI Studio, Lovable, Cursor and others to build apps - without needing to learn traditional programming. You describe what you want, and AI helps you code.

📚 ABOUT LEARN2VIBECODE:
- Complete learning platform from basics to deployment
- 10 modules with hands-on chapters
- Gamification through VibeCoins (reward system)
- Interactive AI Assistant (that's you!)
- Personalized learning paths based on experience

💰 VIBECOINS SYSTEM:
- Each completed chapter gives VibeCoins (20-50 per chapter)
- Motivates you to keep learning
- Shows progress visually
- Over 1000+ VibeCoins to earn in total

📖 THE 10 MODULES:
${modulesList}

🛠️ TOOLS BEING TAUGHT:
- Google AI Studio (Gemini API, Prompting)
- Lovable (No-Code Web-Apps)
- Cursor (AI-powered Code Editor)
- GitHub (Version Control)
- Supabase (Backend/Database)
- Vercel/Netlify (Deployment)

💡 YOUR ROLE:
- Be friendly, encouraging and patient
- Explain Vibecoding concepts simply
- Help with questions about modules and chapters
- Motivate when frustrated
- Give practical tips
- Match the user's language (respond in their language)
- Keep answers concise but helpful

Important: You know about all modules, chapters and course structure. If someone asks "What will I learn in Module 3?", you can answer precisely!`;
};

const SYSTEM_PROMPT = generateWebsiteContext();

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_user_key');
    if (savedKey) {
      setApiKey(savedKey);
      setHasKey(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && hasKey && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, hasKey]);

  // ESC to close expanded mode
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isExpanded]);

  const saveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_user_key', apiKey.trim());
      setHasKey(true);
    }
  };

  const clearKey = () => {
    localStorage.removeItem('gemini_user_key');
    setApiKey('');
    setHasKey(false);
    setMessages([]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: 'Got it! I am the Learn2Vibecode Assistant and happy to help with any questions about Vibecoding and the platform.' }] },
          ...conversationHistory,
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      });

      const assistantMessage = response.text || 'Sorry, I could not generate a response.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Connection error. Please check your API key.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic sizing based on expanded state
  const getChatWindowClasses = () => {
    if (isExpanded) {
      return 'fixed inset-4 sm:inset-6 md:inset-auto md:right-6 md:top-6 md:bottom-6 md:w-[480px]';
    }
    return 'fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px]';
  };

  return (
    <>
      {/* Backdrop when expanded on mobile */}
      <AnimatePresence>
        {isOpen && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:bg-black/40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 rounded-full bg-white text-black shadow-lg flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`${getChatWindowClasses()} bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm">AI Assistant</h3>
                  <p className="text-[11px] text-white/40">Learn2Vibecode</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                  title={isExpanded ? 'Minimize (ESC)' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!hasKey ? (
              /* API Key Input */
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                  <Key className="w-6 h-6 text-white/30" />
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-white mb-2">API Key Required</h4>
                  <div className="text-sm text-white/50 space-y-1">
                    <p>1. Visit{' '}
                      <a 
                        href="https://aistudio.google.com/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white underline"
                      >
                        Google AI Studio
                      </a>
                    </p>
                    <p>2. Click "Create API Key"</p>
                    <p>3. Copy the long key (starts with AIza...)</p>
                  </div>
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveKey()}
                  placeholder="AIza..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm"
                />
                <button
                  onClick={saveKey}
                  disabled={!apiKey.trim()}
                  className="w-full py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                >
                  Save Key
                </button>
              </div>
            ) : (
              /* Chat Interface */
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <MessageCircle className="w-8 h-8 text-white/20 mb-3" />
                      <p className="text-white/40 text-sm">
                        Ask me anything about Vibecoding, modules, or the platform!
                      </p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-white text-black rounded-2xl rounded-br-lg'
                            : 'bg-white/5 text-white/80 rounded-2xl rounded-bl-lg'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-lg">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-white/5">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="px-3 py-2.5 bg-white text-black rounded-lg hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={clearKey}
                    className="mt-2 text-xs text-white/20 hover:text-white/40 transition-colors"
                  >
                    Change API Key
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
