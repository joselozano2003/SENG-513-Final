import React from "react";

// components
import Avatars from "../../../components/Avatars";
import QandA from "../../components/QandA";
import JoinStuff from "../../../components/JoinStuff";
import CoolButton from "../../components/CoolButton";
import GameTitle from "../../components/GameTitle";

// interfaces
import { Player } from "../../../components/Avatars";

export default function GamePage() {
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
        <div className="text-white flex flex-col justify-between h-full">
            <div className="h-0.5">{/* for proper spacing of the middle section (probably a terrible solution) */}</div>
            <div className="absolute self-center bg-gray-100 bg-opacity-10 rounded-xl p-5">
                <GameTitle title="Trivia Game" fontSize="text-6xl md:text-4xl" />
            </div>
            <div className="flex justify-between">
                <div className="flex justify-center w-5/12">
                    <div className="border-2 border-opacity-5 w-fit p-5">
                        <Avatars players={players} gridLayout={2} bg="none" gap="game" showPoints={true} />
                    </div>
                </div>
                <QandA />
            </div>
            <div className="flex justify-between items-end">
                <div className="w-fit p-4 bg-gray-100 bg-opacity-10 rounded-full">
                    <JoinStuff />
                </div>
                <CoolButton href="/trivia-game/55555/end" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                    go to end screen (temporary)
                </CoolButton>
                <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                    Quit
                </CoolButton>
            </div>
        </div>
    );
}
