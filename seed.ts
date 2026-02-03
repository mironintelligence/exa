import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.game.deleteMany();

    // Create games
    const games = [
        {
            name: 'Counter-Strike 2',
            slug: 'cs2',
            image: '/images/cs2.jpg',
            status: 'ACTIVE' as const,
        },
        {
            name: 'PUBG Mobile',
            slug: 'pubg-mobile',
            image: '/images/pubg.jpg',
            status: 'ACTIVE' as const,
        },
        {
            name: 'Valorant',
            slug: 'valorant',
            image: '/images/valorant.jpg',
            status: 'COMING_SOON' as const,
        },
    ];

    for (const game of games) {
        await prisma.game.create({
            data: game,
        });
        console.log(`✅ Created game: ${game.name}`);
    }

    console.log('✨ Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
