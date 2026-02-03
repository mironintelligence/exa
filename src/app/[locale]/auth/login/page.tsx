"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", { email, password, callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen pt-32 pb-12 flex items-center justify-center px-4 relative">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600/10 via-zinc-950 to-cyan-500/10 opacity-50" />

            <Card className="w-full max-w-md bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_24px_64px_-16px_rgba(0,0,0,1)] relative z-10 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

                <CardHeader className="text-center pb-8 pt-12">
                    <CardTitle className="text-5xl font-black italic tracking-tighter uppercase text-white">Giriş Yap</CardTitle>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-3">ExA Gaming Arena</p>
                </CardHeader>

                <CardContent className="flex flex-col gap-8 px-8 pb-12">
                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            onClick={() => signIn('google')}
                            className="h-14 rounded-2xl border-white/5 hover:border-blue-500/30 bg-white/[0.02] flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => signIn('steam')}
                            className="h-14 rounded-2xl border-white/5 hover:border-blue-500/30 bg-white/[0.02] flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.671c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.009l2.83-4.145V8.91c0-2.028 1.644-3.673 3.673-3.673 2.028 0 3.673 1.645 3.673 3.673s-1.645 3.673-3.673 3.673c-.056 0-.112-.003-.168-.007l-4.145 2.83h-.073c-2.028 0-3.673-1.645-3.673-3.673 0-.056.002-.112.006-.168L3.25 12.3c.003.044.005.088.005.132 0 2.21-1.792 4.002-4.002 4.002-2.21 0-4.002-1.792-4.002-4.002 0-2.124 1.655-3.861 3.738-3.99l2.825-11.666c.071-.295.32-.511.62-.511.3 0 .549.216.62.511l.732 3.024A12.04 12.04 0 0 1 11.979 0z" /></svg>
                            Steam
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black italic"><span className="bg-zinc-950/40 px-4 text-zinc-500 tracking-[0.5em]">OR</span></div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">E-Posta Adresi</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white"
                                placeholder="mironintelligence@gmail.com"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Parola</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="h-14 bg-gradient-to-r from-blue-600 to-cyan-500 hover:tracking-[0.1em] transition-all text-white rounded-2xl font-black uppercase tracking-widest mt-4 shadow-[0_12px_40px_-12px_rgba(37,99,235,0.6)]"
                        >
                            Arenaya Giriş
                        </Button>
                    </form>

                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        Yeni misin? <Link href="/auth/register" className="text-blue-500 hover:text-cyan-400 transition-colors">YENİ KAYIT AÇ</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
