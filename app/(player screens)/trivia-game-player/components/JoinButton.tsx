"use client";

import Link from "next/link";
import React from "react";

interface JoinButtonProps {
    href: string;
    textSize: string;
    padding?: string;
    hoverScale?: string;
    color?: string;
    children: React.ReactNode;
    handleClick: () => void;
}


const JoinButton: React.FC<JoinButtonProps> = ({textSize, padding, hoverScale, color, handleClick }) => {
    const colorClasses = color === "green" ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";

    return (
        <button
            onClick={handleClick}
            className={`${colorClasses} text-white ${textSize} font-bold ${
                padding || "py-6 px-8"
            } rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
            style={{ textShadow: `2px 2px 10px ${textShadowColor}`}}>
        </button>
    );
};

export default JoinButton;
