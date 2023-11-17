import React from "react";

//components
import GameTitle from "../../components/GameTitle";
import BackgroundBox from "../../components/BackgroundBox";

export default function page() {
    return (
        <div className="bg-blue-500 min-h-screen flex ">
            <BackgroundBox>
                <GameTitle title="Trivia Game" />
            </BackgroundBox>
        </div>
    );
}
