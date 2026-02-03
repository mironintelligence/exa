import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "@/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trophy, DollarSign, ShoppingBag, Settings } from "lucide-react";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'ADMIN') redirect('/');

    const stats = {
        users: await db.user.count(),
        tournaments: await db.tournament.count(),
        revenue: 45290.50, // Mock
        withdrawals: await db.transaction.count({ where: { type: 'WITHDRAW', status: 'PENDING' } })
    };

    const users = await db.user.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
    const tournaments = await db.tournament.findMany({ include: { game: true } });
    const pendingTxs = await db.transaction.findMany({
        where: { status: 'PENDING' },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase">Admin Panel</h1>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Sistem Kontrol Kulesi • Hoşgeldin, {(session.user as any).name}</p>
                </div>
                <Button variant="outline" className="rounded-none border-blue-600/50 text-blue-500 hover:bg-blue-600/10">Sistem Ayarları</Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Toplam Oyuncu', value: stats.users, icon: Users },
                    { label: 'Aktif Turnuva', value: stats.tournaments, icon: Trophy },
                    { label: 'Toplam Ciro', value: `₺${stats.revenue.toLocaleString()}`, icon: DollarSign },
                    { label: 'Bekleyen Çekim', value: stats.withdrawals, icon: DollarSign, alert: stats.withdrawals > 0 },
                ].map((stat, i) => (
                    <Card key={i} className="bg-zinc-900 border-white/5 rounded-none shadow-xl">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{stat.label}</span>
                                <span className={`text-4xl font-black italic tracking-tighter ${stat.alert ? 'text-red-500' : 'text-white'}`}>{stat.value}</span>
                            </div>
                            <stat.icon className={`w-8 h-8 ${stat.alert ? 'text-red-500' : 'text-blue-600'} opacity-50`} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="users" className="w-full">
                <TabsList className="bg-zinc-900 w-full justify-start rounded-none h-14 border-white/5 p-1 gap-1">
                    <TabsTrigger value="users" className="rounded-none font-bold uppercase tracking-widest text-[10px] h-full px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Kullanıcılar</TabsTrigger>
                    <TabsTrigger value="tournaments" className="rounded-none font-bold uppercase tracking-widest text-[10px] h-full px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Turnuvalar</TabsTrigger>
                    <TabsTrigger value="finance" className="rounded-none font-bold uppercase tracking-widest text-[10px] h-full px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-yellow-500">Finans ( {stats.withdrawals} )</TabsTrigger>
                    <TabsTrigger value="shop" className="rounded-none font-bold uppercase tracking-widest text-[10px] h-full px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Mağaza</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="mt-8">
                    <Card className="bg-zinc-900 border-white/5 rounded-none overflow-hidden">
                        <CardContent className="p-0">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.03] text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4">Kullanıcı</th>
                                        <th className="px-6 py-4">Rol</th>
                                        <th className="px-6 py-4">Bakiye</th>
                                        <th className="px-6 py-4">Rank</th>
                                        <th className="px-6 py-4 text-right">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/[0.01] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold uppercase tracking-tighter">{u.name}</span>
                                                    <span className="text-[10px] text-zinc-500">{u.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className={`rounded-none border-blue-600/50 text-blue-500 text-[10px]`}>{u.role}</Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black italic tracking-tighter text-blue-500">₺{u.walletBalance.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">{u.rank}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase text-zinc-500 hover:text-white">Düzenle</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="finance" className="mt-8">
                    <Card className="bg-zinc-900 border-white/5 rounded-none overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex flex-col gap-4">
                                {pendingTxs.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5">
                                        <div className="flex gap-6 items-center">
                                            <Users className="w-8 h-8 text-zinc-600" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold uppercase tracking-widest">{tx.user.name}</span>
                                                <span className="text-[10px] text-zinc-500 uppercase">Tutar: ₺{tx.amount} • Tarih: {tx.createdAt.toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-none text-[10px] font-bold uppercase">Onayla</Button>
                                            <Button size="sm" variant="destructive" className="rounded-none text-[10px] font-bold uppercase">Reddet</Button>
                                        </div>
                                    </div>
                                ))}
                                {pendingTxs.length === 0 && <div className="h-64 flex items-center justify-center text-zinc-600 font-bold uppercase tracking-widest text-xs">Bekleyen finansal işlem bulunmuyor</div>}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
