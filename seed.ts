import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Professional Seeding started...');

    // Create Games
    const games = [
        {
            name: 'Valorant',
            slug: 'valorant',
            image: '/images/games/valorant-hero.jpg',
        },
        {
            name: 'Counter-Strike 2',
            slug: 'cs2',
            image: '/images/games/cs2-hero.jpg',
        },
        {
            name: 'PUBG Mobile',
            slug: 'pubg-mobile',
            image: '/images/games/pubg-hero.jpg',
        },
    ];

    for (const game of games) {
        await prisma.game.upsert({
            where: { name: game.name },
            update: {},
            create: game,
        });
    }

    // Create Subscriptions
    const subscriptions = [
        {
            name: 'Haftalık',
            price: 399.99,
            durationDays: 7,
            features: ['2 Ücretsiz Turnuva Katılımı'],
        },
        {
            name: 'Aylık',
            price: 1199.99,
            durationDays: 30,
            features: ['10 Ücretsiz Turnuva Katılımı', 'Günlük/Haftalık Görev Erişimi'],
        },
        {
            name: '3 Aylık',
            price: 2499.00,
            durationDays: 90,
            features: ['15 Ücretsiz Turnuva Katılımı', 'Quests', 'Tüm Turnuvalarda %10 İndirim'],
        },
    ];

    for (const sub of subscriptions) {
        await prisma.subscription.upsert({
            where: { name: sub.name },
            update: {},
            create: sub,
        });
    }

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@exa.com' },
        update: {},
        create: {
            email: 'admin@exa.com',
            name: 'Administrator',
            password: hashedPassword,
            role: 'ADMIN',
            walletBalance: 1000000,
            rank: 'Radiant',
            level: 99,
        },
    });

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
