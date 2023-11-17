import React from "react";

interface GameTitleProps {
    title: string;
}

const GameTitle: React.FC<GameTitleProps> = ({ title }: GameTitleProps) => {
    return (
        <div className="m-16 p-7 inline-block text-white rounded-xl">
            <h1 className="font-bold text-primary text-6xl">{title}</h1>
        </div>
    );
};

export default GameTitle;
