import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";


export async function POST(request: NextRequest) {
    const data = await request.json();

    const trivia = await prisma.triviaGame.create({
        data: {
            state: 1,
            playerLimit: data.playerLimit,
            admin: data.admin,
        },
    });

    return NextResponse.json(trivia.id);
}