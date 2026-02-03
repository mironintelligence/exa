import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, DollarSign, Activity } from "lucide-react";

export default function AdminOverview({ stats, recentUsers }: any) {
    return (
        <div className="flex flex-col gap-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Toplam Kullanıcı", value: stats.users, icon: Users, color: "text-blue-500" },
                    { label: "Aktif Turnuva", value: stats.tournaments, icon: Trophy, color: "text-cyan-400" },
                    { label: "Toplam Ciro", value: `₺${stats.revenue._sum.amount?.toLocaleString() || 0}`, icon: DollarSign, color: "text-green-500" },
                    { label: "Bekleyen Çekim", value: stats.withdrawals, icon: Activity, color: "text-red-500", alert: stats.withdrawals > 0 }
                ].map((stat, i) => (
                    <Card key={i} className="bg-zinc-900 border-white/5 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <CardContent className="p-10 flex items-center justify-between relative z-10">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">{stat.label}</span>
                                <span className={`text-5xl font-black italic tracking-tighter ${stat.alert ? 'animate-pulse text-red-500' : 'text-white'}`}>{stat.value}</span>
                            </div>
                            <stat.icon className={`w-12 h-12 ${stat.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-zinc-900 border-white/5 rounded-[40px] overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <h3 className="text-xl font-black italic uppercase">Son Kayıtlar</h3>
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">SİSTEM GÜNLÜĞÜ</span>
                    </div>
                    <CardContent className="p-0">
                        <table className="w-full text-left">
                            <thead className="text-[10px] font-black uppercase text-zinc-600 border-b border-white/5">
                                <tr>
                                    <th className="p-8">Kullanıcı</th>
                                    <th className="p-8">Rol</th>
                                    <th className="p-8">Bakiye</th>
                                    <th className="p-8">Kayıt Tarihi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentUsers.map((u: any) => (
                                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-8 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center font-black italic text-blue-500 border border-blue-500/20">{u.name?.charAt(0)}</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black uppercase text-white">{u.name}</span>
                                                <span className="text-[10px] font-bold text-zinc-500">{u.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-8"><span className="text-xs font-black italic uppercase text-blue-500">{u.role}</span></td>
                                        <td className="p-8"><span className="text-sm font-black italic text-white tracking-widest">₺{u.walletBalance.toLocaleString()}</span></td>
                                        <td className="p-8 text-[10px] font-bold uppercase text-zinc-600">{u.createdAt.toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-white/5 rounded-[40px] p-10 flex flex-col gap-8 justify-center items-center text-center">
                    <Activity className="w-20 h-20 text-blue-500 animate-pulse" />
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none text-white">AUTONOMOUS<br />SHADOW CORE</h3>
                    <p className="text-xs font-bold uppercase text-zinc-500 leading-loose tracking-widest px-8">Platform AI tarafından optimize ediliyor. Veriler 60 saniyede bir güncellenir.</p>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-2/3 animate-[shimmer_2s_infinite]" />
                    </div>
                </Card>
            </div>
        </div>
    );
}
