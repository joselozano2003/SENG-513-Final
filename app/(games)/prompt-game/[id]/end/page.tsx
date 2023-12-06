import React from "react";
import CoolButton from "../../components/CoolButton";
import Avatars, { Player } from "../../components/Avatars";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from "next/navigation";

const players: Player[] = [
    { name: "Player 1", img: "/player-1.png", points: 0 },
    { name: "Player 2", img: "/player-2-cursed.png", points: 999 },
    { name: "Player 3", img: "/player-3.png", points: 0 },
    { name: "Player 4", img: "/player-4.png", points: 0 },
    { name: "Player 5", img: "/player-5.png", points: 0 },
    { name: "Player 6", img: "/player-6.png", points: 0 },
    { name: "Player 7", img: "/player-7.png", points: 0 },
    { name: "Player 8", img: "/player-8.png", points: 0 },
];

// const WinnerIcon = () => (
//     <div className="text-4xl text-yellow-500">🏆</div>
// );

// const WinnerAvatar = () => <Avatars gridLayout={4} bg="grey" gap="lobby" showPoints={false}/>;

// Get the player with the highest score from the DB and map the player number to the players object

interface Props {
	params: {
		id: string;
	};
}

async function EndingScreen ({params}: Props) {

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

    let { data: promptGame, error: error1 } = await supabase.from("promptGame").select("*").eq("id", id).eq("admin", userId);

    if (error1) {
        console.log(error1);
        alert(error1.message);
    }

	console.log(promptGame);

	let { data: playerData, error: error2, count } = await supabase.from("promptGamePlayer").select("*", { count: "exact" }).eq("gameId", id).order("score", { ascending: false });

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
                {/* <WinnerAvatar /> */}
            </div>
            <div className="text-2xl font-bold mb-4">Congratulations! Player 1 is the winner!</div>
            <div className="text-lg mb-4">
                <p>Credits:</p>
                <p>Developed by SENG 513 group 16</p>
            </div>
            <CoolButton href="/prompt-game/55555/lobby" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-4">
                Return to Main Menu
            </CoolButton>
        </div>
    );
};

export default EndingScreen;
