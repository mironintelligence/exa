import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "@/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminOverview from "./AdminOverview";
import AdminFinance from "./AdminFinance";
import AdminTournamentManager from "./AdminTournamentManager";
import AdminUserList from "./AdminUserList";
import AdminQuestManager from "./AdminQuestManager";
import AdminProductManager from "./AdminProductManager";
import { LayoutDashboard, Users, Trophy, Wallet, Target, ShoppingBag } from "lucide-react";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/');
    }

    const [users, tournaments, transactions, games, quests, products] = await Promise.all([
        db.user.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
        db.tournament.findMany({ include: { game: true }, orderBy: { createdAt: 'desc' } }),
        db.transaction.findMany({ where: { type: 'WITHDRAW', status: 'PENDING' }, include: { user: true } }),
        db.game.findMany(),
        db.quest.findMany({ include: { game: true } }),
        db.product.findMany()
    ]);

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white">KONTROL PANELİ</h1>
                <div className="flex items-center gap-4">
                    <span className="text-blue-500 text-xs font-black uppercase tracking-[0.4em]">EXA COMMAND CENTER — ALPHA V2</span>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-12">
                <TabsList className="bg-zinc-900/50 p-2 rounded-[32px] border border-white/5 h-auto flex flex-wrap gap-2">
                    {[
                        { id: 'overview', label: 'GENEL', icon: LayoutDashboard },
                        { id: 'users', label: 'OYUNCULAR', icon: Users },
                        { id: 'finance', label: 'FİNANSAL', icon: Wallet },
                        { id: 'tournaments', label: 'ARENA', icon: Trophy },
                        { id: 'quests', label: 'OPERASYONLAR', icon: Target },
                        { id: 'shop', label: 'MARKET', icon: ShoppingBag }
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="flex-1 py-4 rounded-2xl data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-500 font-black italic uppercase text-[10px] tracking-widest gap-3 transition-all"
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview">
                    <AdminOverview users={users} tournaments={tournaments} transactions={transactions} />
                </TabsContent>

                <TabsContent value="users">
                    <AdminUserList users={users} />
                </TabsContent>

                <TabsContent value="finance">
                    <AdminFinance transactions={transactions} />
                </TabsContent>

                <TabsContent value="tournaments">
                    <AdminTournamentManager tournaments={tournaments} games={games} />
                </TabsContent>

                <TabsContent value="quests">
                    <AdminQuestManager quests={quests} games={games} />
                </TabsContent>

                <TabsContent value="shop">
                    <AdminProductManager products={products} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
