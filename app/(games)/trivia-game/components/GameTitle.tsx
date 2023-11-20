import React from "react";

interface GameTitleProps {
  title: string;
  fontSize?: string;
}

const GameTitle: React.FC<GameTitleProps> = ({ title, fontSize = "text-8xl" }: GameTitleProps) => {
    const [firstWord, secondWord] = title.split(" ");

    return (
        <div className="flex flex-col justify-between items-center text-white" style={{ textShadow: "5px 5px darkblue"}}>
            <h1 className={`font-bold text-primary ${fontSize} mr-20`}>{firstWord}</h1>
            <h1 className={`font-bold text-primary ${fontSize} ml-20`}>{secondWord}</h1>
        </div>
    );
};

export default GameTitle; 