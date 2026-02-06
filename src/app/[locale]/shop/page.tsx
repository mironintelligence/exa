import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ShoppingBag, Star, Zap, CreditCard, ChevronRight, Search, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ShopBuyButton from "./ShopBuyButton";

export default async function ShopPage() {
    const products = await db.product.findMany({ where: { isActive: true } });
    const session = await getServerSession(authOptions);

    return (
        <div className="container mx-auto px-8 lg:px-12 py-32 flex flex-col gap-20">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-10 h-10 text-blue-500" />
                        <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white leading-none">MARKET</h1>
                    </div>
                    <p className="text-zinc-500 text-lg font-bold uppercase tracking-tight max-w-xl">
                        Kazandığın ödülleri dijital varlıklara ve epik kozmetiklere dönüştür.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-zinc-900 border border-white/5 p-2 rounded-3xl w-full lg:max-w-md">
                    <Search className="ml-4 w-5 h-5 text-zinc-600" />
                    <input placeholder="ÜRÜN ARA..." className="flex-1 bg-transparent border-none outline-none text-[10px] font-black uppercase text-zinc-400 placeholder:text-zinc-700 h-10 px-4" />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {['HEPSİ', 'VALORANT VP', 'UC', 'STEAM', 'HEDİYE KARTLARI'].map((cat, i) => (
                    <button key={i} className={`px-8 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-blue-500/20'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
                {products.map((item) => (
                    <div key={item.id} className="group flex flex-col bg-zinc-900 border border-white/5 rounded-[48px] overflow-hidden hover:border-blue-500/30 transition-all hover:-translate-y-2 shadow-2xl">
                        <div className="relative h-64 bg-zinc-950 p-10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)]" />
                            <div className="relative z-10 w-full h-full flex items-center justify-center bg-white/5 rounded-3xl border border-white/5 group-hover:scale-110 transition-transform duration-700">
                                <Gift className="w-16 h-16 text-blue-500 opacity-40" />
                            </div>
                            <Badge className="absolute top-6 right-6 bg-blue-600 text-[8px] font-black uppercase px-4 py-1 rounded-full">YENİ</Badge>
                        </div>

                        <div className="p-10 flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item.category}</span>
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white truncate">{item.name}</h3>
                            </div>

                            <div className="flex items-center justify-between py-6 border-y border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-zinc-700 uppercase">FİYAT</span>
                                    <span className="text-3xl font-black italic text-white tracking-tighter">₺{item.price.toLocaleString()}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                            </div>

                            <ShopBuyButton productId={item.id} session={session} price={item.price} />
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="py-40 flex flex-col items-center justify-center gap-10 border-2 border-dashed border-white/5 rounded-[80px]">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-zinc-800">
                        <ShoppingBag className="w-12 h-12" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-3xl font-black italic uppercase text-white">ENVANTER BOŞALDI</h3>
                        <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em]">YENİ ÜRÜNLER YÜKLENİYOR. TAKİPTE KAL.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
