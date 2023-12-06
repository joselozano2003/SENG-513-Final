import React from "react";
import GameTitle from "../../components/GameTitle";
import Avatars, { Player } from "../../components/Avatars";
import CoolButton from "../../components/CoolButton";
import JoinStuff from "@/app/(games)/components/JoinStuff";

// interfaces 
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

import {toast} from "react-hot-toast";

interface Props {
    params: {
        id: string;
    };
}

export default async function page({ params }: Props) {
    // const players: Player[] = [
    //     { name: "Player 1", img: "/player-1.png", points: 0 },
    //     { name: "Player 2", img: "/player-2-cursed.png", points: 999 },
    //     { name: "Player 3", img: "/player-3.png", points: 0 },
    //     { name: "Player 4", img: "/player-4.png", points: 0 },
    //     { name: "Player 5", img: "/player-5.png", points: 0 },
    //     { name: "Player 6", img: "/player-6.png", points: 0 },
    //     { name: "Player 7", img: "/player-7.png", points: 0 },
    //     { name: "Player 8", img: "/player-8.png", points: 0 },
    // ];

    const { id } = params;

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const supabaseAuth = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return redirect("/unauthenticated");
    }

    const userId = session!.user.id;

    let { data: promptGame, error: error1 } = await supabase.from("promptGame").select("*").eq("id", id).eq("admin", userId);

    if (error1) {
        console.log(error1);
        alert(error1.message);
    }
    console.log(promptGame);

    if (promptGame?.length === 0) {
        return (
            <div className="text-center text-2xl font-bold">
                <h1 className="mb-4">You are not the owner of the game</h1>
                <CoolButton href={"/"} textSize="text-2xl">
                    Back to Main Menu
                </CoolButton>
            </div>
        );
    }
    console.log(promptGame![0].id);

    let { data: playerData, error: error2, count } = await supabase.from("promptGamePlayer").select("*", { count: "exact" }).eq("gameId", id);

    if (error2) {
        console.log(error2);
        alert(error2.message);
    }
    console.log(`Player data: ${playerData}, count: ${count}`);


    // Get player data from DB

    return (
        <div className="flex flex-col w-full h-full items-center pt-3">
            <GameTitle title="Prompt Game" />
            <div className="flex flex-row w-full h-full">
                <div className="flex flex-col justify-between w-1/2">
                    <div></div>
                    <div>
                        {/* <Avatars gridLayout={4} bg={"none"} gap={"lobby"} showPoints={false} gameId={id}/> */}
                        <div className="flex justify-center items-center mt-16">
                            <CoolButton href="/prompt-game/55555/intro" textSize="text-3xl">
                                Start Game
                            </CoolButton>
                        </div>
                    </div>
                    <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                        Back to Main Menu
                    </CoolButton>
                </div>
                <div className="flex flex-col justify-center items-center w-1/2">
                    <div className="bg-blue-200 bg-opacity-70 rounded-lg w-fit p-8">
                        <JoinStuff id={id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
