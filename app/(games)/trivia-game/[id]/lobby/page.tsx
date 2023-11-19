import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

// assets
import triviaBackground from "public/trivia-background.jpg";
import blackBrickBackground from "public/black-brick-wall-textured-background.jpg";
// import { Black_Ops_One } from "next/font/google";

// components
import GameTitle from "../../components/GameTitle";
import CoolButton from "../../components/CoolButton";
import Avatars from "../../components/Avatars";
import JoinStuff from "../../components/JoinStuff";

// const bo1 = Black_Ops_One({ weight: "400", subsets: ["latin"] });

export default function TriviaLobby() {
    // const bgStyling = {
    //     backgroundImage: `url(${blackBrickBackground.src})`,
    //     // <a href="https://www.freepik.com/free-vector/pink-blue-neon-frame-neon-frame-dark-background-vector_25519175.htm#query=neon%20design&position=29&from_view=keyword&track=ais&uuid=4dca27a6-d051-4271-8515-cbb20617a721">Image by rawpixel.com</a> on Freepik
    //     // <a href="https://www.freepik.com/free-photo/black-brick-wall-textured-background_3475675.htm#query=black%20brick%20wall&position=1&from_view=search&track=ais&uuid=b7b18b50-2020-476b-95e9-4440c4d181eb">Image by rawpixel.com</a> on Freepik
    //     backgroundSize: "100% 100%",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //     padding: "7vh 5vw",
    // };

    return (
        // <div className={`h-screen bg-cover`}>
        <div className={`flex flex-col justify-center h-full border-4 rounded-2xl ${styles.neonBorder}`}>
            <div className="flex flex-row justify-evenly">
                <div>
                    <GameTitle title="Trivia Game" />
                    <div className="flex flex-col items-center pt-20">
                        <CoolButton href="/trivia-game/55555/game" textSize="text-3xl">
                            Start Game
                        </CoolButton>
                    </div>
                </div>
                <div>
                    <Avatars gridLayout="columns" bg={true} />
                    <div className={`w-fit mx-auto mt-12 text-xl p-7 bg-gray-100 bg-opacity-10 rounded-full`}>
                        <JoinStuff />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 m-10">
                <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                    Back to Main Menu
                </CoolButton>
            </div>
        </div>
        // </div>
    );
}
