import React from "react";
import GameTitle from "../../components/GameTitle";
import CoolButton from "../../components/CoolButton";
import PromptAndResponses from "../../components/PromptAndResponses";
import { Player } from "@/app/(games)/components/Avatars";

export default function page() {
    const players: Player[] = [
        { name: "Player 1", img: "/player-1.png", points: 0 },
        { name: "Player 2", img: "/player-2-cursed.png", points: 999 },
        { name: "Player 3", img: "/player-3.png", points: 0 },
        { name: "Player 4", img: "/player-4.png", points: 0 },
        { name: "Player 5", img: "/player-5.png", points: 0 },
        { name: "Player 6", img: "/player-6.png", points: 0 },
        { name: "Player 7", img: "/player-7.png", points: 0 },
        { name: "Player 8", img: "/player-8.png", points: 0 },
    ];

    const mockPlayerResponses = [
        { playerName: "Player 1", answer: "Answer 1" },
        { playerName: "Player 2", answer: "Answer 2" },
        { playerName: "Player 3", answer: "Answer 3" },
        { playerName: "Player 4", answer: "Answer 4" },
        // { playerName: "Player5", answer: "Answer 5" },
        // { playerName: "Player6", answer: "Answer 6" },
    ];
    return (
        <div className="flex justify-between items-center flex-col w-full h-full">
            <GameTitle title="Prompt Game" />
            <div className="flex justify-center my-10 h-full w-full">
                <PromptAndResponses players={players} prompt={"This is a prompt for the users to respond to! haha!"} playerResponses={mockPlayerResponses} />
            </div>
            <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                Quit
            </CoolButton>
        </div>
    );
}
