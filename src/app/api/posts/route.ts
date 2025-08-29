import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/posts -> список всех постов
export async function GET() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: true },
    });
    return NextResponse.json(posts);
}

// POST /api/posts -> создать новый пост
export async function POST(req: Request) {
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

    const post = await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            authorId: user.id,
            published: true,
        },
    });

    return NextResponse.json(post);
}
