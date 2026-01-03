import { Twitter, Github, Linkedin } from 'lucide-react';

const FooterSection = () => {
    return (
        <footer className="w-full py-12 px-6 bg-[#030303] border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="text-center md:text-left">
                    <h4 className="text-white font-bold text-lg mb-1">Learn2Vibecode</h4>
                    <p className="text-white/30 text-sm">© 2026 All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
                    <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={20} /></a>
                    <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin size={20} /></a>
                </div>

                <div className="flex gap-6 text-sm text-white/40">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>

            </div>
        </footer>
    );
};

export default FooterSection;
