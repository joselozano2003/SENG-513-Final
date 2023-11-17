import React from "react";

interface GameTitleProps {
    title: string;
}

const GameTitle: React.FC<GameTitleProps> = ({ title }: GameTitleProps) => {
    return (
        <div className="flex justify-center mt-5">
            <h1 className="font-bold text-primary text-3xl">{title}</h1>
        </div>
    );
};

export default GameTitle;
