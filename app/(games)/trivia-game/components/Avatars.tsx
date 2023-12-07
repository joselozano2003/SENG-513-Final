"use client";

import React from "react";
import Image from "next/image";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Interfaces
export interface Player {
    name: string;
    img: string;
}

interface AvatarsProps {
    gridLayout: number;
    bg: "none" | "grey" | "white";
    gap: "lobby" | "game";
    showPoints: true | false;
    gameId: string;
    playerData: any;
    playerCount: number;
}
 
export default function Avatars({ gridLayout, bg, gap, showPoints, gameId, playerData, playerCount }: AvatarsProps) {

    // Array of player objects to display in the avatars
    const players: Player[] = [
        { name: "Player 1", img: "/player-1.png"},
        { name: "Player 2", img: "/player-2-cursed.png"},
        { name: "Player 3", img: "/player-3.png"},
        { name: "Player 4", img: "/player-4.png"},
        { name: "Player 5", img: "/player-5.png"},
        { name: "Player 6", img: "/player-6.png"},
        { name: "Player 7", img: "/player-7.png"},
        { name: "Player 8", img: "/player-8.png"},
    ];

    const supabase = createClientComponentClient(); // create a supabase client with the cookies
    const router = useRouter(); // get the router

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
    is used to subscribe to a Supabase channel for real-time updates. */
    useEffect(() => {
        const channel = supabase
            .channel(`realtime:triviaGamePlayer:gameId=eq.${gameId}`) // subscribe to the channel
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "triviaGamePlayer", // listen for changes to the triviaGamePlayer table
                },
                () => {
                    router.refresh(); // refresh the page when a change is detected
                }
            )
            .subscribe(); // subscribe to the channel

        return () => {
            supabase.removeChannel(channel); // unsubscribe from the channel when the component is unmounted
        };
    }, [supabase, router]); // the `useEffect` hook will run when the `supabase` or `router` variables change

    // const gridClass = gridLayout === "columns" ? "grid-cols-4" : "grid-rows-4 grid-cols-2";
    const bgClass = bg ? "bg-gray-100 bg-opacity-10 p-7" : "";
    const gapClass = gap === "lobby" ? "gap-y-4 gap-x-12 md:gap-y-4 md:gap-x-12" : "gap-4 md:gap-2";

    return (
        <div className="flex justify-center items-center">
            <div className={`grid grid-cols-${gridLayout} ${bgClass} rounded-lg ${gapClass}`}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex items-center">
                        {playerData[index] ? (
                            <>
                                {/* Map to create avatars from game data*/}
                                <Avatar player={`Player ${index + 1}`} imgSrc={players[index].img} />
                                {showPoints && <div className="ml-4 whitespace-nowrap w-20 text-center text-2xl text-green-500 font-bold">{playerData[index].score}</div>}
                            </>
                        ) : (
                            <PlaceholderAvatar />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface AvatarProps {
    player: string;
    imgSrc: string;
}

function Avatar({ player, imgSrc }: AvatarProps) {
    return (
        <div className="flex flex-col items-center">
            <Image src={imgSrc} alt={player} width={64} height={64} />
            <p className="mt-2 text-white">{player}</p>
        </div>
    );
}

function PlaceholderAvatar() {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-16 md:h-16 border-4 border-dotted border-gray-400 rounded-full bg-transparent"></div>
            <p className="mt-2 text-white">&nbsp;</p>
        </div>
    );
}
