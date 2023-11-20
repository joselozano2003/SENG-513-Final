import React, { useState } from "react";

// components
import Avatars from "../../components/Avatars";
import QandA from "../../components/QandA";
import JoinStuff from "../../components/JoinStuff";
import CoolButton from "../../components/CoolButton";
import QuestionTimer from "../../components/QuestionTimer";
import GameTitle from "../../components/GameTitle";

export default function GamePage() {
    const question = "The answer to this question is c.";
    const answers = [""];

    return (
        <div className="text-white flex flex-col justify-between h-full">
            <div className="h-0.5">
                {/* for proper spacing of the middle section (probably a terrible solution) */}
            </div>
            <div className="absolute self-center bg-gray-100 bg-opacity-10 rounded-xl p-5">
                <GameTitle title="Trivia Game" fontSize="text-6xl" />
            </div>
            <div className="flex justify-between">
                <div className="w-5/12 py-7 border-2 border-opacity-5 ">
                    <Avatars gridLayout="rows" bg={false} />
                </div>
                <QandA />
            </div>
            <div className="flex justify-between items-end">
                <div className="w-fit p-4 bg-gray-100 bg-opacity-10 rounded-full">
                    <JoinStuff />
                </div>
                <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                    Quit
                </CoolButton>
            </div>
        </div>
    );
}
