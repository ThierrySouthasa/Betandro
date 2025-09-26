import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
    const result = await prisma.pronostic.create({
        data: {
            sport: 'FOOTBALL',
            teamA: 'Paris',
            teamB: 'Marseille',
            odds: 1.8,
            prediction: 'Victoire Paris',
            result: 'PENDING',
            visibleTo: 'FREE',
        },
    });

    console.log('Insertion réussie :', result);
}

main().catch(console.error).finally(() => prisma.$disconnect());
