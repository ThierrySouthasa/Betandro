import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation Zod pour sécuriser les entrées
const pronosticSchema = z.object({
    sport: z.enum(['FOOTBALL', 'TENNIS', 'BASKET']),
    teamA: z.string(),
    teamB: z.string(),
    odds: z.number().positive(),
    prediction: z.string(),
    result: z.enum(['PENDING', 'WON', 'LOST']).default('PENDING'),
    visibleTo: z.enum(['FREE', 'BASIC', 'PREMIUM']).default('FREE'),
});

// Handle POST request
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = pronosticSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation error', issues: validation.error.issues },
                { status: 400 }
            );
        }

        const data = validation.data;

        const pronostic = await prisma.pronostic.create({
            data,
        });

        return NextResponse.json(pronostic, { status: 201 });
    } catch (err) {
        console.error('Erreur lors de l’insertion du pronostic :', err);
        return NextResponse.json({ error: 'Erreur serveur', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

// Handle GET request (list pronostics)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const takeParam = searchParams.get('take');
        const skipParam = searchParams.get('skip');

        const take = takeParam ? Math.min(Math.max(parseInt(takeParam, 10) || 0, 0), 100) : 50;
        const skip = skipParam ? Math.max(parseInt(skipParam, 10) || 0, 0) : 0;

        const pronostics = await prisma.pronostic.findMany({
            take,
            skip,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                sport: true,
                teamA: true,
                teamB: true,
                odds: true,
                prediction: true,
                result: true,
                visibleTo: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(pronostics);
    } catch (err) {
        console.error('Erreur lors de la récupération des pronostics :', err);
        return NextResponse.json({ error: 'Erreur serveur', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

// Handle PATCH request (update result)
export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const patchSchema = z.object({
            id: z.number().int().positive(),
            result: z.enum(['PENDING', 'WON', 'LOST']).refine((v) => v !== 'PENDING', {
                message: 'Result must be WON or LOST when updating',
            }),
        });
        const validation = patchSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Validation error', issues: validation.error.issues }, { status: 400 });
        }
        const { id, result } = validation.data;
        const updated = await prisma.pronostic.update({
            where: { id },
            data: { result },
        });
        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error('Erreur lors de la mise à jour du pronostic :', err);
        return NextResponse.json({ error: 'Erreur serveur', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}
