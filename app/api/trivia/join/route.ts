import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from "next/navigation";


export async function POST(request: NextRequest) {

    const data = await request.json();

    const id = data.id;
 
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const supabaseAuth = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    
    if (!session) {
        return NextResponse.json(401);
    }

    const userId = session?.user?.id;

    let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id)

    console.log(triviaGame)

    if (triviaGame?.length == 0) {
        console.log("triviaGame not found")
        return NextResponse.json(404);
    }
    // Game exists, check if user is already in game

    let { data: triviaPlayer, error: error2 } = await supabase.from("triviaGamePlayer").select("*").eq("gameId", id).eq("userId", userId)

    console.log(triviaPlayer)

    if (triviaPlayer!.length > 0) {
        console.log("triviaPlayer already exists")
        return NextResponse.json(200);
    }

    // User is not in game, add them to game

    const playerLimit = triviaGame![0].playerLimit

    if (playerLimit > 0) {
        console.log("playerLimit > 0")
        const playerNumber = 9 - playerLimit 
        const { data: triviaPlayer, error: error3 } = await supabase.from("triviaGamePlayer").insert([{ gameId: id, userId: userId, score:0, playerNumber: playerNumber }])

        if (error3) {
            console.log("error3")
            return NextResponse.json(500);
        }

        const { data: triviaGame, error: error4 } = await supabase.from("triviaGame").update({ playerLimit: playerLimit - 1 }).eq("id", id)

        console.log("Success")
        return NextResponse.json(200);
    }


    return NextResponse.json(triviaGame);

}