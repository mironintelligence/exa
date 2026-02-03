'use server';

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function depositMoney(amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const userId = (session.user as any).id;

    await db.user.update({
        where: { id: userId },
        data: { walletBalance: { increment: amount } }
    });

    await db.transaction.create({
        data: {
            userId,
            amount,
            type: 'DEPOSIT',
            status: 'COMPLETED'
        }
    });

    revalidatePath('/wallet');
    return { success: true };
}

export async function requestWithdrawal(amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const userId = (session.user as any).id;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user || user.walletBalance < amount) throw new Error("Insufficient balance");

    // Deduct immediately to prevent double spending
    await db.user.update({
        where: { id: userId },
        data: { walletBalance: { decrement: amount } }
    });

    await db.transaction.create({
        data: {
            userId,
            amount,
            type: 'WITHDRAW',
            status: 'PENDING'
        }
    });

    revalidatePath('/wallet');
    return { success: true };
}
