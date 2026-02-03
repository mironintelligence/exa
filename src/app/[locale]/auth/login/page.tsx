"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Globe, Steam, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
        });
        setLoading(false);
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center container px-8 relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />

            <div className="w-full max-w-xl relative group">
                {/* Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[48px] blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000" />

                <div className="relative bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 lg:p-16 shadow-3xl">
                    <div className="flex flex-col items-center text-center gap-6 mb-12">
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl animate-float">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Badge className="bg-blue-600/10 text-blue-500 font-black text-[8px] tracking-[0.4em] uppercase py-1 px-4 rounded-full w-fit mx-auto">GÜVENLİ GİRİŞ</Badge>
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">ARENAYA DÖN</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2 group">
                                <Label className="text-[10px] font-black uppercase text-zinc-500 ml-6 tracking-widest">E-posta Adresi</Label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="pro@exa.com"
                                        className="h-16 pl-14 pr-8 bg-zinc-950 border-white/5 rounded-3xl font-bold focus:border-blue-600 transition-all outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <div className="flex items-center justify-between px-6">
                                    <Label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Şifre</Label>
                                    <span className="text-[10px] font-black text-blue-500 cursor-pointer uppercase hover:text-cyan-400">ŞİFREMİ UNUTTUM</span>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-16 pl-14 pr-8 bg-zinc-950 border-white/5 rounded-3xl font-bold focus:border-blue-600 transition-all outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            disabled={loading}
                            className="w-full h-18 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 text-xs group"
                        >
                            {loading ? 'SİSTEME GİRİLİYOR...' : 'OTURUMU AÇ'}
                            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </form>

                    <div className="relative my-12">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black text-zinc-700 tracking-[0.3em]"><span className="bg-zinc-950 px-6">VEYA</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                            variant="outline"
                            className="h-16 rounded-3xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-black uppercase tracking-widest gap-3"
                        >
                            <Globe className="w-4 h-4 text-zinc-400" /> Google
                        </Button>
                        <Button
                            onClick={() => signIn("steam", { callbackUrl: "/" })}
                            variant="outline"
                            className="h-16 rounded-3xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-black uppercase tracking-widest gap-3"
                        >
                            <div className="w-4 h-4 flex items-center justify-center bg-zinc-400 rounded-full text-zinc-900 invert">
                                <span className="font-bold text-[8px]">S</span>
                            </div> Steam
                        </Button>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">
                            HENÜZ HESABIN YOK MU? <Link href="/auth/register" className="text-blue-500 font-black hover:text-cyan-400 ml-2">KAYIT OL</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
