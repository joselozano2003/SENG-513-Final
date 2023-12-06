import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

import GameTitle from "../../components/GameTitle";
import CoolButton, {StartButton} from "../../components/CoolButton";
import Avatars from "../../components/Avatars";
import JoinStuff from "../../../components/JoinStuff";

// interfaces
import { Player } from "../../components/Avatars";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

interface Props {
    params: {
        id: string;
    };
}

export default async function TriviaLobby({ params }: Props) {
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

    let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id).eq("admin", userId);

    if (error1) {
        console.log(error1);
        alert(error1.message);
    }
    console.log(triviaGame);
    console.log(triviaGame![0].id);

    let { data: playerData, error: error2, count } = await supabase.from("triviaGamePlayer").select("*", { count: "exact" }).eq("gameId", id);

    if (error2) {
        console.log(error2);
        alert(error2.message);
    }
    console.log(`Player data: ${playerData}, count: ${count}`);

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
        <div className={`flex flex-col justify-center h-full border-4 rounded-2xl ${styles.neonBorder}`}>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col justify-evenly items-center">
                    <div className="flex flex-row">
                        <div className="h-3/5 w-12 relative self-center mr-14">
                            <Image src={"/white-question-mark.png"} alt={"question mark"} fill className={`${styles.rotateRight}`} />
                        </div>
                        <GameTitle title="Trivia Game" />
                        <div className="h-3/5 w-12 relative self-center ml-14">
                            <Image src={"/white-question-mark.png"} alt={"question mark"} fill className={`${styles.rotateLeft}`} />
                        </div>                    </div>
                    <StartButton textSize="text-3xl" gameId={triviaGame![0].id}>
                        Start Game
                    </StartButton>
                </div>
                <div>
                    <div className={styles.neonBorder} style={{ "--neon-border-size": "5px" } as React.CSSProperties}>
                        <Avatars gridLayout={4} bg="grey" gap="lobby" showPoints={false} gameId={id} playerData={playerData} playerCount={count!} />
                    </div>
                    <div className={`w-fit mx-auto mt-12 p-7 bg-gray-100 bg-opacity-10 rounded-full`}>
                        <JoinStuff id={id} />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 m-10">
                <Link href={"/"}>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-4 px-4" 
                        rounded-md transition duration-300 ease-in-out transform hover:scale-100`}
                        style={{ textShadow: `2px 2px 10px blue` }}>
                        Back to Main Menu
                    </button>
                </Link>
            </div>
        </div>
    );
}
