import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2, Key } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        if (isOpen && hasKey) inputRef.current?.focus();
    }, [isOpen, hasKey]);

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

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        
        const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Using @google/genai SDK with Gemini 2.5 Flash
            const ai = new GoogleGenAI({ apiKey });
            
            // Build conversation context from last 5 messages
            const recentMessages = newMessages.slice(-5);
            const conversationContext = recentMessages
                .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
                .join('\n');
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `You are a helpful AI assistant for Learn2Vibecode, teaching vibecoding (AI-assisted development). Keep responses concise (2-3 sentences), helpful, encouraging.

Conversation history:
${conversationContext}

Respond to the user's latest message.`
            });

            const text = response.text;
            if (text) {
                setMessages(prev => [...prev, { role: 'assistant', content: text }]);
            }
        } catch (error: any) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: error.message || 'Connection failed. Check your API key.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/15 rounded-2xl flex items-center justify-center shadow-lg z-50 border border-white/10"
            >
                <MessageCircle size={22} className="text-white" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-[#0a0a0a] border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Sparkles size={18} className="text-white/50" />
                                <span className="font-medium text-white text-sm">AI Assistant</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {!hasKey ? (
                            /* API Key Setup */
                            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
                                    <Key size={24} className="text-white/30" />
                                </div>
                                <h3 className="font-medium text-white mb-2">Enter your Gemini API Key</h3>
                                <p className="text-white/40 text-sm mb-6">
                                    Free at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-white/60 underline">Google AI Studio</a>
                                </p>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && saveKey()}
                                    placeholder="AIza..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 mb-4"
                                />
                                <button
                                    onClick={saveKey}
                                    disabled={!apiKey.trim()}
                                    className="w-full py-3 bg-white text-black rounded-xl font-medium text-sm disabled:opacity-30"
                                >
                                    Save Key
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {messages.length === 0 && (
                                        <div className="h-full flex flex-col items-center justify-center text-center px-6">
                                            <p className="text-white/30 text-sm">Ask anything about vibecoding</p>
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
                                                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
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
                                                <Loader2 size={16} className="text-white/40 animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-white/5">
                                    <div className="flex gap-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                        />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!input.trim() || isLoading}
                                            className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center disabled:opacity-30"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={clearKey}
                                        className="w-full mt-3 text-white/20 text-xs hover:text-white/40 transition-colors"
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
