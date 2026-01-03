import { useState } from 'react';
import { User, Mail, Zap, Calendar, Check, X, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DashboardSettingsProps {
    profile: {
        name: string;
        email: string;
        learningPath: string;
        createdAt: string;
    };
}

const pathLabels: Record<string, { label: string; color: string; desc: string }> = {
    speedrunner: { label: 'Speedrunner', color: 'text-orange-400', desc: 'Skip basics, straight to building' },
    builder: { label: 'Builder', color: 'text-blue-400', desc: 'Balanced approach with projects' },
    developer: { label: 'Developer', color: 'text-cyan-400', desc: 'Fast-track for experienced devs' },
    beginner: { label: 'Beginner', color: 'text-green-400', desc: 'Full curriculum from scratch' },
    expert: { label: 'Expert', color: 'text-purple-400', desc: 'Advanced techniques only' },
};

const DashboardSettings = ({ profile }: DashboardSettingsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(profile.name);
    const [isSaving, setIsSaving] = useState(false);
    const pathInfo = pathLabels[profile.learningPath] || pathLabels.beginner;

    const handleSave = async () => {
        if (!newName.trim()) return;
        setIsSaving(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { error } = await supabase
                    .from('profiles')
                    .update({ name: newName.trim() })
                    .eq('id', user.id);

                if (error) throw error;
                toast.success('Name updated!');
                setIsEditing(false);
            }
        } catch (error) {
            toast.error('Failed to update name');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Settings</h1>
                <p className="text-white/40">Your profile and preferences</p>
            </div>

            {/* Profile Card */}
            <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-white/5 space-y-6">
                <h2 className="text-lg font-medium text-white">Profile</h2>

                <div className="space-y-4">
                    {/* Name - Editable */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <User size={18} className="text-white/40" />
                            </div>
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Name</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="bg-transparent border-b border-white/20 text-white font-medium focus:outline-none focus:border-white/40 py-1"
                                        autoFocus
                                    />
                                ) : (
                                    <p className="text-white font-medium">{profile.name}</p>
                                )}
                            </div>
                        </div>
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => { setIsEditing(false); setNewName(profile.name); }}
                                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10"
                                >
                                    <X size={14} />
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || !newName.trim()}
                                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black disabled:opacity-50"
                                >
                                    <Check size={14} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10"
                            >
                                <Pencil size={14} />
                            </button>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Mail size={18} className="text-white/40" />
                        </div>
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                            <p className="text-white font-medium">{profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Path */}
            <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-white/5">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Zap size={18} className="text-white/40" />
                    </div>
                    <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Learning Path</p>
                        <p className={`font-medium ${pathInfo.color}`}>{pathInfo.label}</p>
                        <p className="text-white/30 text-sm">{pathInfo.desc}</p>
                    </div>
                </div>
            </div>

            {/* Member Since */}
            <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-white/5">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Calendar size={18} className="text-white/40" />
                    </div>
                    <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Member since</p>
                        <p className="text-white font-medium">{profile.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSettings;
