import { db } from "@/lib/db";
import { Link } from "@/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Clock } from "lucide-react";

export default async function TournamentsPage() {
    const tournaments = await db.tournament.findMany({
        include: { game: true },
        orderBy: { startDate: 'asc' }
    });

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-6xl font-black italic tracking-tighter uppercase">Meydan Okumalar</h1>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em]">Tüm aktif ve gelecek turnuvaları burada bulabilirsiniz.</p>
                <div className="h-1 w-32 bg-blue-600" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tournaments.map((tournament) => (
                    <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
                        <Card className="group relative bg-zinc-900 border-white/5 hover:border-blue-600/50 transition-all duration-500 rounded-none overflow-hidden cursor-pointer">
                            <div className="relative h-48">
                                <Image src={tournament.game.image} alt={tournament.game.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                                <Badge className="absolute top-4 right-4 bg-blue-600 rounded-none font-black italic">₺{tournament.prizePool.toLocaleString()}</Badge>
                            </div>
                            <CardContent className="p-8 flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">{tournament.game.name}</span>
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">{tournament.title}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-4 h-4 text-zinc-600" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-zinc-500 font-bold uppercase">Katılımcı</span>
                                            <span className="text-sm font-bold italic">0 / {tournament.maxParticipants}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-right">
                                        <Clock className="w-4 h-4 text-zinc-600 ml-auto" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-zinc-500 font-bold uppercase">Başlangıç</span>
                                            <span className="text-sm font-bold italic">{tournament.startDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mb-1">Katılım Ücreti</span>
                                        <span className="text-xl font-black italic tracking-tighter leading-none">{tournament.entryFee === 0 ? 'ÜCRETSİZ' : `₺${tournament.entryFee}`}</span>
                                    </div>
                                    <div className="p-3 bg-blue-600 text-white rounded-none transition-all group-hover:px-8">
                                        <Trophy className="w-4 h-4" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                {tournaments.length === 0 && (
                    <div className="col-span-full h-96 flex flex-col items-center justify-center border border-dashed border-white/10 text-zinc-600 uppercase font-black italic gap-4">
                        <Trophy className="w-12 h-12 opacity-20" />
                        <span>Henüz planlanmış turnuva bulunmuyor</span>
                    </div>
                )}
            </div>
        </div>
    );
}
