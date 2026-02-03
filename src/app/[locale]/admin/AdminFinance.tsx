"use client";

import { adminProcessWithdrawal } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Wallet, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminFinance({ pendingTxs }: any) {
    const router = useRouter();

    const handleAction = async (id: string, action: 'COMPLETED' | 'REJECTED') => {
        try {
            await adminProcessWithdrawal(id, action);
            router.refresh();
        } catch (e) {
            alert("Hata oluştu");
        }
    };

    return (
        <div className="flex flex-col gap-10 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">BEKLEYEN ÖDEMELER</h2>
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">Manuel onay gerektiren çekim talepleri</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {pendingTxs.map((tx: any) => (
                    <Card key={tx.id} className="bg-zinc-900 border-white/5 rounded-[32px] overflow-hidden group hover:border-blue-500/20 transition-all">
                        <CardContent className="p-0 flex flex-col md:flex-row items-center">
                            <div className="p-10 flex-1 flex items-center gap-10">
                                <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <Wallet className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Badge className="bg-white/5 text-[8px] font-black uppercase text-zinc-400 w-fit mb-2">ÇEKİM TALEBİ</Badge>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-black italic tracking-tighter text-white uppercase">{tx.user.name}</span>
                                        <span className="text-zinc-600 text-sm font-bold uppercase tracking-widest leading-none mt-1">/{tx.user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">ALICI ADI</span>
                                            <span className="text-xs font-black uppercase text-zinc-400 italic mt-1">{tx.fullName || u.name}</span>
                                        </div>
                                        <div className="w-[1px] h-4 bg-white/5" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">IBAN</span>
                                            <code className="text-[10px] font-black text-blue-500 mt-1 uppercase tracking-widest">{tx.iban || 'N/A'}</code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 border-l border-white/5 flex flex-col items-center justify-center gap-4 bg-white/[0.01] min-w-[300px]">
                                <span className="text-4xl font-black italic tracking-tighter text-white">₺{Math.abs(tx.amount).toLocaleString()}</span>
                                <div className="flex gap-2 w-full">
                                    <Button
                                        onClick={() => handleAction(tx.id, 'COMPLETED')}
                                        className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[10px]"
                                    >
                                        <Check className="w-4 h-4 mr-2" /> ONAYLA
                                    </Button>
                                    <Button
                                        onClick={() => handleAction(tx.id, 'REJECTED')}
                                        variant="destructive"
                                        className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest text-[10px]"
                                    >
                                        <X className="w-4 h-4 mr-2" /> REDDET
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {pendingTxs.length === 0 && (
                    <div className="py-40 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-white/5 rounded-[48px]">
                        <Check className="w-16 h-16 text-zinc-800" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">BEKLEYEN İŞLEM BULUNMADI</span>
                    </div>
                )}
            </div>
        </div>
    );
}
