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
    // onClick: () => void;
}


const JoinButton: React.FC<JoinButtonProps> = ({ href, textSize, padding, hoverScale, color, children }) => {
    const colorClasses = color === "green" ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";

    return (
        <Link href={href}>
            <button
            // onClick={onClick}
                className={`${colorClasses} text-white ${textSize} font-bold ${
                    padding || "py-6 px-8"
                } rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
                style={{ textShadow: `2px 2px 10px ${textShadowColor}`}}>

                {children}
            </button>
        </Link>
    );
};

export default JoinButton;
