import React from "react";
import styles from "./styles.module.css";

interface GameTitleProps {
    title: string;
    fontSize?: string;
}

// Component for the game title
// Displays the title of the game in a cool way given a certain input string
const GameTitle: React.FC<GameTitleProps> = ({ title, fontSize = "text-8xl md:text-6xl" }: GameTitleProps) => {
    const [firstWord, secondWord] = title.split(" ");

    return (
        <div className={`flex flex-col justify-between items-center text-white`} style={{ textShadow: "5px 5px darkblue" }}>
            <h1 className={`font-bold text-primary ${fontSize} mr-20 ${styles.gameTitle}`}>{firstWord}</h1>
            <h1 className={`font-bold text-primary ${fontSize} ml-20 ${styles.gameTitle}`}>{secondWord}</h1>
        </div>
    );
};

export default GameTitle;
