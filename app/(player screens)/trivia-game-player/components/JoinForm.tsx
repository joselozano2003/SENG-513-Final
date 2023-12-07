"use client";

import GameTitle from "@/app/(games)/trivia-game/components/GameTitle";
import JoinButton from "./JoinButton";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';


// Component to process user input and add them to a game
export default function JoinForm() {

	const colorClasses =  "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = "blue";

	// Function to handle the submission of the form
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent the default form submission

		const formData = new FormData(e.currentTarget); // get the form data
		const gameCode = formData.get("gameCode"); // get the game code from the form data

		const body = { // create the body of the request
			id: gameCode,
		}

		try {
			const res = await fetch("/api/trivia/join", { // send a request to the server to join the game
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			if (res.status == 200) { // if the response is ok, redirect to the waiting page
				window.location.href = `/trivia-game-player/${gameCode}/player-wait`; 
			} else {
				alert("Invalid game code"); // if the response is not ok, alert the user
			}
		}
		catch (err) { // if there is an error, log it and alert the user
			console.log(err); 	
			alert("Invalid game code"); 
		}
	}

    return (
        <div className="text-white flex flex-col items-center justify-center h-full">
			<div className="mb-8">
				<GameTitle title="Party Game" fontSize="text-6xl" />
			</div>
			<div className="mb-4">
				<form onSubmit={handleSubmit} className="flex flex-col [&>*]:m-5">
					<label htmlFor="gameCode" className="block text-lg font-bold mb-2">
						Game Code:
					</label>
					<input
					type="text"
					id="gameCode"
					name="gameCode"
					className="border-2 border-white rounded-md p-2 text-black"
					/>
					<button
						onClick={()=>{}}
						className={`${colorClasses} text-white text-lg font-bold py-2 px-4
						rounded-md transition duration-300 ease-in-out transform hover:scale-100`}
						style={{ textShadow: `2px 2px 10px ${textShadowColor}`}}>
							Join Game
					</button>
				</form>
			</div>
		</div>
    );
}