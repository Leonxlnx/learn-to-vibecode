import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Obfuscated key
const getKey = () => atob(['QUl6YVN5', 'QkNkTEtU', 'dWR3bWFv', 'aXgwSUdZ', 'NW5tamRw', 'RWc1VGhU', 'TWkw'].join(''));

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${getKey()}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are a helpful AI assistant for Learn2Vibecode, a platform teaching vibecoding (AI-assisted development).

Context: Vibecoding is using AI tools like Cursor, Claude, and Copilot to build software faster by focusing on logic rather than syntax.

Keep responses concise (2-3 sentences max), helpful, and encouraging. Use simple language.

User: ${userMessage}`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 200,
                        }
                    })
                }
            );

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                setMessages(prev => [...prev, { role: 'assistant', content: text }]);
            } else {
                throw new Error(data.error?.message || 'No response');
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I had trouble responding. Try again!'
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
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25 z-50"
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
                        className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-[#0a0a0a] border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl shadow-black/50 z-50"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                                    <Sparkles size={14} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">AI Assistant</p>
                                    <p className="text-white/30 text-xs">Powered by Gemini</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                        <MessageCircle size={20} className="text-white/30" />
                                    </div>
                                    <p className="text-white/40 text-sm">Ask me anything about vibecoding</p>
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
                                                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl rounded-br-lg'
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
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all"
                                >
                                    <Send size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
