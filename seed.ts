import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Full-Stack Seeding started...');

    // Create Games
    const games = [
        { name: 'Valorant', slug: 'valorant', image: '/images/games/valorant-hero.jpg' },
        { name: 'Counter-Strike 2', slug: 'cs2', image: '/images/games/cs2-hero.jpg' },
        { name: 'PUBG Mobile', slug: 'pubg-mobile', image: '/images/games/pubg-hero.jpg' },
    ];

    for (const game of games) {
        await prisma.game.upsert({
            where: { name: game.name },
            update: {},
            create: game,
        });
    }

    // Create Admin User
    const adminEmail = 'mironintelligence@gmail.com';
    const hashedPassword = await bcrypt.hash('Kerimbaba07', 10);

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword,
            role: 'ADMIN',
            walletBalance: 10000.00
        },
        create: {
            email: adminEmail,
            name: 'Miron Admin',
            password: hashedPassword,
            role: 'ADMIN',
            walletBalance: 10000.00,
            rank: 'Radiant',
            level: 100,
        },
    });

    console.log('✨ Seeding complete: Admin mironintelligence@gmail.com created.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
