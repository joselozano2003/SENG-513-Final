import React from "react";
import styles from "./styles.module.css";

import { prisma } from "@/lib/prisma";

import GameTitle from "../../components/GameTitle";
import CoolButton from "../../components/CoolButton";
import Avatars from "../../../components/Avatars";
import JoinStuff from "../../../components/JoinStuff";

// interfaces
import { Player } from "../../../components/Avatars";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


interface Props {
    params: {
        id: string;
    };
}

export default async function TriviaLobby({ params }: Props) {

    const { id } = params

    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const supabaseAuth = createServerComponentClient({ cookies })

    const { data: { session }} = await supabase.auth.getSession()

    if (!session) {
        return redirect('/unauthenticated')
    }

    const userId = session!.user.id

    let { data: triviaGame, error: error1 } = await supabase
        .from('triviaGame')
        .select('*')
        .eq('id', id)
        .eq('admin', userId)
        

    if (error1) {
        console.log(error1)
        alert(error1.message)
    }
    console.log(triviaGame)

    let { data: playerData, error: error2, count } = await supabase
        .from('triviaGamePlayer')
        .select('*', { count: 'exact' })
        .eq('gameId', id);

    if (error2) {
        console.log(error2)
        alert(error2.message)
    }
    console.log(playerData, count)

    const players: Player[] = [
        { name: "Player 1", img: "/player-1.png", points: 0 },
        { name: "Player 2", img: "/player-2-cursed.png", points: 999 },
        { name: "Player 3", img: "/player-3.png", points: 0 },
        { name: "Player 4", img: "/player-4.png", points: 0 },
        { name: "Player 5", img: "/player-5.png", points: 0 },
        { name: "Player 6", img: "/player-6.png", points: 0 },
        { name: "Player 7", img: "/player-7.png", points: 0 },
        { name: "Player 8", img: "/player-8.png", points: 0 },
    ];

    return (
        <div className={`flex flex-col justify-center h-full border-4 rounded-2xl ${styles.neonBorder} w-[95vw]`}>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col justify-evenly items-center">
                    <GameTitle title="Trivia Game" />
                    <CoolButton href={`/trivia-game/${id}/intro`} textSize="text-3xl">
                        Start Game
                    </CoolButton>
                </div>
                <div>
                    <Avatars players={players} gridLayout={4} bg="grey" gap="lobby" showPoints={false} gameId={id} playerData={playerData} playerCount={count!}/>
                    <div className={`w-fit mx-auto mt-12 text-xl p-7 bg-gray-100 bg-opacity-10 rounded-full`}>
                        <JoinStuff id={id}/>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 m-10">
                <CoolButton href={`/trivia-game/${id}/lobby`} textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                    Back to Main Menu
                </CoolButton>
            </div>
        </div>
    );
}
