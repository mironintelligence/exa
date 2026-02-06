"use client";

import { adminCreateQuest } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Target, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminQuestManager({ quests, games }: any) {
    const router = useRouter();
    const [data, setData] = useState({ title: '', description: '', rewardAmount: 0, rewardXp: 0, gameId: games[0]?.id || '' });

    const handleCreate = async () => {
        await adminCreateQuest(data);
        router.refresh();
        setData({ title: '', description: '', rewardAmount: 0, rewardXp: 0, gameId: games[0]?.id || '' });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-12">
                <h3 className="text-2xl font-black italic uppercase text-white mb-8">Yeni Operasyon Kaydı</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="uppercase text-[10px] font-black text-zinc-500 ml-4">GÖREV BAŞLIĞI</Label>
                        <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="3 MAÇ KAZAN" className="h-14 rounded-2xl bg-zinc-950 border-white/5" />
                    </div>
                    <div className="space-y-2">
                        <Label className="uppercase text-[10px] font-black text-zinc-500 ml-4">OYUN SEÇİMİ</Label>
                        <select value={data.gameId} onChange={(e) => setData({ ...data, gameId: e.target.value })} className="w-full h-14 rounded-2xl bg-zinc-950 border-white/5 px-4 text-xs font-black uppercase text-white outline-none">
                            {games.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label className="uppercase text-[10px] font-black text-zinc-500 ml-4">NAKİT ÖDÜL (₺)</Label>
                        <Input type="number" value={data.rewardAmount} onChange={(e) => setData({ ...data, rewardAmount: Number(e.target.value) })} className="h-14 rounded-2xl bg-zinc-950 border-white/5" />
                    </div>
                    <div className="space-y-2">
                        <Label className="uppercase text-[10px] font-black text-zinc-500 ml-4">XP ÖDÜLÜ</Label>
                        <Input type="number" value={data.rewardXp} onChange={(e) => setData({ ...data, rewardXp: Number(e.target.value) })} className="h-14 rounded-2xl bg-zinc-950 border-white/5" />
                    </div>
                </div>
                <Button onClick={handleCreate} className="mt-10 h-16 w-full rounded-2xl bg-blue-600 text-white font-black uppercase text-xs tracking-widest shadow-xl">
                    GÖREVİ AKTİFLEŞTİR
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {quests.map((q: any) => (
                    <Card key={q.id} className="bg-zinc-900/50 border-white/5 rounded-[32px] p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-black italic uppercase text-white">{q.title}</span>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{q.game.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-black text-blue-500 italic">₺{q.rewardAmount}</span>
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase">+{q.rewardXp} XP</span>
                                </div>
                                <Button variant="outline" className="w-10 h-10 rounded-lg border-white/5 bg-white/5 text-red-500 hover:bg-red-600 hover:text-white transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
