import React from "react";
import CoolButton from "../../components/CoolButton";

export default function page() {
    return (
        <div
            className="absolute top-0 left-0 flex flex-col justify-end items-center pb-10"
            style={{
                backgroundImage: `url("/trivia-intro.png")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                width: "100vw",
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
