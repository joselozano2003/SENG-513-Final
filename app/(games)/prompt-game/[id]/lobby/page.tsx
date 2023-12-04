import React from "react";
import GameTitle from "../../components/GameTitle";
import Avatars, { Player } from "../../components/Avatars";
import CoolButton from "../../components/CoolButton";
import JoinStuff from "@/app/(games)/components/JoinStuff";

export default function page() {
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

    return (
        <div className="flex flex-col w-full h-full items-center pt-3">
            <GameTitle title="Prompt Game" />
            <div className="flex flex-row w-full h-full">
                <div className="flex flex-col justify-between w-1/2">
                    <div></div>
                    <div>
                        <Avatars gridLayout={4} bg={"none"} gap={"lobby"} showPoints={false} />
                        <div className="flex justify-center items-center mt-16">
                            <CoolButton href="/prompt-game/55555/intro" textSize="text-3xl">
                                Start Game
                            </CoolButton>
                        </div>
                    </div>
                    <CoolButton href="/prompt-game/55555/lobby" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                        Back to Main Menu
                    </CoolButton>
                </div>
                <div className="flex flex-col justify-center items-center w-1/2">
                    <div className="bg-blue-200 bg-opacity-70 rounded-lg w-fit p-8">
                        <JoinStuff />
                    </div>
                </div>
            </div>
        </div>
    );
}
