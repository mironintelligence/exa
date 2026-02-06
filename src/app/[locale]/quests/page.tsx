import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Zap, Clock, Shield, Target, Trophy, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QuestFollowButton from "./QuestFollowButton";

export default async function QuestsPage() {
    const session = await getServerSession(authOptions);
    const quests = await db.quest.findMany({ where: { isActive: true }, include: { game: true } });

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-20">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Target className="w-10 h-10 text-blue-500" />
                        <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white leading-none">OPERASYONLAR</h1>
                    </div>
                    <p className="text-zinc-500 text-lg font-bold uppercase tracking-tight max-w-xl">
                        Günlük ve haftalık görevleri tamamla, XP ve nakit ödülleri topla.
                    </p>
                </div>

                <div className="flex bg-zinc-900 border border-white/5 p-2 rounded-3xl">
                    <button className="px-8 py-4 rounded-2xl bg-blue-600 text-[10px] font-black uppercase text-white shadow-xl">GÜNLÜK</button>
                    <button className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all">HAFTALIK</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {quests.map((quest) => (
                    <div key={quest.id} className="group relative p-10 bg-zinc-900 border border-white/5 rounded-[56px] hover:border-blue-500/30 transition-all flex flex-col sm:flex-row gap-10">
                        <div className="w-full sm:w-40 h-40 bg-zinc-950 rounded-[40px] flex items-center justify-center border border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                            <Star className="w-16 h-16 text-blue-500 opacity-20 group-hover:opacity-40 transition-all" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Badge className="bg-white/5 text-[8px] font-black uppercase text-zinc-400 py-1 px-3 border border-white/5">{quest.game.name}</Badge>
                                    <div className="flex items-center gap-2 text-zinc-600">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase">12H KALDI</span>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white leading-tight group-hover:text-blue-500 transition-colors">{quest.title}</h3>
                                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{quest.description}</p>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase">ÖDÜL</span>
                                        <span className="text-xl font-black italic text-white">₺{quest.rewardAmount}</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/5" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase">PRESTİJ</span>
                                        <span className="text-xl font-black italic text-blue-500">+{quest.rewardXp} XP</span>
                                    </div>
                                </div>
                                <QuestFollowButton questId={quest.id} session={session} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {quests.length === 0 && (
                <div className="py-40 flex flex-col items-center justify-center gap-10 border-2 border-dashed border-white/5 rounded-[80px]">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-zinc-800">
                        <Target className="w-12 h-12" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-3xl font-black italic uppercase text-white">AKTİF GÖREV YOK</h3>
                        <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em]">HAREKAT MERKEZİ GÖREV HAZIRLIYOR.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
