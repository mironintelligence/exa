"use client";

import { depositSimulated, requestWithdrawal, transferVirtualCash } from "@/actions/economy";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpCircle, ArrowDownCircle, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function WalletForms({ balance }: { balance: number }) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawData, setWithdrawData] = useState({ amount: '', iban: '', fullName: '' });
    const [transferData, setTransferData] = useState({ amount: '', email: '' });

    const handleDeposit = async () => {
        setLoading(true);
        try {
            await depositSimulated(Number(depositAmount));
            toast({ title: "Başarılı", description: "Bakiye yüklendi." });
            setDepositAmount('');
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "Hata", description: e.message });
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        if (Number(withdrawData.amount) > balance) return toast({ variant: "destructive", description: "Yetersiz bakiye" });
        setLoading(true);
        try {
            await requestWithdrawal(Number(withdrawData.amount), withdrawData.iban, withdrawData.fullName);
            toast({ title: "Talep Alındı", description: "Admin onayı bekleniyor." });
            setWithdrawData({ amount: '', iban: '', fullName: '' });
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "Hata", description: e.message });
        } finally {
            setLoading(false);
        }
    };

    const handleTransfer = async () => {
        setLoading(true);
        try {
            await transferVirtualCash(transferData.email, Number(transferData.amount));
            toast({ title: "Gönderildi", description: "Transfer başarıyla tamamlandı." });
            setTransferData({ amount: '', email: '' });
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "Hata", description: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-10">
            {/* Deposit */}
            <Card className="bg-zinc-900/50 border border-white/5 rounded-[48px] p-10 flex flex-col gap-10 hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <ArrowUpCircle className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-black italic uppercase text-white">Bakiye Yükle</h3>
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">SİMÜLE KART İLE</span>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-zinc-500 ml-4">MİKTAR (₺)</Label>
                        <Input
                            placeholder="100.00"
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="h-16 px-8 rounded-3xl bg-zinc-950 border-white/10 text-xl font-black italic focus:ring-blue-600"
                        />
                    </div>
                    <Button
                        onClick={handleDeposit}
                        disabled={loading}
                        className="w-full h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
                    >
                        HEMEN YÜKLE
                    </Button>
                </div>
            </Card>

            {/* Withdraw */}
            <Card className="bg-zinc-900/50 border border-white/5 rounded-[48px] p-10 flex flex-col gap-10 hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <ArrowDownCircle className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-black italic uppercase text-white">Para Çek</h3>
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">BANKA HESABINA</span>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-zinc-500 ml-4">MİKTAR</Label>
                            <Input value={withdrawData.amount} onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })} placeholder="0" className="h-16 px-6 rounded-3xl bg-zinc-950 border-white/10 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-zinc-500 ml-4">AD SOYAD</Label>
                            <Input value={withdrawData.fullName} onChange={(e) => setWithdrawData({ ...withdrawData, fullName: e.target.value })} placeholder="NAMIK.." className="h-16 px-6 rounded-3xl bg-zinc-950 border-white/10 font-bold" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-zinc-500 ml-4">IBAN (TR...)</Label>
                        <Input value={withdrawData.iban} onChange={(e) => setWithdrawData({ ...withdrawData, iban: e.target.value })} placeholder="TR00 0000 0000..." className="h-16 px-8 rounded-3xl bg-zinc-950 border-white/10 font-bold" />
                    </div>
                    <Button
                        onClick={handleWithdraw}
                        disabled={loading}
                        variant="outline"
                        className="w-full h-16 rounded-3xl border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 font-black uppercase tracking-widest transition-all active:scale-95"
                    >
                        ONAYA GÖNDER
                    </Button>
                </div>
            </Card>

            {/* Transfer */}
            <Card className="bg-zinc-900/50 border border-white/5 rounded-[48px] p-10 flex flex-col gap-10 hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <Send className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-black italic uppercase text-white">V-Cash Transfer</h3>
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">KULLANICIDAN KULLANICIYA</span>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-zinc-500 ml-4">ALICI E-POSTA</Label>
                        <Input value={transferData.email} onChange={(e) => setTransferData({ ...transferData, email: e.target.value })} placeholder="pro@exa.com" className="h-16 px-8 rounded-3xl bg-zinc-950 border-white/10 font-bold" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-zinc-500 ml-4">MİKTAR (₺)</Label>
                        <Input value={transferData.amount} onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })} placeholder="₺ 0.00" className="h-16 px-8 rounded-3xl bg-zinc-950 border-white/10 font-bold" />
                    </div>
                    <Button
                        onClick={handleTransfer}
                        disabled={loading}
                        className="w-full h-16 rounded-3xl bg-zinc-100 hover:bg-white text-zinc-950 font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
                    >
                        AKTİVASYONU BAŞLAT
                    </Button>
                </div>
            </Card>
        </div>
    );
}
