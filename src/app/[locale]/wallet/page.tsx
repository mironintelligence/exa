import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "@/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Send, ShieldCheck, History } from "lucide-react";
import WalletForms from "./WalletForms";

export default async function WalletPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect('/auth/login');

    const user = await db.user.findUnique({
        where: { id: (session.user as any).id },
        include: {
            transactions: { orderBy: { createdAt: 'desc' }, take: 20 }
        }
    });

    if (!user) return null;

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white">CÜZDAN</h1>
                <div className="flex items-center gap-4">
                    <span className="text-zinc-600 text-xs font-black uppercase tracking-[0.4em]">FİNANSAL YÖNETİM MERKEZİ</span>
                    <div className="h-px w-20 bg-blue-600/50" />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                <Card className="bg-gradient-to-br from-blue-700 to-blue-600 border-none rounded-[60px] text-white p-14 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.4)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
                    <CardHeader className="p-0 mb-12 flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">MEVCUT BAKİYE</span>
                            <div className="text-7xl font-black italic tracking-tighter">₺{user.walletBalance.toLocaleString()}</div>
                        </div>
                        <Wallet className="w-12 h-12 opacity-40 group-hover:scale-110 transition-transform" />
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col gap-4">
                        <div className="flex items-center gap-3 py-4 border-t border-white/10">
                            <ShieldCheck className="w-4 h-4 text-blue-200" />
                            <span className="text-[10px] font-black text-blue-100 uppercase tracking-widest">SİSTEM GÜVENCESİNDE</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2">
                    <Card className="bg-zinc-900 border border-white/5 rounded-[60px] h-full overflow-hidden flex flex-col">
                        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <History className="w-6 h-6 text-blue-500" />
                                <h3 className="text-xl font-black italic uppercase">İşlem Geçmişi</h3>
                            </div>
                            <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">SON 20 İŞLEM</span>
                        </div>
                        <CardContent className="p-0 flex-1 overflow-auto max-h-[500px] scrollbar-hide">
                            <div className="flex flex-col">
                                {user.transactions.map((tx) => (
                                    <div key={tx.id} className="p-8 border-b border-white/5 flex items-center justify-between hover:bg-white/[0.01] transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${tx.amount > 0 ? 'bg-green-600/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                                {tx.amount > 0 ? <ArrowUpCircle className="w-6 h-6" /> : <ArrowDownCircle className="w-6 h-6" />}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{tx.type}</span>
                                                <span className="text-lg font-black italic text-white uppercase tracking-tighter mt-1">
                                                    {tx.type === 'TRANSFER' && tx.targetEmail ? `TRANSFER: ${tx.targetEmail}` : tx.type}
                                                </span>
                                                <span className="text-[9px] font-bold text-zinc-600 uppercase mt-1">{tx.createdAt.toLocaleString()} • {tx.status}</span>
                                            </div>
                                        </div>
                                        <span className={`text-3xl font-black italic tracking-tighter ${tx.amount > 0 ? 'text-green-500' : 'text-white'}`}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ₺
                                        </span>
                                    </div>
                                ))}
                                {user.transactions.length === 0 && (
                                    <div className="py-20 text-center text-zinc-700 font-black italic uppercase text-sm">İşlem bulunamadı.</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <WalletForms balance={user.walletBalance} />
        </div>
    );
}
