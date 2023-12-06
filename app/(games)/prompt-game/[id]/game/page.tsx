import React from "react";
import GameTitle from "../../components/GameTitle";
import CoolButton from "../../components/CoolButton";
import PromptAndResponses from "../../components/PromptAndResponses";
import { Player } from "../../components/Avatars";

// interfaces
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export default async function page( { params }: Props) {
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

    const currentQuestion = promptGame![0].currentQuestion

    // RECHECK THIS LINE IF THE URL IS VALID
    if (currentQuestion > 8) {
        redirect(`/prompt-game/${promptGame![0].id}/end`)
    }

    let {
        data: playerData,
        error: error2,
        count,
    } = await supabase.from("promptGamePlayer").select("*", { count: "exact" }).eq("gameId", id).order("playerNumber", { ascending: true });

    if (error2) {
        console.log(error2);
        alert(error2.message);
    }

    let { data: questionConnections, error: error3 } = await supabase.from("promptGameToPromptQuestion").select("B").eq("A", id);

    if (error3) {
        console.log(error3);
        alert(error3.message);
    }

    // Extract the question IDs into an array
    let questionIds = questionConnections!.map((connection) => connection.B);

    // Then, get the questions with those IDs
    let { data: promptQuestions, error: error4 } = await supabase.from("promptQuestion").select("*").in("id", questionIds!);

    if (error4) {
        console.log(error4);
        alert(error4.message);
    }

    // Extract the question IDs from the promptQuestions array
    let promptQuestionIds = promptQuestions!.map((question) => question.id);

    // Then, get the choices for those questions
    let { data: promptQuestionChoices, error: error5 } = await supabase.from("promptQuestionChoices").select("*").in("questionId", promptQuestionIds);

    if (error5) {
        console.log(error5);
        alert(error5.message);
    }

    let groupedChoices = promptQuestionChoices!.reduce((grouped, choice) => {
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

    const mockPlayerResponses = [
        { playerName: "Player 1", answer: "Answer 1" },
        { playerName: "Player 2", answer: "Answer 2" },
        { playerName: "Player 3", answer: "Answer 3" },
        { playerName: "Player 4", answer: "Answer 4" },
        // { playerName: "Player5", answer: "Answer 5" },
        // { playerName: "Player6", answer: "Answer 6" },
    ];
    return (
        <div className="flex justify-between items-center flex-col w-full h-full">
            <GameTitle title="Prompt Game" />
            <div className="flex justify-center my-10 h-full w-full">
                <PromptAndResponses players={players} prompt={"This is a prompt for the users to respond to! haha!"} playerResponses={mockPlayerResponses} />
            </div>
            <CoolButton href="/" textSize="text-lg" hoverScale="hover:scale-100" padding="py-2 px-2">
                Quit
            </CoolButton>
        </div>
    );
}
