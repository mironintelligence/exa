"use client";

import { adminCreateTournament, adminDeclareWinner } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Plus, Target } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminTournamentManager({ tournaments, games }: any) {
    const router = useRouter();
    const [showAdd, setShowAdd] = useState(false);
    const [formData, setFormData] = useState({
        title: '', gameId: '', entryFee: 0, prizePool: 0, startDate: '', maxParticipants: 32
    });

    const handleCreate = async () => {
        try {
            await adminCreateTournament(formData);
            setShowAdd(false);
            router.refresh();
        } catch (e) {
            alert("Hata oluştu");
        }
    };

    const handleWin = async (tId: string) => {
        const winnerId = prompt("Kazanan Kullanıcı ID giriniz:");
        if (winnerId) {
            await adminDeclareWinner(tId, winnerId);
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col gap-10 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">TURNUVA YÖNETİMİ</h2>
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">Sistem genelindeki tüm operasyonel maçlar</p>
                </div>
                <Button
                    onClick={() => setShowAdd(!showAdd)}
                    className="h-14 px-8 rounded-2xl bg-blue-600 font-black uppercase tracking-widest text-[10px] shadow-xl"
                >
                    {showAdd ? 'İPTAL ET' : '+ YENİ TURNUVA'}
                </Button>
            </div>

            {showAdd && (
                <Card className="bg-zinc-900 border-white/10 rounded-[40px] p-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-8 duration-500">
                    <Input placeholder="TURNUVA BAŞLIĞI" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <select
                        className="h-10 bg-zinc-950 border border-white/10 rounded-md px-3 text-sm"
                        onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                    >
                        <option value="">OYUN SEÇİN</option>
                        {games.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                    <Input type="number" placeholder="KATILIM ÜCRETİ (₺)" onChange={(e) => setFormData({ ...formData, entryFee: Number(e.target.value) })} />
                    <Input type="number" placeholder="ÖDÜL HAVUZU (₺)" onChange={(e) => setFormData({ ...formData, prizePool: Number(e.target.value) })} />
                    <Input type="datetime-local" placeholder="BAŞLANGIÇ TARİHİ" onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                    <Input type="number" placeholder="MAX OYUNCU" onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })} />
                    <Button onClick={handleCreate} className="h-10 bg-blue-600 uppercase font-black">SİSTEME KAYDET</Button>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {tournaments.map((t: any) => (
                    <Card key={t.id} className="bg-zinc-900 border-white/5 rounded-[40px] overflow-hidden group">
                        <CardContent className="p-0 flex flex-col sm:flex-row">
                            <div className="p-10 flex-1 flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{t.game.name}</span>
                                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white leading-none">{t.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-xs font-bold uppercase">{new Date(t.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <Users className="w-3.5 h-3.5" />
                                        <span className="text-xs font-bold uppercase">{t.maxParticipants} SLOT</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 py-6 border-y border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase text-zinc-600">GİRİŞ</span>
                                        <span className="text-xl font-black italic text-zinc-400 uppercase tracking-tighter">₺{t.entryFee}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase text-zinc-600">ÖDÜL</span>
                                        <span className="text-xl font-black italic text-blue-500 uppercase tracking-tighter">₺{t.prizePool}</span>
                                    </div>
                                    <Badge className={`h-fit uppercase font-black text-[8px] tracking-widest ${t.status === 'FINISHED' ? 'bg-zinc-800' : 'bg-blue-600'}`}>
                                        {t.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-10 bg-white/[0.01] border-l border-white/5 flex flex-col items-center justify-center gap-4 min-w-[200px]">
                                {t.status !== 'FINISHED' ? (
                                    <Button
                                        onClick={() => handleWin(t.id)}
                                        className="w-full bg-white text-black hover:bg-white/90 rounded-2xl h-14 font-black uppercase text-[10px] tracking-widest"
                                    >
                                        <Trophy className="w-4 h-4 mr-2" /> KAZANAN SEÇ
                                    </Button>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Target className="w-10 h-10 text-green-500 mb-2" />
                                        <span className="text-[8px] font-black uppercase text-zinc-600">KAZANAN</span>
                                        <span className="text-xs font-black uppercase text-white italic">{t.winnerId ? 'ID: ' + t.winnerId.slice(0, 8) : 'SİSTEM'}</span>
                                    </div>
                                )}
                                <Button variant="ghost" className="w-full h-10 rounded-2xl text-[8px] font-black uppercase text-zinc-600 hover:text-white">DÜZENLE</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
