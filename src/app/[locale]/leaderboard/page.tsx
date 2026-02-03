import { db } from "@/lib/db";
import { Trophy, Star, Zap, Crown, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function LeaderboardPage() {
    const topUsers = await db.user.findMany({
        take: 10,
        orderBy: [{ xp: 'desc' }, { level: 'desc' }]
    });

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-20">
            <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
                <Badge className="bg-blue-600 font-black text-[10px] tracking-[0.4em] uppercase py-2 px-6 rounded-full">Sıralama</Badge>
                <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter uppercase text-white leading-none">ARENA LİDERLERİ</h1>
                <p className="text-zinc-500 text-xl font-bold uppercase tracking-tight max-w-2xl leading-relaxed">
                    Sezonun en iyi oyuncuları burada. Yeteneğini kanıtla ve zirveye tırman.
                </p>
            </div>

            <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
                {topUsers.map((user, i) => (
                    <div key={user.id} className={`group flex items-center justify-between p-8 rounded-[40px] border transition-all ${i === 0 ? 'bg-gradient-to-r from-blue-700/20 to-blue-600/5 border-blue-500/30' : 'bg-zinc-900/40 border-white/5 hover:border-white/10'}`}>
                        <div className="flex items-center gap-10">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black italic text-2xl ${i === 0 ? 'bg-blue-600 text-white shadow-3xl' : 'bg-white/5 text-zinc-500'}`}>
                                {i + 1}
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden">
                                    {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl font-black italic text-zinc-800 uppercase">{user.name?.charAt(0)}</div>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-black italic tracking-tighter uppercase text-white leading-none">{user.name}</span>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{user.rankId || 'Unranked'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-20">
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">LEVEL</span>
                                <span className="text-2xl font-black italic text-white tracking-widest">{user.level}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">XP</span>
                                <span className="text-2xl font-black italic text-blue-500 tracking-widest">{user.xp.toLocaleString()}</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-700 group-hover:text-blue-500 transition-colors">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
