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

	const id = params.id; // get the game id from the params
 
    const cookieStore = cookies(); // get cookies from the request

    const supabase = createClient(cookieStore); // create a supabase client with the cookies

    const supabaseAuth = createServerComponentClient({ cookies }); // create a supabase auth client with the cookies

	const {
        data: { session },
    } = await supabase.auth.getSession(); // get the session from the cookies

    
    if (!session) {
        redirect("/login"); // redirect to the unauthenticated page if there is no session
    }

	const userId = session?.user?.id; // get the user id from the session

	// Get the player data from the database
	let { data: triviaPlayer, error: error2 } = await supabase.from("triviaGamePlayer").select("*").eq("gameId", id).eq("userId", userId)

	// If there is an error, log it and alert the user
    console.log(triviaPlayer)


	// If there is an error, log it and alert the user
    if (triviaPlayer!.length == 0) {
        redirect(`/`)
    }

	// Get the game data from the database
	let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id)

	// If there is an error, log it and alert the user
	const currentQuestion = triviaGame![0].currentQuestion;

	// If there is an error, log it and alert the user

	const gameState = triviaGame![0].state;


	if (gameState == 1) {
		redirect(`/trivia-game-player/${id}/player-wait`) // redirect to the waiting page if the game has not started 
	}

	// If game has started, render the game page
	if (gameState == 2) {
		return (
			<div>
				<div className="[&>*]:m-5 flex flex-col items-center">
				<GameTitle title="Trivia Game" fontSize="text-6xl" />
				<GameTitle title={`Question ${currentQuestion}`} fontSize="text-4xl" />
				</div>
				<div className="flex flex-col items-center justify-center">
				<NeonButton textSize="text-lg" borderColor="blue" padding="py-4 px-2 mb-8" buttonId={1} userId={userId} currentQuestion={currentQuestion} gameId={id}>
					Answer 1
				</NeonButton>
				<NeonButton textSize="text-lg" borderColor="purple" padding="py-4 px-2 mb-8"  buttonId={2} userId={userId} currentQuestion={currentQuestion} gameId={id}>
					Answer 2
				</NeonButton>
				<NeonButton textSize="text-lg" borderColor="red" padding="py-4 px-2 mb-8" buttonId={3} userId={userId} currentQuestion={currentQuestion} gameId={id}>
					Answer 3
				</NeonButton>
				<NeonButton textSize="text-lg" borderColor="green" padding="py-4 px-2 mb-8" buttonId={4} userId={userId} currentQuestion={currentQuestion} gameId={id}>
					Answer 4
				</NeonButton>
				<GameQuestion gameId={id} gameData={triviaGame} />
				</div>
			</div>
		);
	}

	// If game has ended, render the end page
	if (gameState == 3) {
		return (
			<div>
				Game has ended
			</div>
		)
	}
  };
  
  export default MobilePlayerPage;