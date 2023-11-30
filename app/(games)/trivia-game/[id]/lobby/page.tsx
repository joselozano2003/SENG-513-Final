import React from "react";
import styles from "./styles.module.css";

// import { Black_Ops_One } from "next/font/google";

// components
import GameTitle from "../../components/GameTitle";
import CoolButton from "../../components/CoolButton";
import Avatars from "../../../components/Avatars";
import JoinStuff from "../../../components/JoinStuff";

// interfaces
import { Player } from "../../../components/Avatars";

// const bo1 = Black_Ops_One({ weight: "400", subsets: ["latin"] });

export default function TriviaLobby() {
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
                    <GameTitle title="Trivia Game" />
                    <CoolButton href="/trivia-game/55555/intro" textSize="text-3xl">
                        Start Game
                    </CoolButton>
                </div>
                <div>
                    <Avatars players={players} gridLayout="2x4" bg="grey" gap="lobby" showPoints={false} />
                    <div className={`w-fit mx-auto mt-12 text-xl p-7 bg-gray-100 bg-opacity-10 rounded-full`}>
                        <JoinStuff />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 m-10">
                <CoolButton href="/trivia-game/55555/lobby" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                    Back to Main Menu
                </CoolButton>
            </div>
        </div>
    );
}
