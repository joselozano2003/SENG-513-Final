import React, { useState } from "react";

// components
import Avatars from "../../components/Avatars";
import JoinStuff from "../../components/JoinStuff";
import CoolButton from "../../components/CoolButton";
import QuestionTimer from "../../components/QuestionTimer";

export default function GamePage() {
    const question = "The answer to this question is c.";
    const answers = [""];

    return (
        <div className="text-white">
            <div className="flex flex-col">
                <div>
                    <QuestionTimer />
                </div>
                <div className="flex justify-between">
                    <Avatars gridLayout="rows" bg={false} />
                </div>
                <div className="flex justify-between items-end">
                    <div className="bg-gray-100 bg-opacity-10 rounded-full w-fit p-4">
                        <JoinStuff />
                    </div>
                    <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                        Quit
                    </CoolButton>
                </div>
            </div>
        </div>
    );
}
