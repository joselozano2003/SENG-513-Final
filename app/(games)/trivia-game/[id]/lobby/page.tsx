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

import {toast} from "react-hot-toast";

interface Props {
    params: {
        id: string;
    };
}

export default async function TriviaLobby({ params }: Props) {
    const { id } = params; // get the game id from the params

    const cookieStore = cookies(); // get cookies from the request

    const supabase = createClient(cookieStore); // create a supabase client with the cookies

    const supabaseAuth = createServerComponentClient({ cookies }); // create a supabase auth client with the cookies

    const {
        data: { session },
    } = await supabase.auth.getSession(); // get the session from the cookies

    if (!session) {
        return redirect("/unauthenticated"); // redirect to the unauthenticated page if there is no session
    }

    const userId = session!.user.id; // get the user id from the session

    // Get the game data from the database
    let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id).eq("admin", userId);

    // If there is an error, log it and alert the user
    if (error1) {
        console.log(error1);
        alert(error1.message);
    }

    // If there is no data, redirect to the main menu
    console.log(triviaGame);

    // If there is no data, redirect to the main menu
    if (triviaGame?.length === 0) {
        return (
            <div className="text-center text-2xl font-bold">
                <h1 className="mb-4">You are not the owner of the game</h1>
                <CoolButton href={"/"} textSize="text-2xl">
                    Back to Main Menu
                </CoolButton>
            </div>
        );
    }

    // If there is no data, redirect to the main menu
    console.log(triviaGame![0].id);


    // Get the player data from the database
    let { data: playerData, error: error2, count } = await supabase.from("triviaGamePlayer").select("*", { count: "exact" }).eq("gameId", id);


    // If there is an error, log it and alert the user
    if (error2) {
        console.log(error2);
        alert(error2.message);
    }
 
    // Players placeholder form images and names
    const players: Player[] = [
        { name: "Player 1", img: "/player-1.png", },
        { name: "Player 2", img: "/player-2-cursed.png",},
        { name: "Player 3", img: "/player-3.png",  },
        { name: "Player 4", img: "/player-4.png", },
        { name: "Player 5", img: "/player-5.png", },
        { name: "Player 6", img: "/player-6.png", },
        { name: "Player 7", img: "/player-7.png", },
        { name: "Player 8", img: "/player-8.png", },
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
                    <div className={`w-fit mx-auto mt-12 text-xl p-7 bg-gray-100 bg-opacity-10 rounded-full`}>
                        <JoinStuff id={id} />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 m-10">
                {/* <Link href={"/"}>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-4 px-4" 
                        rounded-md transition duration-300 ease-in-out transform hover:scale-100`}
                        style={{ textShadow: `2px 2px 10px blue` }}>
                        Back to Main Menu
                    </button>
                </Link> */}
                <CoolButton href="/" textSize="text-lg" padding="py-4 px-2">Back to Main Menu</CoolButton>
            </div>
        </div>
    );
}
