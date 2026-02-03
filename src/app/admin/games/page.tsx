import { getGames, toggleGameStatus } from '@/actions/games';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GameStatus } from '@prisma/client';

async function GameStatusButton({
    gameId,
    newStatus,
    label,
}: {
    gameId: string;
    newStatus: GameStatus;
    label: string;
}) {
    return (
        <form action={async () => {
            'use server';
            await toggleGameStatus(gameId, newStatus);
        }}>
            <Button type="submit" variant="outline" size="sm">
                {label}
            </Button>
        </form>
    );
}

export default async function AdminGamesPage() {
    const games = await getGames();

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="container mx-auto px-4 py-12">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Game Management</h1>
                    <p className="text-zinc-400">Manage game statuses and availability</p>
                </header>

                <div className="grid gap-4 max-w-4xl">
                    {games.map((game) => (
                        <Card key={game.id} className="border-zinc-800 bg-zinc-900">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl mb-2">{game.name}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={
                                                    game.status === 'ACTIVE'
                                                        ? 'default'
                                                        : game.status === 'COMING_SOON'
                                                            ? 'secondary'
                                                            : 'outline'
                                                }
                                                className={
                                                    game.status === 'ACTIVE'
                                                        ? 'bg-green-600'
                                                        : game.status === 'COMING_SOON'
                                                            ? 'bg-yellow-600'
                                                            : ''
                                                }
                                            >
                                                {game.status}
                                            </Badge>
                                            <span className="text-sm text-zinc-500">
                                                Slug: {game.slug}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <GameStatusButton
                                            gameId={game.id}
                                            newStatus="ACTIVE"
                                            label="ACTIVATE"
                                        />
                                        <GameStatusButton
                                            gameId={game.id}
                                            newStatus="COMING_SOON"
                                            label="COMING SOON"
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-zinc-400">
                                    <p>Image: {game.image}</p>
                                    <p>
                                        Created: {new Date(game.createdAt).toLocaleDateString()}
                                    </p>
                                    <p>
                                        Updated: {new Date(game.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
