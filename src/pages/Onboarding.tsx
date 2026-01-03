import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type OnboardingData = {
    name: string;
    email: string;
    ageRange: string;
    expGeneral: number;
    expWebdev: number;
    expAppdev: number;
    expGamedev: number;
    vibecodeLevel: number;
    dreamProject: string;
    learningPath: string;
};

const ageRanges = ['10-19', '20-29', '30-39', '40-49', '50-59', '60+'];

const vibecodeLevels = [
    "No, this is completely new to me",
    "AI helped me with a code snippet",
    "I've built a small project with AI",
    "Yes, I regularly build with AI",
    "I'd call myself an expert"
];

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<OnboardingData>({
        name: '',
        email: '',
        ageRange: '',
        expGeneral: 0,
        expWebdev: 0,
        expAppdev: 0,
        expGamedev: 0,
        vibecodeLevel: 0,
        dreamProject: '',
        learningPath: ''
    });

    useEffect(() => {
        // Get user info from session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session?.user) {
                navigate('/auth');
                return;
            }
            setData(prev => ({
                ...prev,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || ''
            }));
        });
    }, [navigate]);

    const totalSteps = 6;

    const nextStep = () => {
        if (step < totalSteps - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleComplete = async () => {
        // Determine learning path based on experience
        const avgExp = (data.expGeneral + data.expWebdev + data.expAppdev + data.expGamedev) / 4;
        let path = 'beginner';
        if (avgExp >= 3 && data.vibecodeLevel >= 2) path = 'intermediate';
        if (avgExp >= 4 && data.vibecodeLevel >= 3) path = 'advanced';

        const finalData = { ...data, learningPath: path };
        setData(finalData);

        // Save to Supabase (if table exists)
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // For now just navigate, would save to user_profiles table
                console.log('Profile data:', finalData);
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }

        setStep(totalSteps - 1); // Show profile summary
    };

    const slideVariants = {
        enter: { x: 100, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6 py-12">

            {/* Progress Indicator */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-red-500' : i < step ? 'w-4 bg-white/50' : 'w-4 bg-white/10'}`}
                    />
                ))}
            </div>

            <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">

                    {/* Step 0: Welcome */}
                    {step === 0 && (
                        <motion.div
                            key="welcome"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                            >
                                <Sparkles size={32} className="text-red-500" />
                            </motion.div>
                            <h1 className="text-4xl md:text-5xl font-black mb-4">
                                Hey {data.name || 'there'}! 👋
                            </h1>
                            <p className="text-white/50 text-lg mb-12">
                                Welcome to Learn2Vibecode.<br />
                                We have a few questions to personalize your experience.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={nextStep}
                                className="px-10 py-4 bg-white text-black font-bold rounded-full uppercase tracking-wider flex items-center gap-3 mx-auto"
                            >
                                Let's Go <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Step 1: Age Range */}
                    {step === 1 && (
                        <motion.div
                            key="age"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-center"
                        >
                            <h2 className="text-3xl md:text-4xl font-black mb-4">How old are you?</h2>
                            <p className="text-white/40 mb-10">This helps us tailor examples to your generation.</p>

                            <div className="flex flex-wrap justify-center gap-3 mb-12">
                                {ageRanges.map((range) => (
                                    <motion.button
                                        key={range}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setData(prev => ({ ...prev, ageRange: range }))}
                                        className={`px-6 py-3 rounded-full font-bold transition-all ${data.ageRange === range ? 'bg-red-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                                    >
                                        {range}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={nextStep}
                                    disabled={!data.ageRange}
                                    className="px-8 py-3 bg-white text-black font-bold rounded-full disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    Continue <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Programming Experience */}
                    {step === 2 && (
                        <motion.div
                            key="experience"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">Your Experience</h2>
                            <p className="text-white/40 mb-10 text-center">Rate yourself in each area (1 = None, 5 = Expert)</p>

                            <div className="space-y-8 mb-12">
                                {[
                                    { key: 'expGeneral', label: 'General Programming' },
                                    { key: 'expWebdev', label: 'Web Development' },
                                    { key: 'expAppdev', label: 'App Development' },
                                    { key: 'expGamedev', label: 'Game Development' }
                                ].map(({ key, label }) => (
                                    <div key={key}>
                                        <label className="text-white/70 text-sm font-medium mb-3 block">{label}</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <button
                                                    key={level}
                                                    onClick={() => setData(prev => ({ ...prev, [key]: level }))}
                                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${(data as any)[key] === level ? 'bg-red-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={nextStep}
                                    className="px-8 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2"
                                >
                                    Continue <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Vibecoding Level */}
                    {step === 3 && (
                        <motion.div
                            key="vibecode"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">AI Coding Experience</h2>
                            <p className="text-white/40 mb-10 text-center">Have you used AI to help build software?</p>

                            <div className="space-y-3 mb-12">
                                {vibecodeLevels.map((level, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setData(prev => ({ ...prev, vibecodeLevel: i }))}
                                        className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center gap-4 ${data.vibecodeLevel === i ? 'bg-red-500/10 border-2 border-red-500 text-white' : 'bg-white/5 border-2 border-transparent text-white/60 hover:bg-white/10 hover:text-white'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.vibecodeLevel === i ? 'border-red-500 bg-red-500' : 'border-white/30'}`}>
                                            {data.vibecodeLevel === i && <Check size={12} className="text-white" />}
                                        </div>
                                        {level}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={nextStep}
                                    className="px-8 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2"
                                >
                                    Continue <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Dream Project */}
                    {step === 4 && (
                        <motion.div
                            key="dream"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">Your Dream Project</h2>
                            <p className="text-white/40 mb-10 text-center">What do you dream of building?</p>

                            <textarea
                                value={data.dreamProject}
                                onChange={(e) => setData(prev => ({ ...prev, dreamProject: e.target.value }))}
                                placeholder="Describe your dream app or project..."
                                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 resize-none mb-4"
                            />
                            <p className="text-white/30 text-sm mb-12">
                                Examples: A fitness tracking app, A marketplace for artists, A game...
                            </p>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleComplete}
                                    className="px-8 py-3 bg-red-500 text-white font-bold rounded-full flex items-center gap-2"
                                >
                                    Complete <Check size={18} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 5: Profile Summary */}
                    {step === 5 && (
                        <motion.div
                            key="profile"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                            >
                                <Check size={32} className="text-green-500" />
                            </motion.div>

                            <h2 className="text-3xl md:text-4xl font-black mb-8">Your Profile</h2>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-left mb-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/5 pb-3">
                                        <span className="text-white/40">Name</span>
                                        <span className="font-medium">{data.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-3">
                                        <span className="text-white/40">Email</span>
                                        <span className="font-medium">{data.email}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-3">
                                        <span className="text-white/40">Age</span>
                                        <span className="font-medium">{data.ageRange}</span>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-white/40 text-sm mb-3">Experience</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { label: 'General', value: data.expGeneral },
                                                { label: 'Web', value: data.expWebdev },
                                                { label: 'App', value: data.expAppdev },
                                                { label: 'Game', value: data.expGamedev },
                                            ].map(({ label, value }) => (
                                                <div key={label} className="flex items-center gap-2">
                                                    <span className="text-white/40 text-sm">{label}:</span>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((i) => (
                                                            <div key={i} className={`w-2 h-2 rounded-sm ${i <= value ? 'bg-red-500' : 'bg-white/10'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <p className="text-white/40 text-sm mb-1">AI Experience</p>
                                        <p className="font-medium text-sm">{vibecodeLevels[data.vibecodeLevel]}</p>
                                    </div>

                                    {data.dreamProject && (
                                        <div className="pt-4 border-t border-white/5">
                                            <p className="text-white/40 text-sm mb-1">Dream Project</p>
                                            <p className="font-medium text-sm">{data.dreamProject}</p>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-white/5">
                                        <p className="text-white/40 text-sm mb-1">Recommended Path</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${data.learningPath === 'advanced' ? 'bg-purple-500/20 text-purple-400' : data.learningPath === 'intermediate' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {data.learningPath.charAt(0).toUpperCase() + data.learningPath.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/dashboard')}
                                className="px-10 py-4 bg-white text-black font-bold rounded-full uppercase tracking-wider flex items-center gap-3 mx-auto"
                            >
                                Start Learning <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default Onboarding;
