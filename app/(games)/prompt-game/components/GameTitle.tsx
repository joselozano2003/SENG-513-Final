import React from "react";

interface GameTitleProps {
    title: string;
}
export default function GameTitle({ title }: GameTitleProps) {
    return (
        <div className="flex">

            <div className="bg-white border-2 border-black p-4 text-center text-6xl md:text-4xl font-bold text-black rounded-xl self-center">{title}</div>
        </div>
    );
}
