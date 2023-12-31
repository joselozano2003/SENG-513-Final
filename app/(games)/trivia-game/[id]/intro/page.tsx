import React from "react";
import CoolButton from "../../components/CoolButton";

// Intro page for the trivia game
export default function page() {
    return (
        <div
            className="h-screen w-screen flex flex-col justify-end items-center pb-10"
            style={{
                backgroundImage: `url("/trivia-intro.png")`,
                // backgroundPosition: "center",
                // backgroundSize: "contain",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                margin: "-4vh -3vw", // done to offset what layout.tsx does for the padding of each page
            }}
        >
            <div className="flex justify-center ml-80 animate-bounce">
                <CoolButton href={"/trivia-game/55555/game"} textSize={"text-5xl"} color="green">
                    Click to Play!
                </CoolButton>
            </div>
        </div>
    );
}
