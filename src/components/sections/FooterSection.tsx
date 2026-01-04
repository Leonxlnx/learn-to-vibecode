import { Link } from 'react-router-dom';
import { MessageCircle, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Footer Section - Premium animated with VIBECODING liquid text
 */
const FooterSection = () => {
    return (
        <footer className="w-full bg-[#0c0c0c] rounded-t-[3rem] pt-20 pb-12 px-6 relative overflow-hidden mt-[-2rem]">
            {/* Subtle aurora glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Noise - darker */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">

                {/* Brand */}
                <div className="flex flex-col gap-6">
                    <Link to="/" className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
                        <img src="/images/vibecode-logo.png" alt="VibeCode" className="w-10 h-10" />
                        <span className="text-white font-bold text-xl tracking-tight">Learn2Vibecode</span>
                    </Link>
                    <p className="text-white/40 text-sm max-w-xs font-light">
                        The art of building with AI.<br />
                        From idea to product, faster.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-16 text-sm">
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold mb-2">Platform</span>
                        <Link to="/curriculum" className="text-white/50 hover:text-white transition-colors">Curriculum</Link>
                        <Link to="/pricing" className="text-white/50 hover:text-white transition-colors">Pricing</Link>
                        <Link to="/resources" className="text-white/50 hover:text-white transition-colors">Resources</Link>
                        <Link to="/auth" className="text-white/50 hover:text-white transition-colors">Login</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold mb-2">Connect</span>
                        <a
                            href="https://discord.gg/xrCufejEa3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/50 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <MessageCircle size={14} /> Discord
                        </a>
                        <a
                            href="https://x.com/LexnL89916"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/50 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <Twitter size={14} /> Twitter
                        </a>
                        <a
                            href="mailto:leon.lin.privat@gmail.com"
                            className="text-white/50 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <Mail size={14} /> Contact
                        </a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold mb-2">Legal</span>
                        <Link to="/terms" className="text-white/50 hover:text-white transition-colors">Terms</Link>
                        <Link to="/privacy" className="text-white/50 hover:text-white transition-colors">Privacy</Link>
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-8 relative z-10">
                <span className="text-xs text-white/20 font-mono uppercase tracking-widest">© 2026 VibeCode</span>

                {/* Big VIBECODING text with hover effect */}
                <motion.div
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                >
                    <h2 className="text-[8vw] md:text-[6vw] font-black text-transparent tracking-tighter leading-none select-none"
                        style={{
                            WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            transition: 'all 0.5s ease'
                        }}
                    >
                        <motion.span
                            className="inline-block group-hover:text-white/20 transition-all duration-700"
                            whileHover={{
                                textShadow: "0 0 40px rgba(255,36,36,0.3)",
                            }}
                        >
                            VIBECODING
                        </motion.span>
                    </h2>
                </motion.div>
            </div>
        </footer>
    );
};

export default FooterSection;
