import { db } from "@/lib/db";
import { Link } from "@/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Clock, AlertCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function TournamentsPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user ? await db.user.findUnique({
        where: { id: (session.user as any).id },
        include: { subscriptions: { where: { endDate: { gt: new Date() } } } }
    }) : null;

    const tournaments = await db.tournament.findMany({
        include: { game: true },
        orderBy: { startDate: 'asc' }
    });

    return (
        <div className="container mx-auto px-4 py-32 flex flex-col gap-16">
            <div className="flex flex-col gap-4">
                <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white">TURNUVALAR</h1>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em]">Meydan Oku, Kazanan Sen Ol</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {tournaments.map((tournament) => {
                    const hasBalance = (user?.walletBalance || 0) >= tournament.entryFee;
                    const hasSub = (user?.subscriptions?.length || 0) > 0;
                    const canJoin = hasBalance || hasSub;

                    return (
                        <div key={tournament.id} className="group relative">
                            <Card className="relative bg-zinc-950 border border-white/5 rounded-[40px] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                                <div className="relative h-56 overflow-hidden">
                                    <Image src={tournament.game.image} alt="" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                                    <div className="absolute top-6 right-6 p-4 rounded-3xl bg-blue-600/90 backdrop-blur-md text-white">
                                        <span className="text-xl font-black italic tracking-tighter">₺{tournament.prizePool.toLocaleString()}</span>
                                    </div>
                                </div>

                                <CardContent className="p-10 flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">{tournament.game.name}</span>
                                        <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-white">{tournament.title}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-zinc-600" />
                                            <span className="text-sm font-bold italic">Max {tournament.maxParticipants}</span>
                                        </div>
                                        <div className="flex items-center gap-3 justify-end">
                                            <Clock className="w-5 h-5 text-zinc-600" />
                                            <span className="text-sm font-bold italic">{tournament.startDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {!session ? (
                                        <Link href="/auth/login" className="w-full"><Button className="w-full h-16 rounded-full bg-zinc-900 border border-white/10 text-white font-black uppercase tracking-widest">GİRİŞ YAP</Button></Link>
                                    ) : canJoin ? (
                                        <Button className="w-full h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest shadow-xl">KATIL (₺{tournament.entryFee})</Button>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                                <AlertCircle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                                                <p className="text-[10px] font-bold text-red-500 uppercase leading-relaxed tracking-widest">Yetersiz Bakiye! Para yatırın veya abone olun.</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link href="/wallet" className="w-full"><Button className="w-full bg-zinc-900 text-white rounded-full font-black uppercase text-[10px] py-4">BAKİYE YÜKLE</Button></Link>
                                                <Link href="/subscriptions" className="w-full"><Button className="w-full bg-blue-600 text-white rounded-full font-black uppercase text-[10px] py-4">ABONE OL</Button></Link>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
