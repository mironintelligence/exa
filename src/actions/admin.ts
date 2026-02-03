'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createGame(data: { name: string, slug: string, image: string }) {
    const game = await db.game.create({ data });
    revalidatePath('/admin');
    return game;
}

export async function createTournament(data: {
    title: string,
    gameId: string,
    entryFee: number,
    prizePool: number,
    startDate: Date,
    maxParticipants: number,
    isOfficial: boolean
}) {
    const tournament = await db.tournament.create({ data });
    revalidatePath('/admin');
    revalidatePath('/tournaments');
    return tournament;
}

export async function processWithdrawal(id: string, status: 'COMPLETED' | 'REJECTED') {
    const tx = await db.transaction.findUnique({ where: { id } });
    if (!tx) throw new Error("İşlem bulunamadı");

    if (status === 'REJECTED') {
        // Refund user
        await db.user.update({
            where: { id: tx.userId },
            data: { walletBalance: { increment: Math.abs(tx.amount) } }
        });
    }

    await db.transaction.update({
        where: { id },
        data: { status }
    });

    revalidatePath('/admin');
    return { success: true };
}
