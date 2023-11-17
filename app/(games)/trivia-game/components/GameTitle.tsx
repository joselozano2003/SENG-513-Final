import React from "react";

interface GameTitleProps {
    title: string;
}

const GameTitle: React.FC<GameTitleProps> = ({ title }: GameTitleProps) => {
    return (
        <div className="mt-5 ml-5 p-5 inline-block bg-purple-400 border rounded-xl">
            <h1 className="font-bold text-primary text-6xl">{title}</h1>
        </div>
    );
};

export default GameTitle;
