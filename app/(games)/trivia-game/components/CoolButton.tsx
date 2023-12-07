"use client";

import Link from "next/link";
import React from "react";
import toast from 'react-hot-toast';

interface CoolButtonProps {
    href: string; // Link to redirect when button is clicked
    textSize: string; // Text size of button
    padding?: string; // Padding of button
    hoverScale?: string; // Scale of button when hovered
    color?: string; // Color of button
    children: React.ReactNode; // Text inside button
}

interface TestButtonProps {
    textSize: string; // Text size of button
    padding?: string; // Padding of button
    hoverScale?: string; // Scale of button when hovered
    color?: string; // Color of button
    children: React.ReactNode; // Text inside button
    userId: string; // User id of the player
}

// Button that is reusable across the app to keep styling consistent
const CoolButton: React.FC<CoolButtonProps> = ({ href, textSize, padding, hoverScale, color, children }) => {
    // Conditional classes for the button according to the color prop
    const colorClasses = color === "green" ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";

    return (
        <Link href={href}>
            <button
                className={`${colorClasses} text-white ${textSize} font-bold ${
                    padding || "py-6 px-8"
                } rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
                style={{ textShadow: `2px 2px 10px ${textShadowColor}` }}>
                {children}
            </button>
        </Link>
    );
};

export default CoolButton;


// Button that is reusable across the app to keep styling consistent but is used to initiate a game
export const TestButton: React.FC<TestButtonProps> = ({ textSize, padding, hoverScale, color, children, userId}) => {

    // Conditional classes for the button according to the color prop
    const colorClasses = color === "green" ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";

    // Function to handle the click of the button
    async function handleClick() {

        // Send a request to the server to create a new game
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
        // Get the response from the server
        const data = await res.json();

        console.log(data);

        // If there is an error, log it
        if (!res.ok) {
            console.log("Error creating game");
            console.log(data);
            return;
        }
        else {
            window.location.href = `/trivia-game/${data}/lobby`; // Redirect to the lobby page of the game
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

interface StartButtonProps {
    textSize: string;
    padding?: string;
    hoverScale?: string;
    color?: string;
    children: React.ReactNode;
    gameId: string;
}

// Button that is reusable across the app to keep styling consistent but is used to start a game
export const StartButton: React.FC<StartButtonProps> = ({ textSize, padding, hoverScale, color, children, gameId }) => {

    // Function to handle the click of the button
    const handleClick = async () => {

        // Send a request to the server to start the game
        const res = await fetch("/api/trivia/initiate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                gameId: gameId,
            }),
        });
        
        const data = await res.json();

        console.log(data);

        // If there is an error, log it
        if (!res.ok) {
            console.log("Error creating game");
            console.log(data);
            return;
        }
        // If there is an error, log it
        else if (data.error){
            console.log(data.error);
            toast.error(data.error);
            return;
        }
        // If there is no error, redirect to the game page
        else {
            window.location.href = `/trivia-game/${gameId}/game`;
        }
    }

    const colorClasses = color === "green" ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = color === "green" ? "darkgreen" : "blue";

    return (
        <button
            onClick={handleClick}
            className={`${colorClasses} text-white ${textSize} font-bold ${
                padding || "py-6 px-8"
            } rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
            style={{ textShadow: `2px 2px 10px ${textShadowColor}` }}>
            {children}
        </button>

    );
};