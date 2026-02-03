"use client";

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Trophy, Zap, ShieldCheck, Gamepad2, TrendingUp, Users } from "lucide-react";

export default function LandingPage() {
    const t = useTranslations('Index');

    return (
        <div className="flex flex-col">
            {/* Hero Section - Overhauled */}
            <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>

                <div className="container relative z-10 text-center flex flex-col items-center gap-10">
                    <div className="animate-bounce px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">
                        Geleceğin Espor Eko-Sistemi Sizi Bekliyor
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter max-w-6xl leading-[0.8] text-white">
                        OYNA. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">KAZAN.</span> DOMİNE ET.
                    </h1>

                    <p className="text-zinc-500 text-lg md:text-xl max-w-2xl font-medium tracking-tight uppercase leading-relaxed">
                        Profesyonel turnuvalara katılın, yeteneklerinizi sergileyin ve anında ödülleri toplayın.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                        <Link href="/auth/register">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-18 px-14 text-xl font-black uppercase tracking-widest shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)] transition-all hover:scale-105 active:scale-95">
                                BAŞLA
                            </Button>
                        </Link>
                        <Link href="/tournaments">
                            <Button variant="outline" size="lg" className="rounded-full h-18 px-14 text-xl font-black uppercase tracking-widest border-white/10 hover:bg-white/5 text-zinc-400">
                                TURNUVALAR
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Floating Icons Background */}
                <div className="absolute bottom-20 left-10 animate-pulse text-blue-500/10"><Gamepad2 size={120} /></div>
                <div className="absolute top-40 right-10 animate-pulse text-cyan-500/10"><Trophy size={160} /></div>
            </section>

            {/* Live Stats Ticker */}
            <div className="w-full bg-blue-600 py-3 overflow-hidden whitespace-nowrap border-y border-white/10 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                <div className="inline-block animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="mx-8 text-[10px] font-black uppercase tracking-[0.3em] text-white italic">
                            TOPLAM ÖDEME: ₺500,000+ • AKTİF OYUNCU: 12,000 • ANLIK MAÇ: 480 •
                        </span>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <section className="container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">NASIL ÇALIŞIR?</h2>
                    <div className="h-1.5 w-40 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto" />
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { icon: Users, title: "1. TURNUVAYA KATIL", desc: "Favori oyununu seç ve bütçene uygun turnuvaya kaydol." },
                        { icon: Zap, title: "2. MAÇINI KAZAN", desc: "Sahaya çık, yeteneğini konuştur ve rakiplerini ezip geç." },
                        { icon: ShieldCheck, title: "3. ÖDEMENİ AL", desc: "Zaferin ödülü anında cüzdanına yansısın. Güvenli ve hızı." },
                    ].map((item, i) => (
                        <div key={i} className="group p-10 bg-zinc-900/50 border border-white/5 rounded-[40px] hover:border-blue-500/30 transition-all hover:-translate-y-2">
                            <item.icon className="w-16 h-16 text-blue-500 mb-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4">{item.title}</h3>
                            <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Games - High Premium Look */}
            <section className="container mx-auto px-4 py-32">
                <div className="flex items-center justify-between mb-20">
                    <h2 className="text-5xl font-black italic tracking-tighter uppercase">ARENA LİDERLERİ</h2>
                    <Link href="/tournaments" className="text-blue-500 font-black italic uppercase tracking-widest text-sm hover:text-cyan-400 transition-colors">TÜMÜNÜ GÖR &rarr;</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {[
                        { name: 'VALORANT', image: '/images/games/valorant-hero.jpg', tag: '8 Turnuva' },
                        { name: 'CS:GO 2', image: '/images/games/cs2-hero.jpg', tag: '12 Turnuva' },
                    ].map((game, i) => (
                        <div key={i} className="group relative h-[500px] rounded-[60px] overflow-hidden border border-white/5 cursor-pointer">
                            <Image src={game.image} alt={game.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-125" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="text-blue-400 text-xs font-black uppercase tracking-widest">{game.tag}</span>
                                    <h3 className="text-5xl font-black italic tracking-tighter uppercase">{game.name}</h3>
                                </div>
                                <Button className="hidden group-hover:flex bg-white text-black hover:bg-blue-500 hover:text-white rounded-full px-8 py-6 font-black uppercase transition-all scale-0 group-hover:scale-100 delay-100">
                                    KATIL
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
