import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Trophy, Star, Zap, Crown, CheckCircle2, ArrowRight } from "lucide-react";
import SubscriptionButton from "./SubscriptionButton";
import { Badge } from "@/components/ui/badge";

export default async function SubscriptionsPage() {
    const session = await getServerSession(authOptions);
    const subscriptions = await db.subscription.findMany();

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-20">
            <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
                <Badge className="bg-blue-600 font-black text-[10px] tracking-[0.4em] uppercase py-2 px-6 rounded-full">LEVEL UP</Badge>
                <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter uppercase text-white leading-none">PROFESYONEL ÜYELİK</h1>
                <p className="text-zinc-500 text-xl font-bold uppercase tracking-tight max-w-2xl leading-relaxed">
                    Sistemin tüm avantajlarından yararlan, ücretsiz turnuva girişleri kazan ve kazancını maksimize et.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {[
                    { id: 'WEEKLY', icon: Zap, label: 'HAFTALIK', color: 'from-blue-600 to-indigo-600' },
                    { id: 'MONTHLY', icon: Star, label: 'AYLIK', color: 'from-blue-700 via-blue-600 to-cyan-600', popular: true },
                    { id: 'THREE_MONTH', icon: Crown, label: '3 AYLIK', color: 'from-zinc-100 to-zinc-400', textColor: 'text-black' }
                ].map((tier) => {
                    const data = subscriptions.find(s => s.name === tier.id);
                    if (!data) return null;

                    return (
                        <div key={tier.id} className={`relative flex flex-col p-12 rounded-[60px] border border-white/5 bg-zinc-900/40 hover:border-blue-500/20 transition-all group overflow-hidden ${tier.popular ? 'scale-105 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.3)] border-blue-600/30' : ''}`}>
                            {tier.popular && (
                                <div className="absolute top-10 right-10 bg-blue-600 text-white font-black italic uppercase text-[8px] tracking-[0.3em] px-4 py-1.5 rounded-full z-10">EN POPÜLER</div>
                            )}

                            <div className="flex flex-col gap-12 relative z-10">
                                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-xl`}>
                                    <tier.icon className={`w-10 h-10 ${tier.textColor || 'text-white'}`} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-black uppercase text-blue-500 tracking-widest">{tier.label} ELITE</span>
                                    <div className="flex items-end gap-2">
                                        <span className="text-6xl font-black italic text-white tracking-tighter">₺{data.price}</span>
                                        <span className="text-zinc-600 font-bold uppercase text-[10px] mb-2">/ DÖNEM</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 py-10 border-y border-white/5">
                                    {(data.features as string[]).map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4 group/item">
                                            <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-zinc-400 group-hover/item:text-white transition-colors">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <SubscriptionButton tier={tier.id as any} session={session} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Comparison Final */}
            <div className="w-full p-20 bg-white/[0.01] border border-white/5 rounded-[80px] flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex flex-col gap-4">
                    <h3 className="text-4xl font-black italic uppercase text-white tracking-tighter">ABONELİK AVANTAJI</h3>
                    <p className="text-zinc-600 font-bold uppercase text-xs tracking-widest max-w-lg leading-loose">
                        Abone olan üyelerimiz, turnuva giriş ücretlerinden tasarruf ederken özel görevler ve market indirimleri ile kazançlarını 5 kata kadar artırabiliyor.
                    </p>
                </div>
                <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-black italic text-white">2.5K+</span>
                        <span className="text-[10px] font-black text-zinc-600 uppercase">AKTİF ABONE</span>
                    </div>
                    <div className="w-px h-12 bg-white/5" />
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-black italic text-blue-500">%82</span>
                        <span className="text-[10px] font-black text-zinc-600 uppercase">KAZANÇ ARTIŞI</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
