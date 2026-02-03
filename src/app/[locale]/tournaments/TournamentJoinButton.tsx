"use client";

import { joinTournament } from "@/actions/economy";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function TournamentJoinButton({ tournamentId, session }: { tournamentId: string, session: any }) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleJoin = async () => {
        if (!session) return router.push('/auth/login');

        setLoading(true);
        try {
            await joinTournament(tournamentId);
            toast({ title: "BAŞARILI!", description: "Turnuvaya katıldın. Takım detayları mail adresine gönderilecek." });
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "HATA", description: e.message });
            if (e.message.includes("bakiye")) {
                // Proactive UX: redirect to wallet or subscription
                setTimeout(() => router.push('/wallet'), 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleJoin}
            disabled={loading}
            className="h-14 flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
            {loading ? 'SİSTEME GİRİLİYOR...' : 'KATILIM İSTEĞİ GÖNDER'}
        </Button>
    );
}
