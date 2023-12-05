import React from 'react'
import Link from "next/link";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from 'next/navigation';

import NeonButton from "../../components/NeonButton";
import GameTitle from '@/app/(games)/trivia-game/components/GameTitle';


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

	if (gameState == 1) {
		redirect(`/trivia-game-player/${id}/player-wait`)
	}

	if (gameState == 2) {
		return (
			<div>
				<div className="mb-7">
				<GameTitle title="Trivia Game" fontSize="text-6xl" />
				</div>
				<div className="flex flex-col items-center justify-center">
				<NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="blue" padding="py-4 px-2 mb-8">
					Answer 1
				</NeonButton>
				<NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="purple" padding="py-4 px-2 mb-8">
					Answer 2
				</NeonButton>
				<NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="red" padding="py-4 px-2 mb-8">
					Answer 3
				</NeonButton>
				<NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="green" padding="py-4 px-2 mb-8">
					Answer 4
				</NeonButton>
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