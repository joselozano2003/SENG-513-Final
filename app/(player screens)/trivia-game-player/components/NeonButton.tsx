"use client";

import Link from "next/link";

interface NeonButtonProps {
    textSize: string;
    padding?: string;
    hoverScale?: string;
    borderColor: string; // Added a new prop for the border color
    children: React.ReactNode;
    handleClick?: (param: any) => void;
    buttonId: number;
    gameId: any;
    currentQuestion: any;
    userId: any;
}


// Button that is reusable across the app to keep styling consistent, it is used for handling user choices
const NeonButton: React.FC<NeonButtonProps> = ({ textSize, padding, hoverScale, borderColor, children, buttonId, gameId, currentQuestion, userId }) => {

    // Function to handle the click of the button
    async function handleClick(buttonId: number) { 
    
        const body = { // Create a body to send to the server
			gameId: gameId,
			gameRound: currentQuestion,
			choice: buttonId,
			userId: userId,
		}

		try{
			const res = await fetch("/api/trivia/user", { // Send a request to the server to start the game
				method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
			});
	
		}
		catch (err) {
			console.log(err) // If there is an error, log it
		}
        
    }

    return (
            <button
            onClick={() => handleClick(buttonId)}
                className={`text-white ${textSize} font-bold ${padding || "py-6 px-8"} rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
                style={{
                    backgroundColor: "#0c0d0c",  
                    border: `2px solid ${borderColor}`,
                    boxShadow: `0 0 10px 5px ${borderColor}`,
                    textShadow: `2px 2px 5px ${borderColor}`,     
                }}>
                {children}
            </button>
    );
};

export default NeonButton;