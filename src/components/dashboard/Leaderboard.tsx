import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Coins, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
    id: string;
    name: string;
    vibe_coins: number;
}

interface LeaderboardProps {
    currentUserId?: string;
}

const Leaderboard = ({ currentUserId }: LeaderboardProps) => {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchLeaderboard = async () => {
        setIsRefreshing(true);
        
        const { data, error } = await supabase
            .from('profiles')
            .select('id, name, vibe_coins')
            .not('name', 'is', null)
            .order('vibe_coins', { ascending: false })
            .limit(50);

        if (!error && data) {
            setEntries(data as LeaderboardEntry[]);
        }
        
        setLastUpdated(new Date());
        setIsLoading(false);
        setIsRefreshing(false);
    };

    useEffect(() => {
        fetchLeaderboard();

        // Auto-refresh every hour
        const interval = setInterval(fetchLeaderboard, 60 * 60 * 1000);
        
        return () => clearInterval(interval);
    }, []);

    const getTimeUntilNextRefresh = () => {
        const nextRefresh = new Date(lastUpdated.getTime() + 60 * 60 * 1000);
        const diff = nextRefresh.getTime() - Date.now();
        const minutes = Math.floor(diff / 60000);
        return `${minutes}m`;
    };

    if (isLoading) {
        return (
            <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-white/5">
                <div className="flex items-center justify-center py-12">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-white/5 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Trophy size={18} className="text-white/60" />
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-white">Leaderboard</h2>
                        <div className="flex items-center gap-2 text-xs text-white/30">
                            <Clock size={12} />
                            <span>Next refresh in {getTimeUntilNextRefresh()}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={fetchLeaderboard}
                    disabled={isRefreshing}
                    className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                </button>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-2">
                {entries.length === 0 ? (
                    <p className="text-white/40 text-center py-8">No users yet</p>
                ) : (
                    entries.map((entry, index) => {
                        const isCurrentUser = entry.id === currentUserId;
                        const rank = index + 1;
                        
                        return (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                                    isCurrentUser 
                                        ? 'bg-white/10 border border-white/20' 
                                        : 'bg-white/5 hover:bg-white/[0.07]'
                                }`}
                            >
                                {/* Rank */}
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                                    rank === 1 ? 'bg-white/20 text-white' :
                                    rank === 2 ? 'bg-white/10 text-white/80' :
                                    rank === 3 ? 'bg-white/10 text-white/60' :
                                    'bg-white/5 text-white/40'
                                }`}>
                                    {rank}
                                </div>

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold">
                                    {entry.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>

                                {/* Name */}
                                <div className="flex-1 min-w-0">
                                    <p className={`font-medium truncate ${isCurrentUser ? 'text-white' : 'text-white/80'}`}>
                                        {entry.name}
                                        {isCurrentUser && <span className="text-white/40 ml-2 text-sm">(You)</span>}
                                    </p>
                                </div>

                                {/* VibeCoins */}
                                <div className="flex items-center gap-2">
                                    <Coins size={14} className="text-white/40" />
                                    <span className="font-bold text-white">{entry.vibe_coins || 0}</span>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Leaderboard;