import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Link } from '@/navigation';

export default function LandingPage() {
    const t = useTranslations('Index');

    return (
        <div className="flex flex-col gap-24">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/80 to-zinc-950" />
                </div>

                <div className="container relative z-10 text-center flex flex-col items-center gap-8">
                    <div className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase">
                        Türkiye'nin En Profesyonel Espor Platformu
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter max-w-5xl leading-none">
                        {t('hero.title')}
                    </h1>
                    <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
                        {t('hero.description')}
                    </p>
                    <div className="flex items-center gap-6 mt-4">
                        <Link href="/auth/register">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-none h-16 px-12 text-lg font-black uppercase tracking-widest shadow-[0_0_50px_-12px_rgba(37,99,235,0.5)]">
                                {t('hero.cta')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Live Stats Bar */}
            <section className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                    {[
                        { label: 'Aktif Turnuvalar', value: '24' },
                        { label: 'Ödenen Ödüller', value: '₺1.2M+' },
                        { label: 'Kayıtlı Oyuncular', value: '450K+' },
                        { label: 'Günlük Maç Sayısı', value: '1,200+' },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <span className="text-4xl font-black italic tracking-tighter text-blue-500">{stat.value}</span>
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Games */}
            <section className="container mx-auto px-4 py-24">
                <div className="flex items-end justify-between mb-12">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-4xl font-black italic tracking-tighter">POPÜLER OYUNLAR</h2>
                        <div className="h-1 w-24 bg-blue-600" />
                    </div>
                    <Link href="/tournaments" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                        Hepsini Gör &rarr;
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: 'VALORANT', image: '/images/games/valorant-hero.jpg', status: '8 AKTİF TURNUVA' },
                        { name: 'CS:GO 2', image: '/images/games/cs2-hero.jpg', status: '12 AKTİF TURNUVA' },
                        { name: 'PUBG MOBILE', image: '/images/games/pubg-hero.jpg', status: '4 AKTİF TURNUVA' },
                    ].map((game, i) => (
                        <div key={i} className="group relative aspect-[3/4] overflow-hidden cursor-pointer border border-white/5">
                            <Image
                                src={game.image}
                                alt={game.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
                            <div className="absolute bottom-0 p-8 flex flex-col gap-2">
                                <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">{game.status}</span>
                                <h3 className="text-3xl font-black italic tracking-tighter">{game.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
