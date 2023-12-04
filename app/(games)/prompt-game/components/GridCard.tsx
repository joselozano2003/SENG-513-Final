import React from "react";
import CircularTimer from "../../components/CircularTimer";

interface GridCardProps {
    isPrompt: boolean;
    playerName: string;
    answer: string;
    avatar: string;
    points: number;
}

const GridCard = ({ isPrompt, playerName, answer, avatar, points }: GridCardProps) => {
    const hasPlayer = playerName !== "";

    return (
        <div className={`${isPrompt ? "bg-blue-500 text-xl font-semibold text-white border-blue-900" : "bg-white border-black"} text-black p-4 border-4 rounded-md relative}
        ${(hasPlayer || isPrompt) ? "" : "invisible"}`}>
            <div className={`flex justify-center items-center ${isPrompt ? "" : "h-2/5"}`}>
                <div className="flex flex-col items-center">
                    {avatar && <img src={avatar} alt="Player Avatar" className="w-12 h-12 rounded-full" />}
                    {playerName && <small>{playerName}</small>}
                </div>
                {points !== undefined && !isPrompt && <small className="ml-5">Points: {points}</small>}
            </div>

            {/* <div className={`${hasPlayer ? "" : "hidden"}`}>
                <div className={`flex justify-center items-center ${isPrompt ? "" : "h-2/5"}`}>
                    <div className="flex flex-col items-center">
                        {avatar && <img src={avatar} alt="Player Avatar" className="w-12 h-12 rounded-full" />}
                        {playerName && <small>{playerName}</small>}
                    </div>
                    {points !== undefined && !isPrompt && <small className="ml-5">Points: {points}</small>}
                </div>
            </div> */}
            <div className={`flex flex-col items-center justify-center text-center ${isPrompt ? "h-full" : "h-3/5"}`}>
                {answer}
                {/* {isPrompt && <CircularTimer />} */}
            </div>
        </div>
    );
};

export default GridCard;
