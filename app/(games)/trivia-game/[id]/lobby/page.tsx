import React from "react";
import Link from "next/link";
import triviaBackground from "public/trivia-background.jpg";

//components
import GameTitle from "../../components/GameTitle";
import BackgroundBox from "../../components/BackgroundBox";
import CoolButton from "../../components/CoolButton";
import Avatars from "../../components/Avatars";
import JoinStuff from "../../components/JoinStuff";

export default function TriviaLobby() {
    const styling = {
        backgroundImage: `url(${triviaBackground.src})`,
        // <a href="https://www.freepik.com/free-vector/pink-blue-neon-frame-neon-frame-dark-background-vector_25519175.htm#query=neon%20design&position=29&from_view=keyword&track=ais&uuid=4dca27a6-d051-4271-8515-cbb20617a721">Image by rawpixel.com</a> on Freepik
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "6rem 6vw",
    };

    return (
        <div className="flex flex-col justify-center h-screen bg-cover" style={styling}>
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
                    <Avatars />
                    <JoinStuff />
                </div>
            </div>
            <div className="absolute bottom-24 m-6">
                <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                    Back to Main Menu
                </CoolButton>
            </div>
        </div>
    );
}
