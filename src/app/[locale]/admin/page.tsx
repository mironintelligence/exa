import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminPage from "./AdminView";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/');
    }

    const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });
    const games = await db.game.findMany();
    const pendingWithdrawals = await db.transaction.findMany({
        where: { type: 'WITHDRAW', status: 'PENDING' },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <AdminPage
            users={users}
            games={games}
            pendingWithdrawals={pendingWithdrawals}
        />
    );
}
