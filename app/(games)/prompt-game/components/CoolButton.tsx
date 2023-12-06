"use client";

import Link from "next/link";
import React from "react";
import toast from 'react-hot-toast';
import styles from "./styles.module.css";

interface CoolButtonProps {
    href: string;
    textSize: string;
    padding?: string;
    hoverScale?: string;
    color?: string;
    children: React.ReactNode;
}

const CoolButton: React.FC<CoolButtonProps> = ({ href, textSize, padding, hoverScale, color, children }) => {
    // const colorClasses = color === "green" ? "bg-green-600 hover:bg-green-700" : "bg-blue-700 hover:bg-blue-700";
    const colorClasses = color === "green" ? "bg-green-600" : "bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";
    const animColorClasses = color === "green" ? "#00960d" : "#2432ff";

    return (
        <Link href={href}>
            {/* <button
                className={`${colorClasses} text-white ${textSize} font-bold ${
                    padding || "py-6 px-8"
                } rounded-md border-2 border-black transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
                style={{ textShadow: `2px 2px 10px ${textShadowColor} ${styles.CoolButton}` }}
            > */}
            <button
                className={`${colorClasses} text-white ${textSize} font-bold ${padding || "py-6 px-8"} rounded-md border-2 border-black ${styles.slidingButton}`}
                style={{ textShadow: `2px 2px 10px ${textShadowColor}`, ['--button-color']: animColorClasses  } as React.CSSProperties}
            >
                {children}
            </button>
        </Link>
    );
};

export default CoolButton;
