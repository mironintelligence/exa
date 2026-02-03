import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "@/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import WithdrawalForm from "./WithdrawalForm";

export default async function WalletPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect('/auth/login');

    const user = await db.user.findUnique({
        where: { id: (session.user as any).id },
        include: { transactions: { orderBy: { createdAt: 'desc' } } }
    });

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-32 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white">Cüzdan</h1>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em]">Varlıklarını ve Çekim Taleplerini Yönet</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                <Card className="bg-blue-600 border-none rounded-[40px] text-white p-10 shadow-2xl overflow-hidden relative lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">BAKİYE</span>
                        <Wallet className="w-5 h-5 opacity-80" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="text-5xl font-black italic tracking-tighter">₺{user.walletBalance.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-3">
                    <Card className="bg-zinc-900/50 border border-white/10 rounded-[40px] h-full">
                        <CardHeader><CardTitle className="text-xs font-black uppercase tracking-widest">Son İşlemler</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                {user.transactions.map((tx) => (
                                    <div key={tx.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.04] transition-all">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{tx.type}</span>
                                            <span className="text-xs font-bold text-zinc-500 uppercase">{tx.createdAt.toLocaleDateString()} • {tx.status}</span>
                                        </div>
                                        <span className={`text-xl font-black italic tracking-tighter ${tx.amount > 0 ? 'text-white' : 'text-zinc-400'}`}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount} ₺
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <WithdrawalForm balance={user.walletBalance} />
        </div>
    );
}
