import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const post = await prisma.post.findUnique({
        where: { id: params.id },
        include: { author: true },
    });
    if (!post) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const post = await prisma.post.update({
        where: { id: params.id },
        data: {
            title: data.title,
            content: data.content,
            published: data.published ?? true,
        },
    });

    return NextResponse.json(post);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.post.delete({ where: { id: params.id } });

    return NextResponse.json({ ok: true });
}
