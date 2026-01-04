import { useState } from 'react';
import { User, Mail, Zap, Calendar, Check, X, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface DashboardSettingsProps {
    profile: {
        name: string;
        email: string;
        learningPath: string;
        createdAt: string;
    };
    onProfileUpdate?: () => void;
}

const pathLabels: Record<string, { label: string; color: string; desc: string }> = {
    speedrunner: { label: 'Speedrunner', color: 'text-orange-400', desc: 'Skip basics, straight to building' },
    builder: { label: 'Builder', color: 'text-blue-400', desc: 'Balanced approach with projects' },
    developer: { label: 'Developer', color: 'text-cyan-400', desc: 'Fast-track for experienced devs' },
    beginner: { label: 'Beginner', color: 'text-white/70', desc: 'Full curriculum from scratch' },
    expert: { label: 'Expert', color: 'text-purple-400', desc: 'Advanced techniques only' },
};

const DashboardSettings = ({ profile, onProfileUpdate }: DashboardSettingsProps) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(profile.name);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
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
                toast.success('Name updated');
                setIsEditing(false);
                
                // Trigger profile update in parent
                if (onProfileUpdate) {
                    onProfileUpdate();
                }
                window.dispatchEvent(new Event('progressUpdate'));
            }
        } catch (error) {
            toast.error('Failed to update name');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'DELETE') return;
        setIsDeleting(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user found');

            // Delete profile first (this will cascade or we handle manually)
            const { error: profileError } = await supabase
                .from('profiles')
                .delete()
                .eq('id', user.id);

            if (profileError) throw profileError;

            // Sign out and redirect
            await supabase.auth.signOut();
            toast.success('Account deleted');
            navigate('/');
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete account');
            setIsDeleting(false);
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
                                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
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

            {/* Danger Zone */}
            <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-red-500/20 space-y-4">
                <h2 className="text-lg font-medium text-red-400">Danger Zone</h2>
                
                {!showDeleteConfirm ? (
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    >
                        <Trash2 size={18} />
                        <span>Delete Account</span>
                    </button>
                ) : (
                    <div className="space-y-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-red-400 font-medium mb-1">Are you sure?</p>
                                <p className="text-white/50 text-sm">
                                    This action cannot be undone. All your progress and data will be permanently deleted.
                                </p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-white/40 text-sm mb-2">Type DELETE to confirm:</p>
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                placeholder="DELETE"
                                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}
                                className="flex-1 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirmText !== 'DELETE' || isDeleting}
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Account'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardSettings;