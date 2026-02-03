'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Role, TournamentStatus } from "@prisma/client";

export async function adminUpdateUser(userId: string, data: any) {
    await db.user.update({
        where: { id: userId },
        data
    });
    revalidatePath('/admin');
}

export async function adminProcessWithdrawal(txId: string, action: 'COMPLETED' | 'REJECTED') {
    const tx = await db.transaction.findUnique({ where: { id: txId } });
    if (!tx) throw new Error("İşlem bulunamadı");

    if (action === 'REJECTED') {
        // Refund
        await db.user.update({
            where: { id: tx.userId },
            data: { walletBalance: { increment: Math.abs(tx.amount) } }
        });
    }

    await db.transaction.update({
        where: { id: txId },
        data: { status: action }
    });

    revalidatePath('/admin');
}

export async function adminCreateTournament(data: any) {
    await db.tournament.create({
        data: {
            ...data,
            startDate: new Date(data.startDate)
        }
    });
    revalidatePath('/admin');
    revalidatePath('/tournaments');
}

export async function adminDeclareWinner(tournamentId: string, winnerId: string) {
    const tourney = await db.tournament.findUnique({ where: { id: tournamentId } });
    if (!tourney) throw new Error("Turnuva bulunamadı");

    await db.$transaction([
        db.tournament.update({
            where: { id: tournamentId },
            data: { status: 'FINISHED', winnerId }
        }),
        db.user.update({
            where: { id: winnerId },
            data: { walletBalance: { increment: tourney.prizePool }, xp: { increment: 500 } }
        }),
        db.transaction.create({
            data: { userId: winnerId, amount: tourney.prizePool, type: 'REWARD', status: 'COMPLETED' }
        })
    ]);

    revalidatePath('/admin');
    revalidatePath('/tournaments');
}

export async function adminCreateQuest(data: any) {
    await db.quest.create({ data });
    revalidatePath('/admin');
}

export async function adminCreateGame(data: any) {
    await db.game.create({ data });
    revalidatePath('/admin');
}
