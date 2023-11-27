import React from "react";
import Image from "next/image";

interface AvatarProps {
    player: string;
    imgSrc: string;
}

function Avatar({ player, imgSrc }: AvatarProps) {
    return (
        <div className="flex flex-col items-center">
            <Image src={imgSrc} alt={player} width={64} height={64} />
            <p className="mt-2 text-white">{player}</p>
        </div>
    );
}

interface Player {
    name: string;
    img: string;
    points: number;
}

interface AvatarsProps {
    gridLayout: "columns" | "rows";
    bg: true | false;
    gap: "lobby" | "game";
    points: true | false;
}

export default function Avatars({ gridLayout, bg, gap, points }: AvatarsProps) {
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

    const gridClass = gridLayout === "columns" ? "grid-cols-4" : "grid-rows-4 grid-cols-2";
    const bgClass = bg ? "bg-gray-100 bg-opacity-10 p-7" : "";
    const gapClass = gap === "lobby" ? "gap-y-4 gap-x-12 md:gap-y-4 md:gap-x-12" : "gap-4 md:gap-2";

    return (
        <div className="flex justify-center items-center">
            <div className={`grid ${gridClass} ${bgClass} rounded-lg ${gapClass}`}>
                {players.map((player, index) => (
                    <div key={index} className="flex items-center">
                        <Avatar player={player.name} imgSrc={player.img} />
                        {points && (
                            <div className="ml-4 whitespace-nowrap w-20 text-center text-2xl text-green-500 font-bold">{player.points}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
