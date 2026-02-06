import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Shield, Zap, Target, Search } from "lucide-react";
import TournamentJoinButton from "./TournamentJoinButton";

export default async function TournamentsPage() {
    const session = await getServerSession(authOptions);
    const tournaments = await db.tournament.findMany({
        include: { game: true },
        where: { status: { in: ['OPEN', 'LIVE'] } },
        orderBy: { startDate: 'asc' }
    });

    const games = await db.game.findMany({ take: 6 });

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-20">
            {/* Header & Filter */}
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Trophy className="w-10 h-10 text-blue-500" />
                        <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white">ARENA</h1>
                    </div>
                    <p className="text-zinc-500 text-lg font-bold uppercase tracking-tight max-w-xl">
                        Bugünkü turnuvalara göz at, yeteneğini seç ve ödül havuzundan payını al.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 bg-white/5 p-4 rounded-[40px] border border-white/5">
                    {games.map(game => (
                        <button key={game.id} className="px-8 py-4 rounded-full border border-white/5 hover:border-blue-500/50 hover:bg-blue-600/10 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all">
                            {game.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hero Tournament (Featured) */}
            {tournaments.length > 0 && (
                <div className="w-full h-[500px] rounded-[60px] bg-zinc-900 border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700/40 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 z-0">
                        <img src={tournaments[0].game.image} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt="" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-16 z-20 flex items-end justify-between">
                        <div className="flex flex-col gap-6">
                            <Badge className="w-fit bg-red-600 font-black text-[10px] tracking-widest px-6 py-2 rounded-full animate-pulse">ÖNE ÇIKAN</Badge>
                            <h2 className="text-6xl font-black italic tracking-tighter uppercase text-white leading-none">{tournaments[0].title}</h2>
                            <div className="flex items-center gap-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase">ÖDÜL HAVUZU</span>
                                    <span className="text-4xl font-black italic text-blue-500">₺{tournaments[0].prizePool.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase">GİRİŞ ÜCRETİ</span>
                                    <span className="text-4xl font-black italic text-white/50">₺{tournaments[0].entryFee}</span>
                                </div>
                            </div>
                        </div>
                        <TournamentJoinButton tournamentId={tournaments[0].id} session={session} />
                    </div>
                </div>
            )}

            {/* Grid of Tournaments */}
            <div className="grid lg:grid-cols-2 gap-10">
                {tournaments.map((tourney) => (
                    <TournamentCard key={tourney.id} tournament={tourney} session={session} />
                ))}
            </div>

            {tournaments.length === 0 && (
                <div className="py-40 flex flex-col items-center justify-center gap-10 border-2 border-dashed border-white/5 rounded-[80px]">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-zinc-800">
                        <Target className="w-12 h-12" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-3xl font-black italic uppercase text-white">ARENA ŞU AN SAKİN</h3>
                        <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em]">YENİ TURNUVALAR YOLDA. TAKİPTE KAL.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function TournamentCard({ tournament, session }: any) {
    return (
        <div className="group relative bg-zinc-950 border border-white/5 rounded-[56px] p-10 flex flex-col sm:flex-row gap-10 hover:border-blue-500/30 transition-all hover:-translate-y-2 shadow-2xl">
            <div className="relative w-full sm:w-48 h-48 rounded-[40px] overflow-hidden">
                <img src={tournament.game.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/0 transition-colors" />
            </div>

            <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">{tournament.game.name}</span>
                        <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-zinc-500" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">12/32 DOLU</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white leading-tight group-hover:text-blue-400 transition-colors">{tournament.title}</h3>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-zinc-600 uppercase">ÖDÜL</span>
                        <span className="text-2xl font-black italic text-white tracking-widest">₺{tournament.prizePool.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-zinc-600 uppercase">BAŞLAMA</span>
                        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{new Date(tournament.startDate).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <TournamentJoinButton tournamentId={tournament.id} session={session} />
                    <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 text-zinc-500 hover:text-white">
                        <Shield className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
