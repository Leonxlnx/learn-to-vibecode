import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Key, Sparkles } from 'lucide-react';

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

    // Load API key from localStorage
    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            setApiKey(savedKey);
            setHasKey(true);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const saveApiKey = () => {
        if (apiKey.trim()) {
            localStorage.setItem('gemini_api_key', apiKey.trim());
            setHasKey(true);
        }
    };

    const clearApiKey = () => {
        localStorage.removeItem('gemini_api_key');
        setApiKey('');
        setHasKey(false);
        setMessages([]);
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `You are a helpful AI assistant for Learn2Vibecode, an educational platform teaching vibecoding (AI-assisted development). 
                                        
Context: Vibecoding is the practice of using AI tools like Cursor, Claude, and Copilot to build software faster by focusing on logic and architecture rather than syntax. The platform teaches 12 modules covering everything from basic prompting to deployment.

Keep responses concise, helpful, and encouraging. Use simple language.

User message: ${userMessage}`
                                    }
                                ]
                            }
                        ],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 500,
                        }
                    })
                }
            );

            const data = await response.json();

            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.candidates[0].content.parts[0].text
                }]);
            } else if (data.error) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `Error: ${data.error.message || 'API request failed'}`
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Connection error. Please check your API key and try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20 transition-all z-50"
            >
                <MessageCircle size={24} className="text-white" />
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-[380px] h-[500px] bg-[#0d0d0d] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles size={18} className="text-red-500" />
                                <span className="font-medium text-white">AI Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {!hasKey ? (
                            /* API Key Setup */
                            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                                    <Key size={24} className="text-red-500" />
                                </div>
                                <h3 className="font-medium text-white mb-2">Enter your Gemini API Key</h3>
                                <p className="text-white/40 text-sm mb-6">
                                    Get your free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Google AI Studio</a>
                                </p>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="AIza..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-500/50 mb-4"
                                />
                                <button
                                    onClick={saveApiKey}
                                    disabled={!apiKey.trim()}
                                    className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-colors"
                                >
                                    Save Key
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.length === 0 && (
                                        <div className="text-center text-white/30 text-sm py-8">
                                            Ask anything about vibecoding
                                        </div>
                                    )}
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'user'
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white/5 text-white/80'
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/5 px-4 py-3 rounded-2xl">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-white/5">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-500/50"
                                        />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!input.trim() || isLoading}
                                            className="w-12 h-12 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
                                        >
                                            <Send size={18} className="text-white" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={clearApiKey}
                                        className="w-full mt-2 text-white/30 text-xs hover:text-white/50 transition-colors"
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
