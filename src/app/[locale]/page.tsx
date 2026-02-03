import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Trophy, Zap, ShieldCheck, Gamepad2, TrendingUp, Users, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";

export default async function LandingPage() {
    const games = await db.game.findMany({ take: 3 });

    // Real-time stats simulation
    const stats = {
        paid: "₺542,290",
        users: "12,490",
        match: "482"
    };

    return (
        <div className="flex flex-col relative overflow-hidden">
            {/* Dynamic Background Noise */}
            <div className="absolute inset-0 z-[-1] opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
                <div className="container px-8 lg:px-12 flex flex-col items-center text-center gap-12 max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase shadow-[0_0_24px_rgba(37,99,235,0.1)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        SAHAYA ÇIK VE KAZANMAYA BAŞLA
                    </div>

                    <h1 className="text-[10vw] lg:text-9xl font-black italic tracking-tighter leading-[0.8] text-white uppercase select-none drop-shadow-2xl">
                        PLAY.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500">EARN.</span><br />
                        DOMINATE.
                    </h1>

                    <p className="text-zinc-500 text-lg md:text-2xl max-w-3xl font-bold uppercase tracking-tight leading-relaxed lg:px-20">
                        Profesyonel espor arena sistemine katıl, yeteneğini konuştur ve anlık nakit ödülleri topla.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-8 mt-12 w-full justify-center">
                        <Link href="/auth/register" className="w-full sm:w-auto">
                            <Button size="lg" className="h-20 px-16 rounded-[32px] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-xl shadow-[0_16px_32px_-8px_rgba(37,99,235,1)] transition-all hover:scale-105 active:scale-95 group">
                                ŞİMDİ OYNA
                                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/tournaments" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="h-20 px-16 rounded-[32px] border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 text-xl font-black uppercase tracking-[0.2em]">
                                ARENAYI GEZ
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-12 lg:gap-32 mt-32 p-10 bg-white/[0.01] border border-white/5 rounded-[40px] backdrop-blur-md">
                        {[
                            { label: "TOPLAM ÖDENEN", value: stats.paid },
                            { label: "AKTİF OYUNCU", value: stats.users },
                            { label: "CANLI MAÇ", value: stats.match }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-2 group">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-blue-500 transition-colors">{stat.label}</span>
                                <span className="text-3xl lg:text-5xl font-black italic tracking-tighter text-white">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-8 lg:px-12 py-40">
                <div className="flex flex-col gap-4 mb-20 text-center items-center">
                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em]">OPERASYON PLANI</span>
                    <h2 className="text-6xl lg:text-7xl font-black italic tracking-tighter uppercase text-white">SİSTEM NASIL ÇALIŞIR?</h2>
                    <div className="h-1.5 w-40 bg-gradient-to-r from-blue-600 to-cyan-400 mt-2" />
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {[
                        {
                            icon: Users,
                            title: "1. ARENAYA GİR",
                            desc: "Profillini oluştur, favori oyununu seç ve bütçene uygun turnuvaya kaydol.",
                            color: "blue"
                        },
                        {
                            icon: Zap,
                            title: "2. SAHADA KAZAN",
                            desc: "Yeteneklerini konuştur, rakiplerini ezip geç ve maçın galibi ol.",
                            color: "cyan"
                        },
                        {
                            icon: ShieldCheck,
                            title: "3. ÖDÜLÜ AL",
                            desc: "Zafer ödülün anında cüzdanına yansısın. Güvenli, hızlı ve şeffaf.",
                            color: "blue"
                        },
                    ].map((item, i) => (
                        <div key={i} className="group p-14 bg-zinc-900/40 border border-white/5 rounded-[48px] hover:border-blue-500/20 transition-all hover:-translate-y-2">
                            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-blue-600/10 transition-colors">
                                <item.icon className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-6 text-white leading-none">{item.title}</h3>
                            <p className="text-zinc-500 font-bold uppercase text-xs leading-loose tracking-widest">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interactive Game Cards (Featured Games) */}
            <section className="container mx-auto px-8 lg:px-12 py-40">
                <div className="flex items-center justify-between mb-24">
                    <div className="flex flex-col gap-2">
                        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">HAFTALIK</span>
                        <h2 className="text-6xl font-black italic tracking-tighter uppercase text-white leading-none">ARENA LİDERLERİ</h2>
                    </div>
                    <Link href="/tournaments">
                        <Button variant="ghost" className="text-blue-500 font-black italic uppercase tracking-[0.2em] text-sm hover:text-cyan-400 group">
                            TÜMÜNÜ GÖSTER <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                    {games.length > 0 ? games.map((game) => (
                        <div key={game.id} className="group relative h-[650px] rounded-[60px] overflow-hidden border border-white/5 cursor-pointer shadow-3xl">
                            <Image
                                src={game.image}
                                alt={game.name}
                                fill
                                className="object-cover transition-all duration-[2000ms] group-hover:scale-125 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                            {/* Hover Stats */}
                            <div className="absolute top-10 left-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                                <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full w-fit">AKTİF</span>
                                <span className="text-4xl font-black italic tracking-tighter text-white">42 CANLI</span>
                            </div>

                            <div className="absolute bottom-12 left-12 right-12 flex flex-col gap-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-zinc-400 text-xs font-black uppercase tracking-[0.4em]">RANKED LİG</span>
                                    <h3 className="text-6xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">{game.name}</h3>
                                </div>
                                <Button className="w-full h-20 bg-white text-black hover:bg-blue-600 hover:text-white rounded-[24px] font-black uppercase text-xl transition-all scale-95 group-hover:scale-100 italic">
                                    KATILMAYA HAZIR OL
                                </Button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-32 rounded-[60px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-6">
                            <Gamepad2 className="w-16 h-16 text-zinc-800" />
                            <span className="text-sm font-black uppercase tracking-widest text-zinc-600">SİSTEM YÜKLENİYOR...</span>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Final */}
            <section className="container mx-auto px-8 lg:px-12 py-40">
                <div className="w-full h-[600px] rounded-[80px] bg-blue-600 relative overflow-hidden flex flex-col items-center justify-center text-center px-10 gap-12 group">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)" />

                    <h2 className="text-6xl lg:text-9xl font-black italic tracking-tighter text-white uppercase leading-[0.8] relative z-10 group-hover:scale-110 transition-transform duration-1000">
                        ZAFERE<br />BİR ADIM KALDI
                    </h2>

                    <p className="text-blue-200 text-lg lg:text-2xl font-black uppercase tracking-[0.2em] relative z-10 max-w-2xl">
                        Hemen kaydol ve ilk turnuvanda ücretsiz katılım hakkı kazan.
                    </p>

                    <div className="relative z-10">
                        <Link href="/auth/register">
                            <Button size="lg" className="h-24 px-20 bg-white text-blue-600 hover:bg-zinc-100 font-black uppercase text-2xl rounded-[40px] shadow-3xl hover:shadow-white/20 transition-all active:scale-95">
                                HESABINI OLUŞTUR
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
