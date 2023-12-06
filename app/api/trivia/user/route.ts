import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


export async function POST(request: NextRequest) {

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const supabaseAuth = createServerComponentClient({ cookies });

	const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json(403);
    }

    const data = await request.json();

    const { gameId, gameRound, choice, userId} = data;

    console.log(data)

    const { data: triviaPlayerAnswer, error: error1 } = await supabase.from("triviaPlayerAnswer").select("*").eq("gameId", gameId).eq("gameRound", gameRound).eq("userId", userId)

    console.log(triviaPlayerAnswer)

    // If player has already answered, update their answer

    if (triviaPlayerAnswer!.length > 0) {
        console.log("triviaPlayerAnswer exists")
        const { data: triviaPlayerAnswer, error: error2 } = await supabase.from("triviaPlayerAnswer").update({ choice: choice }).eq("gameId", gameId).eq("gameRound", gameRound).eq("userId", userId)
        return NextResponse.json(200);
    }

    else {
        console.log("triviaPlayerAnswer doesn't exist")
        const { data: triviaPlayerAnswer, error: error2 } = await supabase.from("triviaPlayerAnswer").insert([{ gameId: gameId, gameRound: gameRound, choice: choice, userId: userId }])
        return NextResponse.json(200);
    }

}


export async function GET(request: NextRequest) {
    return NextResponse.json({ hello: "world" });
}