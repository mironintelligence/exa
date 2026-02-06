import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Users, Shield, Plus, Zap, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreateTeamDialog from "./CreateTeamDialog";

export default async function TeamsPage() {
    const session = await getServerSession(authOptions);
    const teams = await db.team.findMany({
        include: { _count: { select: { members: true } }, owner: true },
        take: 20
    });

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-20">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Users className="w-10 h-10 text-blue-500" />
                        <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white leading-none">KLANLAR</h1>
                    </div>
                    <p className="text-zinc-500 text-lg font-bold uppercase tracking-tight max-w-xl">
                        Kendi takımını kur veya mevcut bir klanın parçası ol. Birlikte kazan, birlikte bölüş.
                    </p>
                </div>

                <CreateTeamDialog session={session} />
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                {teams.map((team) => (
                    <div key={team.id} className="group flex flex-col bg-zinc-900 border border-white/5 rounded-[56px] p-10 hover:border-blue-500/30 transition-all hover:-translate-y-2 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-600/10 transition-all" />

                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center text-2xl font-black italic text-white shadow-xl">
                                {team.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">{team.name}</h3>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">KURUCU: {team.owner.name}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/5 mb-10">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-zinc-600 uppercase mb-1">ÜYE SAYISI</span>
                                <span className="text-xl font-black italic text-white">{team._count.members} / 5</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-black text-zinc-600 uppercase mb-1">KLAN PUANI</span>
                                <span className="text-xl font-black italic text-blue-500">2,450</span>
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all italic">
                            KATILIM İSTEĞİ GÖNDER
                        </Button>
                    </div>
                ))}

                {teams.length === 0 && (
                    <div className="lg:col-span-3 py-40 flex flex-col items-center justify-center gap-10 border-2 border-dashed border-white/5 rounded-[80px]">
                        <Users className="w-16 h-16 text-zinc-800" />
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-3xl font-black italic uppercase text-white">HENÜZ KLAN KURULMADI</h3>
                            <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em]">İLK ADIMI SEN AT VE ORDUNU TOPLA.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
