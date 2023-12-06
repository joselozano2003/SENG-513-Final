"use client";

import React from "react";
import Image from "next/image";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface Player {
    name: string;
    img: string;
    points: number;
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

    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        const channel = supabase
            .channel(`realtime:triviaGamePlayer:gameId=eq.${gameId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "triviaGamePlayer",
                },
                () => {
                    router.refresh();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);

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
