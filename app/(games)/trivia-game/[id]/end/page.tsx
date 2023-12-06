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

	const { id } = params;

	const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const supabaseAuth = createServerComponentClient({ cookies });

	const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return redirect("/unauthenticated");
    }

	const userId = session!.user.id;

    let { data: triviaGame, error: error1 } = await supabase.from("triviaGame").select("*").eq("id", id).eq("admin", userId);

    if (error1) {
        console.log(error1);
        alert(error1.message);
    }

	console.log(triviaGame);

	let { data: playerData, error: error2, count } = await supabase.from("triviaGamePlayer").select("*", { count: "exact" }).eq("gameId", id).order("score", { ascending: false });

	if (error2) {
		console.log(error2);
		alert(error2.message);
	}

	console.log(playerData);

	const maxScore = playerData![0].score;

	console.log(maxScore);

	let winners = [];

	for (let i = 0; i < count!; i++) {
		if (playerData![i].score === maxScore) {
			winners.push(playerData![i].playerNumber);
		}
	}

	console.log(winners);
	

	return (
		<div className={`text-white flex flex-col items-center h-full justify-center`}>
			<div className="mb-4">
				<WinnerIcon />
			</div>
			<div className="text-4xl font-bold mb-4">
				<p>Winner{winners.length > 1 ? "s" : ""}:</p>
				{winners.map((winner) => (
					<p>Player {winner}</p>
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