import React from "react";

interface GameTitleProps {
    title: string;
}

const GameTitle: React.FC<GameTitleProps> = ({ title }: GameTitleProps) => {
    const [firstWord, secondWord] = title.split(" ");

    return (
        <div className="flex flex-col justify-between items-center text-white mt-20" style={{ textShadow: "5px 7px darkblue" }}>
            <h1 className="font-bold text-primary text-8xl mr-20">{firstWord}</h1>
            <h1 className="font-bold text-primary text-8xl ml-20">{secondWord}</h1>
        </div>
    );
};

export default GameTitle;
