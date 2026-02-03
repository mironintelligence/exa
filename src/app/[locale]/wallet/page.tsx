import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "@/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default async function WalletPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect('/auth/login');

    const user = await db.user.findUnique({
        where: { id: (session.user as any).id },
        include: { transactions: { orderBy: { createdAt: 'desc' } } }
    });

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-black italic tracking-tighter uppercase">Cüzdan Kontrol</h1>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em]">Finansal varlıklarınızı buradan yönetin.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Main Balance */}
                <div className="md:col-span-4 flex flex-col gap-8">
                    <Card className="bg-blue-600 border-none rounded-none text-white shadow-[0_0_50px_-20px_rgba(37,99,235,1)]">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <span className="text-xs font-black uppercase tracking-widest opacity-80">Mevcut Bakiye</span>
                            <Wallet className="w-4 h-4 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-black italic tracking-tighter">₺{user.walletBalance.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Button size="lg" className="h-20 bg-zinc-900 border border-white/5 hover:bg-zinc-800 rounded-none flex flex-col gap-2">
                            <ArrowDownCircle className="w-5 h-5 text-green-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Para Yükle</span>
                        </Button>
                        <Button size="lg" className="h-20 bg-zinc-900 border border-white/5 hover:bg-zinc-800 rounded-none flex flex-col gap-2">
                            <ArrowUpCircle className="w-5 h-5 text-red-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Para Çek</span>
                        </Button>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="md:col-span-8">
                    <Card className="bg-zinc-900 border-white/5 rounded-none min-h-[500px]">
                        <CardHeader>
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tüm Finansal Geçmiş</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                {user.transactions.length === 0 ? (
                                    <div className="h-64 flex items-center justify-center text-zinc-600 font-bold uppercase tracking-widest text-xs">Henüz işlem bulunmuyor</div>
                                ) : (
                                    user.transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors">
                                            <div className="flex gap-6 items-center">
                                                <div className={`p-3 rounded-none ${tx.amount > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {tx.amount > 0 ? <ArrowDownCircle className="w-5 h-5" /> : <ArrowUpCircle className="w-5 h-5" />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold uppercase tracking-widest">{tx.type}</span>
                                                    <span className="text-[10px] text-zinc-500 uppercase">{tx.createdAt.toLocaleDateString()} • {tx.status}</span>
                                                </div>
                                            </div>
                                            <span className={`text-xl font-black italic ${tx.amount > 0 ? 'text-white' : 'text-zinc-400'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount} ₺
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
