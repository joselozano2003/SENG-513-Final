import React from "react";
import Image from "next/image";

interface AvatarProps {
    player: string;
    imgSrc: string;
}

function Avatar({ player, imgSrc }: AvatarProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 relative">
                <Image src={imgSrc} alt={player} layout="fill" />
            </div>
            <p className="mt-2 text-white">{player}</p>
        </div>
    );
}

interface AvatarsProps {
    gridLayout: 'columns' | 'rows';
    bg: true | false;
}

export default function Avatars({ gridLayout, bg }: AvatarsProps) {
    // could probably rework the player names to be whatever nickname they join the game with
    const players = [
        { name: "Player 1", img: "/player-1.png" },
        { name: "Player 2", img: "/player-2-cursed.png" },
        { name: "Player 3", img: "/player-3.png" },
        { name: "Player 4", img: "/player-4.png" },
        { name: "Player 5", img: "/player-5.png" },
        { name: "Player 6", img: "/player-6.png" },
        { name: "Player 7", img: "/player-7.png" },
        { name: "Player 8", img: "/player-8.png" },
    ];

    const gridClass = gridLayout === 'columns' ? 'grid-cols-4' : 'grid-rows-4 grid-cols-2';
    const bgClass = bg ? 'bg-gray-100 bg-opacity-10 p-7' : '';
    const gapClass = bg ? 'gap-3rem 5rem' : 'gap-3rem 5rem';


    return (
        <div className="flex justify-center items-center">
            <div className={`grid ${gridClass} ${bgClass} rounded-lg`} style={{ gap: "3rem 5rem" }}>
                {players.map((player, index) => (
                    <Avatar key={index} player={player.name} imgSrc={player.img} />
                ))}
            </div>
        </div>
    );
}
