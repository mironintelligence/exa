'use server';

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function joinTournament(tournamentId: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const userId = (session.user as any).id;
    const tournament = await db.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) throw new Error("Tournament not found");

    const user = await db.user.findUnique({
        where: { id: userId },
        include: { subscriptions: { where: { endDate: { gt: new Date() } } } }
    });

    if (!user) throw new Error("User not found");

    // Check subscription free limit
    const activeSub = user.subscriptions[0];
    if (activeSub && activeSub.tournamentsJoinedCount < (activeSub as any).freeLimit) {
        // Join via subscription
        await db.userSubscription.update({
            where: { id: activeSub.id },
            data: { tournamentsJoinedCount: { increment: 1 } }
        });
    } else {
        // Join via wallet
        if (user.walletBalance < tournament.entryFee) throw new Error("Insufficient balance");

        await db.user.update({
            where: { id: userId },
            data: { walletBalance: { decrement: tournament.entryFee } }
        });

        await db.transaction.create({
            data: {
                userId,
                amount: tournament.entryFee,
                type: 'ENTRY_FEE',
                status: 'COMPLETED'
            }
        });
    }

    revalidatePath(`/tournaments/${tournamentId}`);
    revalidatePath('/profile');
    return { success: true };
}
