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

    let {
        data: playerData,
        error: error2,
        count,
    } = await supabase.from("triviaGamePlayer").select("*", { count: "exact" }).eq("gameId", id).order("playerNumber", { ascending: true });

    if (error2) {
        console.log(error2);
        alert(error2.message);
    }

    let { data: questionConnections, error: error3 } = await supabase.from("_triviaGameTotriviaQuestion").select("B").eq("A", 1);

    if (error3) {
        console.log(error3);
        alert(error3.message);
    }

    // Extract the question IDs into an array
    let questionIds = questionConnections!.map((connection) => connection.B);

    // Then, get the questions with those IDs
    let { data: triviaQuestions, error: error4 } = await supabase.from("triviaQuestion").select("*").in("id", questionIds!);

    if (error4) {
        console.log(error4);
        alert(error4.message);
    }

    // Extract the question IDs from the triviaQuestions array
    let triviaQuestionIds = triviaQuestions!.map((question) => question.id);

    // Then, get the choices for those questions
    let { data: triviaQuestionChoices, error: error5 } = await supabase.from("triviaQuestionChoice").select("*").in("questionId", triviaQuestionIds);

    if (error5) {
        console.log(error5);
        alert(error5.message);
    }

    let groupedChoices = triviaQuestionChoices!.reduce((grouped, choice) => {
        (grouped[choice.questionId] = grouped[choice.questionId] || []).push(choice);
        return grouped;
    }, {});

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

    return (
        <div className="text-white flex flex-col justify-between h-full">
            <div className="h-0.5">{/* for proper spacing of the middle section (probably a terrible solution) */}</div>
            <div className="absolute self-center bg-gray-100 bg-opacity-10 rounded-xl p-5">
                <GameTitle title="Trivia Game" fontSize="text-6xl md:text-4xl" />
            </div>
            <div className="flex justify-between">
                <div className="flex justify-center w-5/12">
                    <div className="border-2 border-opacity-5 w-fit p-5">
                        <Avatars gridLayout={2} bg="none" gap="game" showPoints={true} gameId={id} playerData={playerData} playerCount={count!}/>
                    </div>
                </div>
                <QandA questions={triviaQuestions} choices={groupedChoices} gameData={triviaGame} />
            </div>
            <div className="flex justify-between items-end">
                <div className="w-fit p-4 bg-gray-100 bg-opacity-10 rounded-full">
                    <JoinStuff id={id} />
                </div>
                <CoolButton href="/trivia-game/55555/end" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                    go to end screen (temporary)
                </CoolButton>
                <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                    Quit
                </CoolButton>
            </div>
        </div>
    );
}
