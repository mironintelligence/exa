import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "@/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Shield, Calendar, Users, Star, Edit, Share2, Medal } from "lucide-react";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect('/auth/login');

    const user = await db.user.findUnique({
        where: { id: (session.user as any).id },
        include: {
            userSubscriptions: { where: { endDate: { gt: new Date() } } },
            transactions: { take: 5, orderBy: { createdAt: 'desc' } }
        }
    });

    if (!user) return null;

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-12">
            {/* Discord Style Profile Header */}
            <div className="relative w-full h-[400px] rounded-[60px] overflow-hidden group">
                {/* Banner */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-zinc-950 to-blue-800">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-zinc-950 to-transparent" />
                </div>

                <div className="absolute inset-0 p-12 flex items-end justify-between">
                    <div className="flex items-end gap-10">
                        <div className="relative space-y-4">
                            <div className="w-48 h-48 rounded-[48px] border-[8px] border-zinc-950 bg-blue-600 relative overflow-hidden shadow-3xl">
                                {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-7xl font-black italic text-white uppercase">{user.name?.charAt(0)}</div>}
                                <div className="absolute inset-0 border-4 border-white/10 rounded-[40px]" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-2xl border-4 border-zinc-950 shadow-xl flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pb-4">
                            <div className="flex items-center gap-4">
                                <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white leading-none">{user.name}</h1>
                                <Badge className="bg-blue-600 font-black text-[10px] tracking-widest px-4 py-1.5 rounded-full uppercase">PRO ELITE</Badge>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-zinc-500 font-black italic uppercase text-sm tracking-widest">{user.rankId} • LEVEL {user.level}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                <span className="text-zinc-500 font-black italic uppercase text-sm tracking-widest">KATILIM: {user.createdAt.toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pb-4">
                        <Button variant="outline" className="w-14 h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <Button className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px]">
                            <Edit className="w-4 h-4 mr-2" /> PROFİLİ DÜZENLE
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-10">
                {/* Stats Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card className="bg-zinc-900 border-white/5 rounded-[48px] p-10 flex flex-col gap-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase text-zinc-600">İSTATİSTİKLER</span>
                            <h3 className="text-xl font-black italic uppercase text-white">ARENA PERFORMANSI</h3>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: 'Oynanan', value: '142', icon: Trophy },
                                { label: 'Kazanılan', value: '48', icon: Medal },
                                { label: 'K/D Oranı', value: '2.4', icon: Zap },
                                { label: 'XP', value: user.xp, icon: Star }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <stat.icon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase text-zinc-500">{stat.label}</span>
                                    </div>
                                    <span className="text-sm font-black italic text-white">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-white/5">
                            <div className="flex justify-between mb-2">
                                <span className="text-[10px] font-black uppercase text-zinc-500">LEVEL PROGRESS</span>
                                <span className="text-[10px] font-black italic text-blue-500">74%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-3/4" />
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-blue-600 border-none rounded-[48px] p-10 text-white flex flex-col gap-6 shadow-3xl">
                        <Shield className="w-10 h-10 opacity-40" />
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl font-black italic uppercase italic">ABONELİK</h4>
                            <span className="text-[10px] font-black uppercase text-blue-200 tracking-widest">
                                {user.userSubscriptions.length > 0 ? 'ELITE AKTİF' : 'STANDART ÜYE'}
                            </span>
                        </div>
                        <Link href="/subscriptions">
                            <Button className="w-full h-12 rounded-xl bg-white text-blue-600 font-black uppercase text-[10px] hover:bg-zinc-200">
                                YÖNET
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Main Content Areas */}
                <div className="lg:col-span-3 flex flex-col gap-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        <Card className="bg-zinc-900 border-white/5 rounded-[48px] p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black italic uppercase">TAKIMIM</h3>
                                <Link href="/teams" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors">KUR VEYA KATIL</Link>
                            </div>
                            <div className="py-20 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/5 rounded-[40px]">
                                <Users className="w-12 h-12 text-zinc-800" />
                                <span className="text-[10px] font-black uppercase text-zinc-600 italic">TAKIM BULUNAMADI</span>
                            </div>
                        </Card>

                        <Card className="bg-zinc-900 border-white/5 rounded-[48px] p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black italic uppercase">BAŞARILAR</h3>
                                <Badge className="bg-white/5 text-zinc-500 uppercase font-black text-[8px] tracking-widest">2 / 48</Badge>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center border-2 ${i < 3 ? 'bg-blue-600/10 border-blue-500/30' : 'bg-transparent border-white/5 opacity-20'}`}>
                                        <Trophy className={`w-6 h-6 ${i < 3 ? 'text-blue-500' : 'text-zinc-800'}`} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <Card className="bg-zinc-900 border-white/5 rounded-[48px] overflow-hidden">
                        <div className="p-10 border-b border-white/5 bg-white/[0.01]">
                            <h3 className="text-xl font-black italic uppercase">OYUN HESAPLARI</h3>
                        </div>
                        <div className="p-10 grid md:grid-cols-2 gap-6">
                            {['Valorant', 'Counter-Strike 2'].map(game => (
                                <div key={game} className="p-6 rounded-3xl bg-zinc-950 border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase text-zinc-600 mb-1">{game} AKTİF</span>
                                        <span className="text-sm font-black italic text-white uppercase tracking-widest">{user.name?.replace(' ', '')}#TR1</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-700 group-hover:text-blue-500 transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function Card({ children, className, p = 0 }: any) {
    return (
        <div className={`bg-zinc-900 border border-white/5 rounded-[48px] ${className}`}>
            {children}
        </div>
    );
}
