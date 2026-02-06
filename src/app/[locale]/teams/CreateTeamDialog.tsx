"use client";

import { createTeam } from "@/actions/economy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Plus, Shield, X, Zap } from "lucide-react";

export default function CreateTeamDialog({ session }: { session: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return router.push('/auth/login');
        if (!name.trim()) return;

        setLoading(true);
        try {
            await createTeam(name);
            toast({ title: "BAŞARILI!", description: "Klanın kuruldu. Artık üyeleri davet edebilirsin." });
            setIsOpen(false);
            setName("");
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "HATA", description: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="h-16 px-10 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all active:scale-95"
            >
                <Plus className="w-4 h-4 mr-2" /> KLAN OLUŞTUR
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[48px] p-12 relative shadow-3xl">
                        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-all"><X /></button>

                        <div className="flex flex-col items-center text-center gap-6 mb-12">
                            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">İMPARATORLUĞUNU KUR</h2>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-8">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-zinc-500 ml-6 tracking-widest">Klan İsmi</Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="DARK LEGION"
                                    className="h-16 px-8 rounded-3xl bg-zinc-900 border-white/5 text-lg font-black italic uppercase tracking-widest focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/10 flex items-start gap-4">
                                <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                <p className="text-[10px] font-bold text-zinc-400 uppercase leading-relaxed">
                                    Klan kurarak turnuvalara takım olarak katılabilir ve klan sıralamasında zirveye oynayabilirsiniz.
                                </p>
                            </div>

                            <Button
                                disabled={loading}
                                className="w-full h-18 rounded-3xl bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 text-xs"
                            >
                                {loading ? 'SİSTEM KAYDEDİLİYOR...' : 'KLANI RESMİLEŞTİR'}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
