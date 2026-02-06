"use client";

import { followQuest } from "@/actions/economy";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function QuestFollowButton({ questId, session }: { questId: string, session: any }) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        if (!session) return router.push('/auth/login');

        setLoading(true);
        try {
            await followQuest(questId);
            toast({ title: "OPERASYON BAŞLADI", description: "Görev takibe alındı. Başarılar asker!" });
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "HATA", description: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleFollow}
            disabled={loading}
            className="h-14 px-10 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black uppercase text-[10px] tracking-widest shadow-xl italic disabled:opacity-50"
        >
            {loading ? 'YÜKLENİYOR...' : 'TAKİP ET'}
        </Button>
    );
}
