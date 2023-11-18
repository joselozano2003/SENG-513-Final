import React from "react";

interface GameTitleProps {
    title: string;
}

const GameTitle: React.FC<GameTitleProps> = ({ title }: GameTitleProps) => {
    const [firstWord, secondWord] = title.split(" ");

    return (
        <div className="flex flex-col justify-between items-center text-white mt-24">
            <h1 className="font-bold text-primary text-8xl" style={{ textShadow: "5px 5px blue", marginRight: "20%" }}>
                {firstWord}
            </h1>
            <h1 className="font-bold text-primary text-8xl ml-20" style={{ textShadow: "5px 5px blue", marginLeft: "20%" }}>
                {secondWord}
            </h1>
        </div>
    );
};

export default GameTitle;
