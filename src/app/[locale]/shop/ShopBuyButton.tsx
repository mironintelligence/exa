"use client";

import { buyProduct } from "@/actions/economy";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ShopBuyButton({ productId, session, price }: { productId: string, session: any, price: number }) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        if (!session) return router.push('/auth/login');

        setLoading(true);
        try {
            await buyProduct(productId);
            toast({ title: "BAŞARILI!", description: "Ürün satın alındı. E-posta adresinize kod gönderildi." });
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "HATA", description: e.message });
            if (e.message.includes("bakiye")) {
                setTimeout(() => router.push('/wallet'), 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleBuy}
            disabled={loading}
            className="w-full h-16 rounded-[24px] bg-white text-black hover:bg-zinc-200 font-black uppercase text-xs tracking-[0.2em] shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all disabled:opacity-50"
        >
            {loading ? 'İŞLENİYOR...' : 'SATIN AL'}
        </Button>
    );
}
