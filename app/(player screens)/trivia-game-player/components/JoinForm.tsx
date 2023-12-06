"use client";

import GameTitle from "@/app/(games)/trivia-game/components/GameTitle";
import JoinButton from "./JoinButton";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';



export default function JoinForm() {

	const colorClasses =  "bg-blue-500 hover:bg-blue-700";
    const textShadowColor = "blue";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const gameCode = formData.get("gameCode");

		const body = {
			id: gameCode,
		};

		console.log(body);

	

		try {
			const res = await fetch("/api/trivia/join", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			console.log(res.status);

			if (res.status == 200) {
				window.location.href = `/trivia-game-player/${gameCode}/player-wait`; 
			} else {
				alert("Invalid game code");
			}
		}
		catch (err) {
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