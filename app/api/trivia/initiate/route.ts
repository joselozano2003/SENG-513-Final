import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {

    const data = await request.json();

    const gameId = data.gameId;

    const questionIds = generateUniqueNumbers();

    console.log(questionIds);

    const game = await prisma.triviaGame.findUnique({
        where: {
            id: gameId,
        },
    });

    if (game!.state != 1) {
        return NextResponse.json(200);
    }

    const trivia = await prisma.triviaGame.update({
        where: {
            id: gameId,
        },
        data: {
            state: 2,
            questions: {
                connect: questionIds.map((id: number) => ({
                    id: id,
                })),
            },
        },
    })

    return NextResponse.json(200);

}


function generateUniqueNumbers(): number[] {
    let arr = Array.from({length: 13}, (_, i) => i + 1); // Create an array [1, 2, ..., 13]
    let result = [];

    for (let i = 0; i < 8; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length); // Get a random index
        result.push(arr[randomIndex]); // Add the element at the random index to the result
        arr.splice(randomIndex, 1); // Remove the element at the random index from arr
    }
    console.log(result);
    return result;
}