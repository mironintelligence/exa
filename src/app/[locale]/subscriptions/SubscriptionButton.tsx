"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buySubscription } from "@/actions/wallet";
import { useRouter } from "next/navigation";

export default function SubscriptionButton({ planId, currentBalance, price }: { planId: string, currentBalance: number, price: number }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleBuy = async () => {
        if (currentBalance < price) {
            alert("Yetersiz Bakiye! Lütfen para yatırın.");
            router.push('/wallet');
            return;
        }
        setLoading(true);
        try {
            await buySubscription(planId);
            alert("Abonelik aktif edildi!");
            router.refresh();
        } catch (e) {
            alert("Hata oluştu");
        }
        setLoading(false);
    };

    return (
        <Button
            onClick={handleBuy}
            disabled={loading}
            className="h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl"
        >
            {loading ? "İŞLENİYOR..." : "HEMEN BAŞLA"}
        </Button>
    );
}
