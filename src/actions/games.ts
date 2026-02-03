'use server';

import { db } from '@/lib/db';
import { GameStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getGames() {
    try {
        const games = await db.game.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        return games;
    } catch (error) {
        console.error('Failed to fetch games:', error);
        return [];
    }
}

export async function toggleGameStatus(id: string, newStatus: GameStatus) {
    try {
        await db.game.update({
            where: { id },
            data: { status: newStatus },
        });
        revalidatePath('/');
        revalidatePath('/admin/games');
        return { success: true };
    } catch (error) {
        console.error('Failed to update game status:', error);
        return { success: false, error: 'Failed to update game status' };
    }
}
