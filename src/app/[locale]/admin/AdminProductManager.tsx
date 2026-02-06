"use client";

import { adminCreateGame } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductManager({ products }: any) {
    const router = useRouter();
    // Simplified product creation as action supports createProduct conceptually (we'll use createGame as base)
    // Logic for Product CRUD

    return (
        <div className="flex flex-col gap-12">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-12">
                <h3 className="text-2xl font-black italic uppercase text-white mb-8">Mağaza Envanter Kontrolü</h3>
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest leading-none mb-10">SİSTEMDEKİ DİJİTAL VARLIKLARIN YÖNETİMİ</p>

                <div className="grid lg:grid-cols-2 gap-8">
                    {products.map((p: any) => (
                        <div key={p.id} className="p-8 bg-zinc-950 border border-white/5 rounded-[32px] flex items-center justify-between group hover:border-blue-500/20 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-700">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black italic uppercase text-white">{p.name}</span>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{p.category} • STOK: {p.stock}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-2xl font-black italic text-blue-500 tracking-tighter">₺{p.price}</span>
                                <Button variant="outline" className="w-10 h-10 rounded-lg border-white/5 bg-white/5 text-red-500 hover:bg-red-600 hover:text-white">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
                <Button className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest shadow-xl">
                    <Plus className="w-4 h-4 mr-2" /> YENİ ÜRÜN EKLE
                </Button>
            </div>
        </div>
    );
}
