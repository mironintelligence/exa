import Link from 'next/link';
import Image from 'next/image';
import { getGames } from '@/actions/games';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function HomePage() {
    const games = await getGames();

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="container mx-auto px-4 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        ExA Gaming Platform
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Choose your game and compete in tournaments
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {games.map((game) => {
                        const isActive = game.status === 'ACTIVE';
                        const isComingSoon = game.status === 'COMING_SOON';

                        if (isActive) {
                            return (
                                <Link key={game.id} href={`/tournaments/${game.slug}`}>
                                    <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900 hover:border-purple-500 transition-all duration-300 cursor-pointer h-full">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-video">
                                                <Image
                                                    src={game.image}
                                                    alt={game.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                                                <Badge className="bg-green-600 hover:bg-green-700">
                                                    ACTIVE
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        }

                        if (isComingSoon) {
                            return (
                                <Card
                                    key={game.id}
                                    className="relative overflow-hidden border-zinc-800 bg-zinc-900 opacity-80 cursor-not-allowed h-full"
                                >
                                    <CardContent className="p-0">
                                        <div className="relative aspect-video grayscale">
                                            <Image
                                                src={game.image}
                                                alt={game.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                                <Badge className="bg-yellow-600 text-white text-lg px-6 py-2">
                                                    YAKINDA
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold mb-2 text-zinc-400">
                                                {game.name}
                                            </h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}
