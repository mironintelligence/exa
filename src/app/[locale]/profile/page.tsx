import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "@/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect('/auth/login');

    const user = await db.user.findUnique({
        where: { id: (session.user as any).id },
        include: {
            transactions: { orderBy: { createdAt: 'desc' }, take: 5 }
        }
    });

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
            {/* Profile Header */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-blue-600 opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                <div className="absolute bottom-8 left-8 flex items-end gap-8">
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-zinc-950 shadow-2xl">
                        <Image src={user.image || '/images/defaults/avatar.jpg'} alt={user.name!} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase">{user.name}</h1>
                            <Badge className="bg-blue-600 rounded-none">{user.rank}</Badge>
                        </div>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Level {user.level} Pro Gamer</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Stats */}
                <Card className="bg-zinc-900 border-white/5 md:col-span-1 rounded-none">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-widest">Kariyer Özeti</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <div className="flex justify-between items-end border-b border-white/5 pb-4">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Toplam XP</span>
                            <span className="text-xl font-bold italic tracking-tighter text-blue-500">{user.xp.toLocaleString()} XP</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/5 pb-4">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Oynanan Maç</span>
                            <span className="text-xl font-bold italic tracking-tighter">124</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/5 pb-4">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Kazanma Oranı</span>
                            <span className="text-xl font-bold italic tracking-tighter text-green-500">64%</span>
                        </div>
                    </CardContent>
                </Card>

                {/* History */}
                <Card className="bg-zinc-900 border-white/5 md:col-span-2 rounded-none">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-blue-500">Son İşlemler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {user.transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold uppercase tracking-widest">{tx.type}</span>
                                        <span className="text-[10px] text-zinc-500 uppercase">{tx.createdAt.toLocaleDateString()}</span>
                                    </div>
                                    <span className={`text-sm font-black italic ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount} ₺
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
