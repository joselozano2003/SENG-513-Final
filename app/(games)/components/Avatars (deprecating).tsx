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

export interface Player {
    name: string;
    img: string;
    points: number | undefined;
}

interface AvatarsProps {
    players: Player[];
    gridLayout: number;
    bg: "none" | "grey" | "white";
    gap: "lobby" | "game";
    showPoints: true | false;
}

export default function Avatars({ players, gridLayout, bg, gap, showPoints }: AvatarsProps) {
    // const gridClass = `grid-cols-${columns} grid-rows-${rows}`;
    const bgClass = bg === "none" ? "" : `bg-${bg}`;
    const gapClass = gap === "lobby" ? "gap-y-4 gap-x-12 md:gap-y-4 md:gap-x-12" : "gap-4 md:gap-2";

    return (
        <div className="flex justify-center items-center overflow-hidden">
            <div className={`grid grid-cols-${gridLayout} ${bgClass} rounded-lg ${gapClass}`}>
                {players.map((player, index) => (
                    <div key={index} className="flex items-center">
                        <Avatar player={player.name} imgSrc={player.img} />
                        {showPoints && <div className="ml-4 whitespace-nowrap w-20 text-center text-2xl text-green-500 font-bold">{player.points}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}