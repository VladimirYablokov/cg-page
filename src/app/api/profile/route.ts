import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { profile: true },
    });

    return NextResponse.json(user?.profile || null);
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedProfile = await prisma.profile.upsert({
        where: { userId: user.id },
        update: {
            bio: data.bio ?? null,
            image: data.image ?? null,
            website: data.website ?? null,
        },
        create: {
            userId: user.id,
            bio: data.bio ?? null,
            image: data.image ?? null,
            website: data.website ?? null,
        },
    });

    return NextResponse.json(updatedProfile);
}
