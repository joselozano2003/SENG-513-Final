import React from 'react'
import Link from "next/link";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from 'next/navigation';

import NeonButton from "../../components/NeonButton";
import GameTitle from '@/app/(games)/trivia-game/components/GameTitle';
import { GameQuestion } from './GameQuestion';


interface Props {
	params: {
		id: string;
  	};	
}

const MobilePlayerPage = async ({ params }: Props) => {

	const id = params.id;
 
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const supabaseAuth = createServerComponentClient({ cookies });

	const {
        data: { session },
    } = await supabase.auth.getSession();

    
    if (!session) {
        redirect("/login");
    }

	const userId = session?.user?.id;

	let { data: triviaPlayer, error: error2 } = await supabase.from("triviaGamePlayer").select("*").eq("gameId", id).eq("userId", userId)

    console.log(triviaPlayer)

    if (triviaPlayer!.length == 0) {
        redirect(`/`) // TODO: Not in game page
    }

	let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id)

	console.log(triviaGame)

	const currentQuestion = triviaGame![0].currentQuestion;

	const playerNumber = triviaPlayer![0].playerNumber;

	const gameState = triviaGame![0].state

	console.log(gameState, currentQuestion, playerNumber)

	async function handleClick(buttonNumber: number) {
		"use server"

		const body = {
			gameId: id,
			gameRound: currentQuestion,
			choice: buttonNumber,
			userId: userId,
		}

		console.log(body)

		// const res = await fetch("/api/trivia/ser/submit", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(body),
		// })
	}

	if (gameState == 1) {
		redirect(`/trivia-game-player/${id}/player-wait`)
	}

	if (gameState == 2) {
		return (
			<div>
				<div className="[&>*]:m-5 flex flex-col items-center">
				<GameTitle title="Trivia Game" fontSize="text-6xl" />
				<GameTitle title={`Question ${currentQuestion}`} fontSize="text-4xl" />
				</div>
				<div className="flex flex-col items-center justify-center">
				<NeonButton textSize="text-lg" borderColor="blue" padding="py-4 px-2 mb-8" handleClick={handleClick} buttonId={1}>
					Answer 1
				</NeonButton>
				<NeonButton textSize="text-lg" borderColor="purple" padding="py-4 px-2 mb-8" handleClick={handleClick} buttonId={2}>
					Answer 2
				</NeonButton>
				<NeonButton textSize="text-lg" borderColor="red" padding="py-4 px-2 mb-8" handleClick={handleClick} buttonId={3}>
					Answer 3
				</NeonButton>
				<NeonButton textSize="text-lg" borderColor="green" padding="py-4 px-2 mb-8" handleClick={handleClick} buttonId={4}>
					Answer 4
				</NeonButton>
				<GameQuestion gameId={id} gameData={triviaGame} />
				</div>
			</div>
		);
	}

	if (gameState == 3) {
		return (
			<div>
				Game has ended
			</div>
		)
	}

    
  };
  
  export default MobilePlayerPage;