import React from "react";

// components
import Avatars from "../../components/Avatars";
import QandA from "../../components/QandA";
import JoinStuff from "../../../components/JoinStuff";
import CoolButton from "../../components/CoolButton";
import GameTitle from "../../components/GameTitle";

// interfaces
import { Player } from "../../components/Avatars";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export default async function GamePage({ params }: Props) {
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
    const currentQuestion = triviaGame![0].currentQuestion

    // If there is no data, redirect to the main menu
    if (currentQuestion > 8) {
        redirect(`/trivia-game/${triviaGame![0].id}/end`)
    }

    // Get the player data from the database
    let {
        data: playerData,
        error: error2,
        count,
    } = await supabase.from("triviaGamePlayer").select("*", { count: "exact" }).eq("gameId", id).order("playerNumber", { ascending: true });

    // If there is an error, log it and alert the user
    if (error2) {
        console.log(error2);
        alert(error2.message);
    }

    // Get the question connections from the database
    let { data: questionConnections, error: error3 } = await supabase.from("_triviaGameTotriviaQuestion").select("B").eq("A", id);

    // If there is an error, log it and alert the user
    if (error3) {
        console.log(error3);
        alert(error3.message);
    }

    // Extract the question IDs into an array
    let questionIds = questionConnections!.map((connection) => connection.B);

    // Then, get the questions with those IDs
    let { data: triviaQuestions, error: error4 } = await supabase.from("triviaQuestion").select("*").in("id", questionIds!);

    // If there is an error, log it and alert the user
    if (error4) {
        console.log(error4);
        alert(error4.message);
    }

    // Extract the question IDs from the triviaQuestions array
    let triviaQuestionIds = triviaQuestions!.map((question) => question.id);

    // Then, get the choices for those questions
    let { data: triviaQuestionChoices, error: error5 } = await supabase.from("triviaQuestionChoice").select("*").in("questionId", triviaQuestionIds);

    // If there is an error, log it and alert the user
    if (error5) {
        console.log(error5);
        alert(error5.message);
    }
 
    // Group the choices by question ID
    let groupedChoices = triviaQuestionChoices!.reduce((grouped, choice) => {
        (grouped[choice.questionId] = grouped[choice.questionId] || []).push(choice);
        return grouped;
    }, {});

    // Player place holders for images
    const players: Player[] = [
        { name: "Player 1", img: "/player-1.png",},
        { name: "Player 2", img: "/player-2-cursed.png", },
        { name: "Player 3", img: "/player-3.png", },
        { name: "Player 4", img: "/player-4.png", },
        { name: "Player 5", img: "/player-5.png", },
        { name: "Player 6", img: "/player-6.png", },
        { name: "Player 7", img: "/player-7.png", },
        { name: "Player 8", img: "/player-8.png", },
    ];

    return (
        <div className="text-white flex flex-col justify-between h-full">
            <div className="h-0.5">{/* for proper spacing of the middle section (probably a terrible solution) */}</div>
            <div className="absolute self-center bg-gray-100 bg-opacity-10 rounded-xl p-5">
                <GameTitle title="Trivia Game" fontSize="text-6xl md:text-4xl" />
            </div>
            <div className="flex justify-between">
                <div className="flex justify-center w-5/12">
                    <div className="border-2 border-opacity-5 w-fit p-5">
                        <Avatars gridLayout={2} bg="none" gap="game" showPoints={true} gameId={id} playerData={playerData} playerCount={count!} />
                    </div>
                </div>
                <QandA questions={triviaQuestions} choices={groupedChoices} gameData={triviaGame} />
            </div>
            <div className="flex justify-between items-end">
                <div className="w-fit p-4 bg-gray-100 bg-opacity-10 rounded-full">
                    <JoinStuff id={id} />
                </div>
                <CoolButton href={`/trivia-game/${id}/end`} textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                    go to end screen (temporary)
                </CoolButton>
                <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                    Quit
                </CoolButton>
            </div>
        </div>
    );
}
