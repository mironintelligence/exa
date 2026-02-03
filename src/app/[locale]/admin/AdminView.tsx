"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createGame, createTournament, processWithdrawal } from "@/actions/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminPage({
    stats,
    users,
    games,
    pendingWithdrawals
}: any) {
    const [newGame, setNewGame] = useState({ name: '', slug: '', image: '' });
    const [newTourney, setNewTourney] = useState({
        title: '', gameId: '', entryFee: 0, prizePool: 0, startDate: '', maxParticipants: 32
    });

    const handleCreateGame = async () => {
        await createGame(newGame);
        alert("Oyun oluşturuldu");
    };

    const handleCreateTournament = async () => {
        await createTournament({
            ...newTourney,
            startDate: new Date(newTourney.startDate),
            entryFee: Number(newTourney.entryFee),
            prizePool: Number(newTourney.prizePool),
            maxParticipants: Number(newTourney.maxParticipants),
            isOfficial: true
        });
        alert("Turnuva oluşturuldu");
    };

    return (
        <div className="container mx-auto px-4 py-20 flex flex-col gap-12">
            <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white">Yönetim Paneli</h1>

            <Tabs defaultValue="withdrawals" className="w-full">
                <TabsList className="bg-zinc-900 border border-white/10 rounded-full h-14 mb-10 p-1">
                    <TabsTrigger value="withdrawals" className="rounded-full font-black uppercase tracking-widest text-[10px] h-full px-10">Çekim Talepleri</TabsTrigger>
                    <TabsTrigger value="tournaments" className="rounded-full font-black uppercase tracking-widest text-[10px] h-full px-10">Turnuva Yönetimi</TabsTrigger>
                    <TabsTrigger value="games" className="rounded-full font-black uppercase tracking-widest text-[10px] h-full px-10">Oyun Havuzu</TabsTrigger>
                </TabsList>

                <TabsContent value="withdrawals">
                    <Card className="bg-zinc-950 border border-white/10 rounded-[32px]">
                        <CardHeader><CardTitle className="text-xs uppercase font-black">Bekleyen Ödemeler</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                {pendingWithdrawals.map((w: any) => (
                                    <div key={w.id} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm font-black italic uppercase">{w.fullName}</span>
                                            <code className="text-[10px] text-blue-500 font-bold">{w.iban}</code>
                                            <span className="text-xl font-black italic text-white">₺{Math.abs(w.amount)}</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <Button onClick={() => processWithdrawal(w.id, 'COMPLETED')} className="bg-green-600 rounded-full font-bold px-8">ONAYLA</Button>
                                            <Button onClick={() => processWithdrawal(w.id, 'REJECTED')} variant="destructive" className="rounded-full font-bold px-8">REDDET</Button>
                                        </div>
                                    </div>
                                ))}
                                {pendingWithdrawals.length === 0 && <p className="text-center py-20 text-zinc-500 font-bold uppercase text-[10px]">Bekleyen talep yok</p>}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tournaments">
                    <Card className="bg-zinc-950 border border-white/10 rounded-[32px] p-10 grid md:grid-cols-2 gap-12">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-2xl font-black italic uppercase">Turnuva Oluştur</h3>
                            <div className="flex flex-col gap-4">
                                <Input placeholder="Turnuva Adı" onChange={(e) => setNewTourney({ ...newTourney, title: e.target.value })} />
                                <select
                                    className="bg-zinc-900 border border-white/10 rounded-xl h-12 px-4 text-sm text-white"
                                    onChange={(e) => setNewTourney({ ...newTourney, gameId: e.target.value })}
                                >
                                    <option value="">Oyun Seç</option>
                                    {games.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
                                </select>
                                <Input type="number" placeholder="Katılım Ücreti" onChange={(e) => setNewTourney({ ...newTourney, entryFee: Number(e.target.value) })} />
                                <Input type="number" placeholder="Ödül Havuzu" onChange={(e) => setNewTourney({ ...newTourney, prizePool: Number(e.target.value) })} />
                                <Input type="datetime-local" onChange={(e) => setNewTourney({ ...newTourney, startDate: e.target.value })} />
                                <Button onClick={handleCreateTournament} className="h-14 bg-blue-600 font-black uppercase rounded-2xl">YAYINLA</Button>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="games">
                    <Card className="bg-zinc-950 border border-white/10 rounded-[32px] p-10">
                        <div className="max-w-md flex flex-col gap-6">
                            <h3 className="text-2xl font-black italic uppercase">Sisteme Oyun Ekle</h3>
                            <div className="flex flex-col gap-4">
                                <Input placeholder="Oyun Adı (örn: PUBG Mobile)" onChange={(e) => setNewGame({ ...newGame, name: e.target.value })} />
                                <Input placeholder="Slug (örn: pubg-mobile)" onChange={(e) => setNewGame({ ...newGame, slug: e.target.value })} />
                                <Input placeholder="Görsel URL" onChange={(e) => setNewGame({ ...newGame, image: e.target.value })} />
                                <Button onClick={handleCreateGame} className="h-14 bg-blue-600 font-black uppercase rounded-2xl">OYUNU KAYDET</Button>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
