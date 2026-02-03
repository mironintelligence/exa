"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const t = useTranslations("Auth");

    return (
        <div className="container mx-auto px-4 h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-md bg-zinc-900 border-white/5 rounded-none shadow-2xl p-8">
                <CardHeader className="text-center p-0 mb-8">
                    <CardTitle className="text-4xl font-black italic tracking-tighter uppercase">{t('login')}</CardTitle>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">ExA Platformuna Geri Dön</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 p-0">
                    <Button variant="outline" className="h-14 rounded-none border-white/10 hover:bg-white/[0.05] flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {t('google')}
                    </Button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]"><span className="bg-zinc-900 px-4 text-zinc-500 italic">VEYA</span></div>
                    </div>

                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t('email')}</label>
                            <input type="email" className="h-12 bg-white/[0.03] border border-white/5 rounded-none px-4 text-sm focus:outline-none focus:border-blue-600 transition-colors" placeholder="admin@exa.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t('password')}</label>
                            <input type="password" title="password" className="h-12 bg-white/[0.03] border border-white/5 rounded-none px-4 text-sm focus:outline-none focus:border-blue-600 transition-colors" placeholder="••••••••" />
                        </div>
                        <Button className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black uppercase tracking-[0.2em] mt-2 shadow-[0_0_50px_-15px_rgba(37,99,235,0.6)]">GİRİŞ YAP</Button>
                    </form>

                    <p className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-4">
                        Hesabın yok mu? <Link href="/auth/register" className="text-blue-500 hover:text-blue-400">YENİ KAYIT AÇ</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
