import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Trophy, DollarSign, Settings, Gamepad2, ShoppingBag } from "lucide-react";
import AdminOverview from "./AdminOverview";
import AdminUserList from "./AdminUserList";
import AdminFinance from "./AdminFinance";
import AdminTournamentManager from "./AdminTournamentManager";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'ADMIN') redirect('/');

    const stats = {
        users: await db.user.count(),
        tournaments: await db.tournament.count({ where: { status: 'OPEN' } }),
        revenue: await db.transaction.aggregate({ _sum: { amount: true }, where: { amount: { gt: 0 } } }),
        withdrawals: await db.transaction.count({ where: { type: 'WITHDRAW', status: 'PENDING' } })
    };

    const recentUsers = await db.user.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
    const pendingTxs = await db.transaction.findMany({
        where: { status: 'PENDING' },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    });
    const games = await db.game.findMany();
    const allTournaments = await db.tournament.findMany({ include: { game: true }, orderBy: { createdAt: 'desc' } });

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-12">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white">YÖNETİM MERKEZİ</h1>
                    <div className="flex items-center gap-4">
                        <Badge className="bg-blue-600 font-black text-[8px] tracking-[0.4em] uppercase py-1 px-4 rounded-full">SİSTEM AKTİF</Badge>
                        <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest leading-none">V2.4.0 • AUTONOMOUS CTL CORE</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-white">ADMİN GİRİŞİ</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase">{session.user.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-zinc-950/20 border border-white/5 rounded-[32px] h-20 p-2 mb-12 gap-2 backdrop-blur-3xl lg:max-w-4xl">
                    {[
                        { id: 'overview', icon: Settings, label: 'PANEL' },
                        { id: 'users', icon: Users, label: 'OYUNCULAR' },
                        { id: 'finance', icon: DollarSign, label: `FİNANS (${stats.withdrawals})` },
                        { id: 'tournaments', icon: Trophy, label: 'TURNUVALAR' },
                        { id: 'content', icon: Gamepad2, label: 'İÇERİK' }
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="rounded-[24px] font-black uppercase tracking-widest text-[10px] h-full px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all flex items-center gap-3"
                        >
                            <tab.icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview">
                    <AdminOverview stats={stats} recentUsers={recentUsers} />
                </TabsContent>

                <TabsContent value="users">
                    <AdminUserList users={recentUsers} />
                </TabsContent>

                <TabsContent value="finance">
                    <AdminFinance pendingTxs={pendingTxs} />
                </TabsContent>

                <TabsContent value="tournaments">
                    <AdminTournamentManager tournaments={allTournaments} games={games} />
                </TabsContent>

                <TabsContent value="content">
                    <div className="grid md:grid-cols-2 gap-10">
                        <Card className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10">
                            <CardHeader className="p-0 mb-8"><CardTitle className="text-xl font-black italic uppercase">Market Envanteri</CardTitle></CardHeader>
                            <CardContent className="p-0 flex flex-col items-center justify-center py-20 gap-4 border-2 border-dashed border-white/5 rounded-3xl">
                                <ShoppingBag className="w-12 h-12 text-zinc-800" />
                                <span className="text-[10px] font-black uppercase text-zinc-600 italic">Ürün logic yakında...</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10">
                            <CardHeader className="p-0 mb-8"><CardTitle className="text-xl font-black italic uppercase">Oyun Havuzu</CardTitle></CardHeader>
                            <CardContent className="p-0 flex flex-col gap-4">
                                {games.map(g => (
                                    <div key={g.id} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                                        <span className="text-sm font-black uppercase tracking-widest text-white">{g.name}</span>
                                        <Badge className="bg-blue-600/10 text-blue-500 font-bold border border-blue-500/20">{g.slug}</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
