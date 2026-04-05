import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q } }, // No mode: 'insensitive' for SQLite in basic setup, but let's try or handle it
          { description: { contains: q } },
          { category: { contains: q } },
        ],
      },
      take: 8,
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
