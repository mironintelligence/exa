import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Trophy, Zap, ShieldCheck, Gamepad2, Users } from "lucide-react";
import { db } from "@/lib/db";

export default async function LandingPage() {
    // Use getTranslations for Server Components
    const t = await getTranslations('Index');

    // Safe DB fetch
    let games = [];
    try {
        games = await db.game.findMany({ take: 3 });
    } catch (error) {
        console.error("Database fetch failed:", error);
        // Fallback to empty or mock if needed
    }

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>

                <div className="container relative z-10 text-center flex flex-col items-center gap-10">
                    <div className="px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">
                        By Miron Intelligence | Esporun Geleceği
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter max-w-6xl leading-[0.8] text-white uppercase">
                        OYNA. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">KAZAN.</span> DOMİNE ET.
                    </h1>

                    <p className="text-zinc-500 text-lg md:text-xl max-w-2xl font-bold uppercase tracking-tight leading-relaxed">
                        Profesyonel turnuvalara katılın, yeteneklerinizi sergileyin ve anında ödülleri toplayın.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                        <Link href="/auth/register">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-18 px-14 text-xl font-black uppercase tracking-widest shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)]">
                                ŞİMDİ BAŞLA
                            </Button>
                        </Link>
                        <Link href="/tournaments">
                            <Button variant="outline" size="lg" className="rounded-full h-18 px-14 text-xl font-black uppercase tracking-widest border-white/10 hover:bg-white/5 text-zinc-400">
                                LİGİ GÖR
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container mx-auto px-4 py-32">
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { icon: Users, title: "1. TURNUVAYA KATIL", desc: "Favori oyununu seç ve bütçene uygun turnuvaya kaydol." },
                        { icon: Zap, title: "2. MAÇINI KAZAN", desc: "Sahaya çık, yeteneğini konuştur ve rakiplerini ezip geç." },
                        { icon: ShieldCheck, title: "3. ÖDEMENİ AL", desc: "Zaferin ödülü anında cüzdanına yansısın. Güvenli ve hızı." },
                    ].map((item, i) => (
                        <div key={i} className="group p-12 bg-zinc-900/40 border border-white/5 rounded-[40px] hover:border-blue-500/30 transition-all">
                            <item.icon className="w-16 h-16 text-blue-500 mb-8" />
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4 text-white">{item.title}</h3>
                            <p className="text-zinc-500 font-bold uppercase text-xs leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Games */}
            <section className="container mx-auto px-4 py-32">
                <div className="flex items-center justify-between mb-20 text-white">
                    <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">ARENA LİDERLERİ</h2>
                    <Link href="/tournaments" className="text-blue-500 font-black italic uppercase tracking-widest text-sm hover:text-cyan-400 transition-colors">TÜMÜ &rarr;</Link>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                    {games.length > 0 ? games.map((game, i) => (
                        <div key={game.id} className="group relative h-[600px] rounded-[40px] overflow-hidden border border-white/5">
                            <Image
                                src={game.image}
                                alt={game.name}
                                fill
                                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="text-blue-400 text-xs font-black uppercase tracking-widest">AKTİF</span>
                                    <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white">{game.name}</h3>
                                </div>
                                <Link href="/tournaments">
                                    <Button className="bg-white text-black hover:bg-blue-600 hover:text-white rounded-full px-8 py-6 font-black uppercase transition-all">
                                        KATIL
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center text-zinc-500 font-bold uppercase text-sm border-2 border-dashed border-white/5 rounded-[40px]">
                            Henüz aktif oyun bulunmuyor.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
