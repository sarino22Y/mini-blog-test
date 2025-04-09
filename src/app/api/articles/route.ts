import { PrismaClient } from '@/app/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const articles = await prisma.article.findMany();
  return NextResponse.json(articles.map((article) => ({
    ...article,
    createdAt: article.createdAt.toISOString(),
  })));
}