import React from 'react'
import Link from "next/link";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from 'next/navigation';
import { GameState } from './GameState';

interface Props {
	params: {
		id: string;
  	};	
}

async function WaitingPage({ params }: Props) {

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
    if (triviaPlayer!.length == 0) {
        redirect(`/`)
    }

	// Get the game data from the database
	let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id)

	// If there is an error, log it and alert the user
	if (error1) {
		console.log(error1);
		alert(error1.message);
	}

	// Store the player number
	const playerNumber = triviaPlayer![0].playerNumber;

	return ( 
		<div className={`flex flex-col justify-center items-center text-4xl font-bold text-white [&>*]:m-5`}>
			<h1>You joined game {id}</h1>
			<h1>You are player {playerNumber}</h1>
			<h1 className="text-4xl font-bold text-white">Please look at the big screen</h1>
			<GameState gameId={id} gameData={triviaGame} />
		</div>
	);
};

export default WaitingPage;