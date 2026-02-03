import { db } from "@/lib/db";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";

export default async function ShopPage() {
    const products = await db.product.findMany();

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                    <h1 className="text-6xl font-black italic tracking-tighter uppercase">Mağaza</h1>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em]">ExA Puanlarınızı ve Bakiyenizi harcayın.</p>
                    <div className="h-1 w-32 bg-blue-600" />
                </div>
                <div className="bg-zinc-900 border border-white/5 p-6 rounded-none flex items-center gap-8">
                    <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Favori Ürünün mü?</span>
                        <span className="text-sm font-bold italic">Yeni Ürünler Yakında!</span>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-blue-600 opacity-50" />
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Card key={product.id} className="group bg-zinc-900 border-white/5 hover:border-blue-600/50 transition-all rounded-none overflow-hidden flex flex-col">
                        <div className="relative aspect-square">
                            <Image src={product.image} alt={product.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute top-4 left-4 bg-zinc-950 p-2 border border-white/5 flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-[10px] font-black italic tracking-tighter uppercase">Efsanevi</span>
                            </div>
                        </div>
                        <CardContent className="p-6 flex flex-col gap-4 flex-1">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{product.category}</span>
                                <h3 className="text-xl font-black italic tracking-tighter uppercase leading-tight">{product.name}</h3>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                <span className="text-2xl font-black italic tracking-tighter">₺{product.price.toLocaleString()}</span>
                                <Button variant="outline" className="rounded-none border-zinc-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all px-6 font-bold uppercase text-[10px]">Satın Al</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {products.length === 0 && (
                    <div className="col-span-full h-96 flex flex-col items-center justify-center border border-dashed border-white/10 text-zinc-600 uppercase font-black italic gap-4">
                        <ShoppingBag className="w-12 h-12 opacity-20" />
                        <span>Mağaza şu an kapalı veya boş</span>
                    </div>
                )}
            </div>
        </div>
    );
}
