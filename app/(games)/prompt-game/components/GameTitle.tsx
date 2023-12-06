import React from "react";
import styles from "./styles.module.css"

interface GameTitleProps {
    title: string;
}
export default function GameTitle({ title }: GameTitleProps) {
    return (
        <div className="flex justify-center bg-white border-2 border-black p-4 text-center text-6xl md:text-4xl font-bold text-black rounded-xl self-center">
            {title.split('').map((char, i) => (
                <span 
                    key={i} 
                    className={styles.animateSnake}
                    style={{ animationDelay: `${i * 0.2}s` }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
