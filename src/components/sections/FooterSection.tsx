import { motion } from 'framer-motion';

const FooterSection = () => {
    return (
        <footer className="w-full bg-[#000] pt-20 pb-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-2xl font-black text-white mb-6">L2V.</h4>
                        <p className="text-white/30 text-sm leading-relaxed">
                            The new standard for modern software creation. Orchestrate intelligence, don't just write code.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-6">Product</h5>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li className="hover:text-red-500 cursor-pointer transition-colors">Curriculum</li>
                            <li className="hover:text-red-500 cursor-pointer transition-colors">Pricing</li>
                            <li className="hover:text-red-500 cursor-pointer transition-colors">Showcase</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-6">Company</h5>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li className="hover:text-red-500 cursor-pointer transition-colors">About</li>
                            <li className="hover:text-red-500 cursor-pointer transition-colors">Manifesto</li>
                            <li className="hover:text-red-500 cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-6">Socials</h5>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li className="hover:text-white cursor-pointer transition-colors">Twitter / X</li>
                            <li className="hover:text-white cursor-pointer transition-colors">GitHub</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Discord</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <p className="text-white/20 text-xs">© 2026 Learn to Vibecode. All rights reserved.</p>
                    <p className="text-white/20 text-xs font-mono mt-4 md:mt-0">
                        Designed by <span className="text-white">Properly</span>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default FooterSection;
