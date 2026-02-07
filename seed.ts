import { PrismaClient } from '@prisma/client'

// Prisma Client'ı global tanımla veya yeni oluştur
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Veritabanı tohumlanıyor...')

  // 1. OYUNLARI OLUŞTUR (PUBG Mobile & CS:GO)
  // PUBG Mobile
  await prisma.game.upsert({
    where: { slug: 'pubg-mobile' },
    update: {},
    create: {
      name: 'PUBG Mobile',
      slug: 'pubg-mobile',
      image: '/images/games/pubg.jpg', // Resim yolunu sonra eklersin
      status: 'ACTIVE'
    }
  })

  // CS:GO (Counter-Strike 2)
  await prisma.game.upsert({
    where: { slug: 'csgo' },
    update: {},
    create: {
      name: 'Counter-Strike 2',
      slug: 'csgo',
      image: '/images/games/cs2.jpg',
      status: 'ACTIVE'
    }
  })
  
  // Eski Valorant varsa onu pasife çek veya sil (Opsiyonel)
  try {
      await prisma.game.update({
          where: { slug: 'valorant' },
          data: { status: 'DISABLED' }
      })
  } catch (e) {
      // Valorant yoksa hata verme devam et
  }

  // 2. ADMIN HESABI OLUŞTUR
  const adminEmail = "mironintelligence@gmail.com"
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { 
        role: 'ADMIN', 
        balance: 10000 
    },
    create: {
      email: adminEmail,
      name: "Kerim Baba",
      role: 'ADMIN',
      balance: 10000
    }
  })

  console.log("✅ Veritabanı başarıyla güncellendi: PUBG Mobile ve CS:GO aktif!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })