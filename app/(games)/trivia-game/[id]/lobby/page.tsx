import React from "react";
import Link from "next/link";

//components
import GameTitle from "../../components/GameTitle";
import BackgroundBox from "../../components/BackgroundBox";
import CoolButton from "../../components/CoolButton";
import Image from "next/image";
import triviaBackground from "public/trivia-background.jpg";
export default function TriviaLobby() {
    const styling = {
        backgroundImage: `url(${triviaBackground.src})`,
        // <a href="https://www.freepik.com/free-vector/pink-blue-neon-frame-neon-frame-dark-background-vector_25519175.htm#query=neon%20design&position=29&from_view=keyword&track=ais&uuid=4dca27a6-d051-4271-8515-cbb20617a721">Image by rawpixel.com</a> on Freepik
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "6rem 6vw"
    };

    return (
        <div className="flex justify-between h-screen bg-cover" style={styling}>
            <div className="flex flex-col justify-between w-1/3">
                <div>
                    <GameTitle title="Trivia Game" />
                    <div className="flex flex-col items-center pt-20">
                        <CoolButton href="/trivia-game/55555/game" textSize="text-3xl">
                            Start Game
                        </CoolButton>
                    </div>
                </div>
                <div className="flex justify-start m-8">
                    <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                        Back to Main Menu
                    </CoolButton>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end bg-blue-200">
                <div className="grid grid-cols-4 gap-4 bg-purple-200">
                    <div className="w-16 h-16 bg-gray-300"></div>
                    <div className="w-16 h-16 bg-gray-300"></div>
                    <div className="w-16 h-16 bg-gray-300"></div>
                    <div className="w-16 h-16 bg-gray-300"></div>
                    <div className="w-16 h-16 bg-gray-300"></div>
                    <div className="w-16 h-16 bg-gray-300"></div>
                    <div className="w-16 h-16 bg-gray-300"></div>
                    <div className="w-16 h-16 bg-gray-300"></div>
                </div>
                <div className="bg-pink-200">
                    <p className="text-blue-500 underline">Join the lobby</p>
                    <p>Join code: 55555</p>
                </div>
            </div>
        </div>
    );
}
