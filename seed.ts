import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Veritabanı tohumlanıyor...')

  // PUBG Mobile
  await prisma.game.upsert({
    where: { slug: 'pubg-mobile' },
    update: {},
    create: {
      name: 'PUBG Mobile',
      slug: 'pubg-mobile',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
      // @ts-ignore
      status: 'ACTIVE'
    }
  })

  // CS:GO
  await prisma.game.upsert({
    where: { slug: 'csgo' },
    update: {},
    create: {
      name: 'Counter-Strike 2',
      slug: 'csgo',
      image: 'https://images.unsplash.com/photo-1624138784181-dc7f5b750318?auto=format&fit=crop&q=80',
      // @ts-ignore
      status: 'ACTIVE'
    }
  })

  // Admin Hesabı
  const adminEmail = "mironintelligence@gmail.com"
  await prisma.user.upsert({
    where: { email: adminEmail },
    // @ts-ignore
    update: { role: 'ADMIN', balance: 10000 },
    create: {
      email: adminEmail,
      name: "Kerim Baba",
      // @ts-ignore
      role: 'ADMIN',
      // @ts-ignore
      balance: 10000
    }
  })

  console.log("✅ Veritabanı başarıyla güncellendi!")
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })