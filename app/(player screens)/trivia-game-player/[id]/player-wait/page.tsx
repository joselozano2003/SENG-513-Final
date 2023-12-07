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

    if (triviaPlayer!.length == 0) {
        redirect(`/`) // TODO: Not in game page
    }

	let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id)

	const playerNumber = triviaPlayer![0].playerNumber;

	return ( // below are the waiting instructions printed and your info
		<div className={`flex flex-col justify-center items-center text-4xl font-bold text-white [&>*]:m-5`}>
			<h1>You joined game {id}</h1>
			<h1>You are player {playerNumber}</h1>
			<h1 className="text-4xl font-bold text-white">Please look at the big screen</h1>
			<GameState gameId={id} gameData={triviaGame} />
		</div>
	);
};

export default WaitingPage;