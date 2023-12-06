import React from "react";
import Image from "next/image";
import GameTitle from "../../components/GameTitle";
import Avatars, { Player } from "../../components/Avatars";
import CoolButton from "../../components/CoolButton";
import JoinStuff from "@/app/(games)/components/JoinStuff";
import styles from "./styles.module.css";

interface Props {
    params: {
        id: string;
    };
}

export default function page({ params }: Props) {
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

    // Get player data from DB

    return (
        <div className="flex flex-col w-full h-full items-center pt-3">
            <div className="flex flex-row">
                <div className="h-3/5 w-12 relative self-center mr-40">
                    <Image src={"/chat-box.png"} alt={"chat box"} fill className={`${styles.animateResize}`} />
                </div>
                <GameTitle title="Prompt Game" />
                <div className="h-3/5 w-12 relative self-center ml-40">
                    <Image src={"/chat-box.png"} alt={"chat box"} fill className={`${styles.animateResizeReverse}`} />
                </div>
            </div>
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
                    <div className="bg-blue-200 bg-opacity-40 rounded-full w-fit p-8">
                        <JoinStuff id={id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
