import { notFound } from 'next/navigation';
import { getGames } from '@/actions/games';

interface TournamentPageProps {
    params: {
        slug: string;
    };
}

export default async function TournamentPage({ params }: TournamentPageProps) {
    const games = await getGames();
    const game = games.find((g) => g.slug === params.slug);

    if (!game || game.status !== 'ACTIVE') {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="container mx-auto px-4 py-12">
                <header className="mb-8">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {game.name} Tournaments
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Coming soon - Tournament listings will appear here
                    </p>
                </header>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">🏆 Tournaments Coming Soon</h2>
                    <p className="text-zinc-400">
                        We're preparing exciting tournaments for {game.name}. Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    );
}
