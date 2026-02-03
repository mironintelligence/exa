import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Rocket } from "lucide-react";
import SubscriptionButton from "./SubscriptionButton";

export default async function SubscriptionPage() {
    const session = await getServerSession(authOptions);
    const subscriptions = await db.subscription.findMany();

    return (
        <div className="container mx-auto px-4 py-32 flex flex-col items-center">
            <div className="text-center mb-20">
                <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white mb-4">ABONELİK MERKEZİ</h1>
                <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">Ayrıcalıklı Espor Deneyimine Geçiş Yap</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
                {subscriptions.map((sub) => (
                    <Card key={sub.id} className={`group relative bg-zinc-950 border border-white/5 rounded-[48px] p-10 overflow-hidden transition-all hover:border-blue-500/50 ${sub.name === 'Aylık' ? 'border-blue-600/50 scale-105' : ''}`}>
                        {sub.name === 'Aylık' && (
                            <div className="absolute top-0 right-0 bg-blue-600 text-[10px] font-black uppercase text-white px-6 py-2 rounded-bl-3xl">EN POPÜLER</div>
                        )}

                        <CardHeader className="p-0 mb-8">
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-2">{sub.name}</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black italic tracking-tighter text-white">₺{sub.price.toLocaleString()}</span>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0 flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                {(sub.features as string[]).map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span className="text-xs font-bold uppercase text-zinc-400">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {session ? (
                                <SubscriptionButton planId={sub.id} currentBalance={(session.user as any).walletBalance} price={sub.price} />
                            ) : (
                                <Button disabled className="h-16 rounded-3xl bg-zinc-900 border border-white/10 text-zinc-500 font-black uppercase">GİRİŞ YAPIN</Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
