import React from "react";

interface AvatarProps {
    player: string;
}

function Avatar({ player }: AvatarProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300"></div>
            <p className="mt-2 text-white">{player}</p>
        </div>
    );
}

export default function Avatars() {
    // could probably rework the player names to be whatever nickname they join the game with
    const players = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"];

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 gap-x-36 gap-y-24 w-fit p-20 bg-gray-100 bg-opacity-5 rounded-lg">
                {players.map((player, index) => (
                    <Avatar key={index} player={player} />
                ))}
            </div>
        </div>
    );
}
