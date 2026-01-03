import { Link } from 'react-router-dom';
import { MessageCircle, Twitter, Github } from 'lucide-react';

/**
 * Footer Section - Single, clean, rounded corners with real links
 */
const FooterSection = () => {
    return (
        <footer className="w-full bg-[#080808] rounded-t-[3rem] py-16 px-6 relative overflow-hidden mt-[-2rem]">
            {/* Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

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
                        <Link to="/auth" className="text-white/50 hover:text-white transition-colors">Login</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold mb-2">Connect</span>
                        <a
                            href="https://discord.gg/bQW2YtNB6G"
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
                            href="https://github.com/learn2vibecode"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/50 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <Github size={14} /> GitHub
                        </a>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 font-mono uppercase tracking-widest relative z-10">
                <span>© 2026 VibeCode</span>
                <span>Built with AI</span>
            </div>
        </footer>
    );
};

export default FooterSection;
