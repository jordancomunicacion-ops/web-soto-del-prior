import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding CRM Customer Data...');

    // Clear existing
    await prisma.campaignLog.deleteMany({});
    await prisma.customerProfile.deleteMany({});

    const customers = [
        {
            firstName: 'Isabella',
            lastName: 'Nguyen',
            email: 'isabella.n@example.com',
            phone: '+34 600 111 222',
            systemTags: 'HOTEL_GUEST',
            totalSpend: 299.00,
            consentEmail: true,
            lastInteraction: new Date('2024-12-01')
        },
        {
            firstName: 'Jackson',
            lastName: 'Lee',
            email: 'jackson.lee@example.com',
            phone: '+34 600 333 444',
            systemTags: 'RESTAURANT_DINER',
            totalSpend: 39.50,
            consentWhatsApp: true,
            lastInteraction: new Date('2024-12-20')
        },
        {
            firstName: 'Olivia',
            lastName: 'Martin',
            email: 'olivia.m@example.com',
            phone: '+34 600 555 666',
            systemTags: 'HOTEL_GUEST, SHOP_BUYER',
            totalSpend: 1999.00,
            consentEmail: true,
            consentWhatsApp: true,
            lastInteraction: new Date('2024-12-22')
        },
        {
            firstName: 'Elena',
            lastName: 'Gomez',
            email: 'elena.g@example.com',
            phone: '+34 600 777 888',
            systemTags: 'RESTAURANT_DINER',
            totalSpend: 85.00,
            consentEmail: false,
            lastInteraction: new Date('2024-11-15')
        },
        {
            firstName: 'Marco',
            lastName: 'Rossi',
            email: 'marco.r@example.com',
            phone: '+34 600 999 000',
            systemTags: 'SHOP_BUYER',
            totalSpend: 120.00,
            consentWhatsApp: true,
            lastInteraction: new Date('2024-10-30')
        }
    ];

    for (const c of customers) {
        await prisma.customerProfile.create({ data: c });
    }

    console.log(`✅ Added ${customers.length} customer profiles.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
