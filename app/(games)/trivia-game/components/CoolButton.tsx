"use client";

import Link from "next/link";
import React from "react";

interface CoolButtonProps {
    href: string;
    textSize: string;
    padding?: string;
    hoverScale?: string;
    color?: string;
    children: React.ReactNode;
}

interface TestButtonProps {
    textSize: string;
    padding?: string;
    hoverScale?: string;
    color?: string;
    children: React.ReactNode;
    userId: string;
}

const CoolButton: React.FC<CoolButtonProps> = ({ href, textSize, padding, hoverScale, color, children }) => {
    const colorClasses = color === "green" ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";

    return (
        <Link href={href}>
            <button
                className={`${colorClasses} text-white ${textSize} font-bold ${
                    padding || "py-6 px-8"
                } rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
                style={{ textShadow: `2px 2px 10px ${textShadowColor}` }}
            >
                {children}
            </button>
        </Link>
    );
};

export default CoolButton;


export const TestButton: React.FC<TestButtonProps> = ({ textSize, padding, hoverScale, color, children, userId}) => {
    const colorClasses = color === "green" ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";

    async function handleClick() {
        console.log("Clicked!");

        const res = await fetch("/api/trivia/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                state: 1,
                playerLimit: 8,
                admin: userId,
            }),
        });
        
        const data = await res.json();

        if (!res.ok) {
            console.log("Error creating game");
            console.log(data);
            return;
        }
        else {
            window.location.href = `/trivia-game/${data}/lobby`;
        }

    }
    return (
        <button
            onClick={handleClick} // Add this line
            className={`${colorClasses} text-white ${textSize} font-bold ${
                padding || "py-6 px-8"
            } rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
            style={{ textShadow: `2px 2px 10px ${textShadowColor}` }}
        >
            {children}
        </button>
    );
};