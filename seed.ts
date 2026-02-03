import { PrismaClient, Role, SubscriptionTier } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Full-Scale Seeding started...');

    const hashedPassword = await bcrypt.hash('Kerimbaba07', 10);
    const adminEmail = 'mironintelligence@gmail.com';

    // 1. Core Games
    const games = [
        { name: 'Valorant', slug: 'valorant', image: '/images/games/valorant-hero.jpg' },
        { name: 'Counter-Strike 2', slug: 'cs2', image: '/images/games/cs2-hero.jpg' },
        { name: 'PUBG Mobile', slug: 'pubg-mobile', image: '/images/games/pubg-hero.jpg' }
    ];

    for (const game of games) {
        await prisma.game.upsert({
            where: { slug: game.slug },
            update: { image: game.image },
            create: game
        });
    }

    // 2. Subscriptions
    const subs = [
        { name: SubscriptionTier.WEEKLY, price: 399.99, durationDays: 7, features: ["2 Ücretsiz Turnuva", "Haftalık Rozet"] },
        { name: SubscriptionTier.MONTHLY, price: 1199.99, durationDays: 30, features: ["10 Ücretsiz Turnuva", "Görev Erişimi", "Aylık Rozet"] },
        { name: SubscriptionTier.THREE_MONTH, price: 2499.00, durationDays: 90, features: ["15 Ücretsiz Turnuva", "Görev Erişimi", "%10 Market İndirimi", "VIP Rozet"] }
    ];

    for (const sub of subs) {
        await prisma.subscription.upsert({
            where: { name: sub.name },
            update: { price: sub.price, features: sub.features, durationDays: sub.durationDays },
            create: sub
        });
    }

    // 3. Admin User
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword,
            role: Role.ADMIN,
            walletBalance: 10000,
            rankId: 'Grandmaster'
        },
        create: {
            email: adminEmail,
            name: 'Miron Admin',
            password: hashedPassword,
            role: Role.ADMIN,
            walletBalance: 10000,
            rankId: 'Grandmaster',
            level: 100
        }
    });

    // 4. Sample Shop Items
    const products = [
        { name: 'VP 1250', description: 'Valorant Points for skins', price: 250, image: '/images/shop/vp.jpg', category: 'Currency' },
        { name: 'Steam Gift Card ₺100', description: 'Card for Steam balance', price: 110, image: '/images/shop/steam.jpg', category: 'Gift Cards' }
    ];

    for (const product of products) {
        await prisma.product.create({ data: product });
    }

    console.log('✨ Seeding complete: ExA Platform base ready.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
