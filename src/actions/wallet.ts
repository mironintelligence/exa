'use server';

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function requestWithdrawal(amount: number, iban: string, fullName: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Yetkisiz erişim");

    const userId = (session.user as any).id;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user || user.walletBalance < amount) throw new Error("Yetersiz bakiye");

    // Deduct immediately
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
    return { success: true };
}

export async function buySubscription(planId: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Yetkisiz erişim");

    const userId = (session.user as any).id;
    const plan = await db.subscription.findUnique({ where: { id: planId } });
    if (!plan) throw new Error("Plan bulunamadı");

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || user.walletBalance < plan.price) throw new Error("Yetersiz bakiye");

    await db.user.update({
        where: { id: userId },
        data: { walletBalance: { decrement: plan.price } }
    });

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    await db.userSubscription.create({
        data: {
            userId,
            subscriptionId: planId,
            startDate: new Date(),
            endDate
        }
    });

    await db.transaction.create({
        data: {
            userId,
            amount: -plan.price,
            type: 'SUBSCRIPTION',
            status: 'COMPLETED'
        }
    });

    revalidatePath('/profile');
    return { success: true };
}
