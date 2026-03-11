import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const categories = [
        { name: 'Batik', slug: 'batik', description: 'Traditional Sri Lankan Batik crafts' },
        { name: 'Woodcarving', slug: 'woodcarving', description: 'Intricate woodcarvings from Sri Lanka' },
        { name: 'Brassware', slug: 'brassware', description: 'Authentic Sri Lankan brassware' },
        { name: 'Weaving', slug: 'weaving', description: 'Handwoven Sri Lankan textiles' },
    ]

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
    }

    await prisma.user.upsert({
        where: { email: 'admin@helacrafts.com' },
        update: {},
        create: {
            email: 'admin@helacrafts.com',
            name: 'Super Admin',
            role: 'SUPERADMIN',
        },
    })

    console.log('Seed completed successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
