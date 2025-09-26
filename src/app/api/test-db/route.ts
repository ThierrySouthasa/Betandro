// /pages/api/test-db.ts

import { PrismaClient } from "../../../generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ success: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

