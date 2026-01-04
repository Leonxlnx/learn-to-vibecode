import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Key, Trash2, Maximize2, Minimize2, Sparkles } from 'lucide-react';
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
    return `${index + 1}. ${module.title} (${module.duration}, ${totalCoins} VibeCoins)\n   Kapitel: ${chapterTitles}`;
  }).join('\n');

  return `Du bist der AI-Assistent für Learn2Vibecode, eine innovative Lernplattform für "Vibecoding".

🎯 WAS IST VIBECODING?
Vibecoding ist eine neue Art der Software-Entwicklung, bei der du mit AI-Tools wie Google AI Studio, Lovable, Cursor und anderen zusammenarbeitest, um Apps zu bauen - ohne klassisches Programmieren lernen zu müssen. Du beschreibst was du willst, und die AI hilft dir beim Coden.

📚 ÜBER LEARN2VIBECODE:
- Komplette Lernplattform von Grundlagen bis Deployment
- 10 Module mit praxisorientierten Kapiteln
- Gamification durch VibeCoins (Belohnungssystem)
- Interaktiver AI-Assistent (das bist du!)
- Personalisierte Lernpfade basierend auf Erfahrung

💰 VIBECOINS SYSTEM:
- Jedes abgeschlossene Kapitel gibt VibeCoins (20-50 pro Kapitel)
- Motiviert zum Durchhalten und Lernen
- Zeigt Fortschritt visuell an
- Insgesamt ~1000+ VibeCoins zu verdienen

📖 DIE 10 MODULE:
${modulesList}

🛠️ TOOLS DIE GELEHRT WERDEN:
- Google AI Studio (Gemini API, Prompting)
- Lovable (No-Code Web-Apps)
- Cursor (AI-powered Code Editor)
- GitHub (Version Control)
- Supabase (Backend/Datenbank)
- Vercel/Netlify (Deployment)

💡 DEINE ROLLE:
- Sei freundlich, ermutigend und geduldig
- Erkläre Vibecoding-Konzepte einfach
- Hilf bei Fragen zu Modulen und Kapiteln
- Motiviere bei Frustration
- Gib praktische Tipps
- Antworte auf Deutsch wenn der User Deutsch schreibt
- Halte Antworten prägnant aber hilfreich

Wichtig: Du weißt über alle Module, Kapitel und den Kursaufbau Bescheid. Wenn jemand fragt "Was lerne ich in Modul 3?", kannst du genau antworten!`;
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
          { role: 'model', parts: [{ text: 'Verstanden! Ich bin der Learn2Vibecode Assistent und helfe gerne bei allen Fragen zum Vibecoding und der Plattform.' }] },
          ...conversationHistory,
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      });

      const assistantMessage = response.text || 'Entschuldigung, ich konnte keine Antwort generieren.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Fehler bei der Verbindung. Bitte überprüfe deinen API Key.' 
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white shadow-lg flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6" />
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
            className={`${getChatWindowClasses()} bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">AI Assistent</h3>
                  <p className="text-xs text-white/40">Learn2Vibecode</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white"
                    title="Chat löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white"
                  title={isExpanded ? 'Verkleinern (ESC)' : 'Vergrößern'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                  className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!hasKey ? (
              /* API Key Input */
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Key className="w-8 h-8 text-white/30" />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-1">API Key benötigt</h4>
                  <p className="text-sm text-white/40 mb-4">
                    Hol dir deinen kostenlosen Key von{' '}
                    <a 
                      href="https://aistudio.google.com/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveKey()}
                  placeholder="AIza..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
                />
                <button
                  onClick={saveKey}
                  disabled={!apiKey.trim()}
                  className="w-full py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Key speichern
                </button>
              </div>
            ) : (
              /* Chat Interface */
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <Sparkles className="w-10 h-10 text-white/20 mb-4" />
                      <p className="text-white/40 text-sm">
                        Frag mich alles über Vibecoding, die Module oder die Plattform!
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
                <div className="p-4 border-t border-white/5">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      placeholder="Schreib eine Nachricht..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="px-4 py-3 bg-white text-black rounded-xl hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={clearKey}
                    className="mt-3 text-xs text-white/20 hover:text-white/40 transition-colors"
                  >
                    API Key ändern
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
