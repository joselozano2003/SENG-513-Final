import React from "react";
import CoolButton from "../../components/CoolButton";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from "next/navigation";

const WinnerIcon = () => (
  	<div className="text-4xl text-yellow-500">🏆</div>
);


interface Props {
	params: {
		id: string;
	};
}

async function EndingScreen ({ params }: Props) {

	const { id } = params; // get the game id from the params

	const cookieStore = cookies(); // get cookies from the request

    const supabase = createClient(cookieStore); // create a supabase client with the cookies

    const supabaseAuth = createServerComponentClient({ cookies }); // create a supabase auth client with the cookies

	const {
        data: { session },
    } = await supabase.auth.getSession(); // get the session from the cookies

    if (!session) {
        return redirect("/unauthenticated"); // redirect to the unauthenticated page if there is no session
    }

	const userId = session!.user.id; // get the user id from the session

	// Get the game data from the database
    let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id).eq("admin", userId);

	// If there is an error, log it and alert the user
    if (error1) {
        console.log(error1);
        alert(error1.message);
    }

	// If there is no data, redirect to the main menu
	console.log(triviaGame);

	// Get the player data from the database
	let { data: playerData, error: error2, count } = await supabase.from("triviaGamePlayer").select("*", { count: "exact" }).eq("gameId", id).order("score", { ascending: false });

	// If there is an error, log it and alert the user
	if (error2) {
		console.log(error2);
		alert(error2.message);
	}
 
	// Get the max score from the game
	const maxScore = playerData![0].score;

	// Get the player numbers of the winners
	let winners = [];

	// Loop through the player data and add the player numbers of the winners to the winners array
	for (let i = 0; i < count!; i++) {
		if (playerData![i].score === maxScore) {
			winners.push(playerData![i].playerNumber);
		}
	}
	
	return (
		<div className={`text-white flex flex-col items-center h-full justify-center`}>
			<div className="mb-4">
				<WinnerIcon />
			</div>
			<div className="text-4xl font-bold mb-4">
				<p>Winner{winners.length > 1 ? "s" : ""}:</p>
				{winners.map((winner) => (
					<p key={winner}>Player {winner}</p>
				))}
			</div>
			<div className="text-lg mb-4">
				<p>Credits:</p>
				<p>Developed by SENG 513 group 16</p>
			</div>
			<CoolButton href="/" textSize="text-sm" hoverScale="hover:scale-100" padding="py-2 px-2">
				Return to Main Menu
			</CoolButton>
		</div>
	);
};

export default EndingScreen;