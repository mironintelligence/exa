'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    return await db.user.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function toggleUserBan(userId: string) {
    const user = await db.user.findUnique({ where: { id: userId } });
    // Ban logic would go here (e.g., adding a isBanned flag to schema)
    revalidatePath('/admin/users');
    return { success: true };
}

export async function createTournament(data: {
    title: string;
    gameId: string;
    entryFee: number;
    prizePool: number;
    startDate: Date;
    maxParticipants: number;
    isOfficial: boolean;
}) {
    const tournament = await db.tournament.create({
        data
    });
    revalidatePath('/tournaments');
    revalidatePath('/admin/tournaments');
    return tournament;
}

export async function approveWithdrawal(transactionId: string) {
    await db.transaction.update({
        where: { id: transactionId },
        data: { status: 'COMPLETED' }
    });
    revalidatePath('/admin/finance');
    return { success: true };
}

export async function setTournamentWinner(tournamentId: string, winnerUserId: string) {
    // Logic to award prizePool to winnerUserId's wallet
    const tournament = await db.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) throw new Error("Tournament not found");

    await db.user.update({
        where: { id: winnerUserId },
        data: {
            walletBalance: { increment: tournament.prizePool }
        }
    });

    await db.transaction.create({
        data: {
            userId: winnerUserId,
            amount: tournament.prizePool,
            type: 'PRIZE',
            status: 'COMPLETED'
        }
    });

    await db.tournament.update({
        where: { id: tournamentId },
        data: { status: 'ENDED' }
    });

    revalidatePath('/tournaments');
    return { success: true };
}
