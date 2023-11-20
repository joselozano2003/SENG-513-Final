import React from "react";
import styles from "./styles.module.css";

// import { Black_Ops_One } from "next/font/google";

// components
import GameTitle from "../../components/GameTitle";
import CoolButton from "../../components/CoolButton";
import Avatars from "../../components/Avatars";
import JoinStuff from "../../components/JoinStuff";

// const bo1 = Black_Ops_One({ weight: "400", subsets: ["latin"] });

export default function TriviaLobby() {
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
                    <Avatars gridLayout="columns" bg={true} gap="lobby" points={false} />
                    <div className={`w-fit mx-auto mt-12 text-xl p-7 bg-gray-100 bg-opacity-10 rounded-full`}>
                        <JoinStuff />
                    </div>
                </div>
            </div>
            {/* <div className="absolute bottom-0 m-10">
                <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                    Back to Main Menu
                </CoolButton>
            </div> */}
        </div>
    );
}
