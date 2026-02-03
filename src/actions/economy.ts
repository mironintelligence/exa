'use server';

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// WALLET ACTIONS
export async function depositSimulated(amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Giriş yapmalısınız");

    await db.user.update({
        where: { id: (session.user as any).id },
        data: { walletBalance: { increment: amount } }
    });

    await db.transaction.create({
        data: {
            userId: (session.user as any).id,
            amount,
            type: 'DEPOSIT',
            status: 'COMPLETED'
        }
    });

    revalidatePath('/wallet');
}

export async function requestWithdrawal(amount: number, iban: string, fullName: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Giriş yapmalısınız");

    const userId = (session.user as any).id;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user || user.walletBalance < amount) throw new Error("Yetersiz bakiye");

    // Deduct immediately (Atomic-like)
    await db.user.update({
        where: { id: userId },
        data: { walletBalance: { decrement: amount } }
    });

    await db.transaction.create({
        data: {
            userId,
            amount: -amount,
            type: 'WITHDRAW',
            status: 'PENDING',
            iban,
            fullName
        }
    });

    revalidatePath('/wallet');
}

export async function transferVirtualCash(targetEmail: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Giriş yapmalısınız");

    const senderId = (session.user as any).id;
    const sender = await db.user.findUnique({ where: { id: senderId } });
    const target = await db.user.findUnique({ where: { email: targetEmail } });

    if (!sender || sender.walletBalance < amount) throw new Error("Yetersiz bakiye");
    if (!target) throw new Error("Kullanıcı bulunamadı");

    await db.$transaction([
        db.user.update({ where: { id: senderId }, data: { walletBalance: { decrement: amount } } }),
        db.user.update({ where: { id: target.id }, data: { walletBalance: { increment: amount } } }),
        db.transaction.create({
            data: { userId: senderId, amount: -amount, type: 'TRANSFER', status: 'COMPLETED', targetEmail }
        }),
        db.transaction.create({
            data: { userId: target.id, amount, type: 'TRANSFER', status: 'COMPLETED' }
        })
    ]);

    revalidatePath('/wallet');
}

// TOURNAMENT ACTIONS
export async function joinTournament(tournamentId: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Giriş yapmalısınız");

    const userId = (session.user as any).id;
    const tournament = await db.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) throw new Error("Turnuva bulunamadı");

    const user = await db.user.findUnique({
        where: { id: userId },
        include: { userSubscriptions: { where: { endDate: { gt: new Date() }, freeEntriesLeft: { gt: 0 } } } }
    });

    if (!user) throw new Error("Kullanıcı hatası");

    const sub = user.userSubscriptions[0];

    if (sub) {
        // Use free entry
        await db.userSubscription.update({
            where: { id: sub.id },
            data: { freeEntriesLeft: { decrement: 1 } }
        });
    } else {
        // Pay fee
        if (user.walletBalance < tournament.entryFee) throw new Error("Yetersiz bakiye. Lütfen para yatırın veya abone olun.");

        await db.user.update({
            where: { id: userId },
            data: { walletBalance: { decrement: tournament.entryFee } }
        });

        await db.transaction.create({
            data: { userId, amount: -tournament.entryFee, type: 'ENTRY_FEE', status: 'COMPLETED' }
        });
    }

    // Note: In a real app, you'd add to a Participants table. For this MVP, we revalidate.
    revalidatePath('/tournaments');
}

// SUBSCRIPTION ACTIONS
export async function buySubscription(tier: 'WEEKLY' | 'MONTHLY' | 'THREE_MONTH') {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Giriş yapmalısınız");

    const plan = await db.subscription.findUnique({ where: { name: tier } });
    if (!plan) throw new Error("Plan bulunamadı");

    const userId = (session.user as any).id;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user || user.walletBalance < plan.price) throw new Error("Yetersiz bakiye");

    const freeEntries = tier === 'WEEKLY' ? 2 : (tier === 'MONTHLY' ? 10 : 15);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    await db.$transaction([
        db.user.update({ where: { id: userId }, data: { walletBalance: { decrement: plan.price }, subscriptionTier: tier } }),
        db.userSubscription.create({
            data: { userId, subscriptionId: plan.id, startDate: new Date(), endDate, freeEntriesLeft: freeEntries }
        }),
        db.transaction.create({
            data: { userId, amount: -plan.price, type: 'SUBSCRIPTION', status: 'COMPLETED' }
        })
    ]);

    revalidatePath('/profile');
}
