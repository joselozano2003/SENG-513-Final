import React from "react";
import GridCard from "./GridCard";
import { Player } from "@/app/(games)/components/Avatars";

interface PlayerResponse {
    playerName: string;
    answer: string;
}

interface PromptAndResponsesProps {
    players: Player[];
    prompt: string;
    playerResponses: PlayerResponse[];
}

const PromptAndResponses = ({ players, prompt, playerResponses }: PromptAndResponsesProps) => {
    const totalResponses = 8;

    const responses = [
        ...playerResponses,
        ...Array(totalResponses - playerResponses.length).fill({
            playerName: "",
            answer: "",
        }),
    ];

    responses.sort(() => Math.random() - 0.5);

    // const responses = [
    //     ...playerResponses
    // ]

    // responses.sort(() => Math.random() - 0.5);

    // // add in as many blank cards as needed
    // for (let i = responses.length; i < totalResponses; i++) {
    //     responses.push({ playerName: "", answer: "" });
    // }

    responses.splice(4, 0, { playerName: "", answer: prompt });

    return (
        <div className="grid grid-cols-3 grid-rows-3 w-2/3 h-full self-center gap-4">
            {responses.map((response, index) => (
                <GridCard
                    key={index}
                    isPrompt={index === 4}
                    playerName={response.playerName}
                    answer={response.answer}
                    avatar={players.find((player) => player.name === response.playerName)?.img || ""}
                    points={players.find((player) => player.name === response.playerName)?.points || 0}
                />
            ))}
        </div>
    );
};

export default PromptAndResponses;
