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



const NeonButton: React.FC<NeonButtonProps> = ({ textSize, padding, hoverScale, borderColor, children, buttonId, gameId, currentQuestion, userId }) => {

    async function handleClick(buttonId: number) { 
    
        const body = {
			gameId: gameId,
			gameRound: currentQuestion,
			choice: buttonId,
			userId: userId,
		}

		console.log(body)

		try{
			const res = await fetch("/api/trivia/user", {
				method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
			});
	
			console.log(res.status)
		}
		catch (err) {
			console.log(err)
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