import React from "react";
import CoolButton from "@/app/(games)/trivia-game/components/CoolButton";
import Avatars, { Player } from "../../components/Avatars";

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

const WinnerAvatar = () => <Avatars gridLayout={4} bg="grey" gap="lobby" showPoints={false} />;

const EndingScreen = () => {
    return (
        <div className={`text-white flex flex-col items-center h-full justify-center`}>
            <div className="mb-4">
                <WinnerAvatar />
            </div>
            <div className="text-2xl font-bold mb-4">Congratulations! Player 1 is the winner!</div>
            <div className="text-lg mb-4">
                <p>Credits:</p>
                <p>Developed by SENG 513 group 16</p>
            </div>
            <CoolButton href="/prompt-game/55555/lobby" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-4">
                Return to Main Menu
            </CoolButton>
        </div>
    );
};

export default EndingScreen;
