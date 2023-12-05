"use client";

import React, { useEffect, useState} from "react";

// components
import CircularTimer from "../../components/CircularTimer";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";

interface QuandAProps {
    questions: any;
    gameData: any;
    choices: any;
}

export default function QandA({ questions, gameData, choices }: QuandAProps) {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const currentQuestion = gameData![0].currentQuestion


    if (currentQuestion > 8) {
        redirect(`/trivia-game/${gameData![0].id}/end`)
    }
    console.log(currentQuestion)

    const questionData = questions[currentQuestion - 1]

    const currentChoices = choices[questionData.id]

    useEffect(() => {
        const channel = supabase.channel(`realtime:triviaGame:gameId=eq.${gameData![0].id}`).on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'triviaGame'
        }, () => {
            router.refresh()
        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [supabase, router, gameData])


    // Commented out because it spends DB's resources. Only uncomment when testing.


    useEffect(() => {
        const timer = setTimeout(async () => {
            await supabase.from('triviaGame').update({ currentQuestion: currentQuestion + 1 }).eq('id', gameData![0].id)
            console.log('This will run after 20 seconds');
        }, 19000); // 20000 milliseconds = 20 seconds
    
        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [currentQuestion, gameData, supabase]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            await supabase.from('triviaGame').update({ currentQuestion: currentQuestion + 1 }).eq('id', gameData![0].id)
            console.log('This will run after 20 seconds');
        }, 19000); // 20000 milliseconds = 20 seconds
    
        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [currentQuestion, gameData, supabase]);

    // CHECK TRIVIAPLAYERANSWER AND TRIVIAQUSTION TABLE
    // VALIDATE ANSWERS IN QUESTION COLUMN AND UPDATE PLAYER SCORE IN PLAYER COLUMN

    useEffect(() => {
        const fetchPlayerAnswer = async () => {
            const playerAnswers = await supabase.from('triviaPlayerAnswer').select('');
            console.log("Player Answers:", playerAnswers.data);
        }

        const fetchQuestionAnswer = async () => {
            const questionAnswers = await supabase.from('triviaQuestion').select('');
            console.log("Trivia Questions:", questionAnswers.data);
        }

        fetchPlayerAnswer();
        fetchQuestionAnswer();

    }, [supabase]);

    // get these from the database later
    let answerLetters = ["A", "B", "C", "D", "E"];
    let boxShadows = ["blue", "purple", "red", "green", "orange"];

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-full pt-20 md:pt-10">
                <div className="flex flex-col justify-center items-center w-3/5">
                    <h1
                        className="text-6xl md:text-4xl font-bold text-center w-4/5 bg-opacity-50 py-5 md:py-3 rounded-xl"
                        style={{ textShadow: "2px 2px 4px grey" }}
                    >
                        {questionData.question}
                    </h1>
                    <CircularTimer questionData={questionData}/>
                </div>
                <div className="flex flex-col justify-center items-start w-2/5">
                    {currentChoices.map((choice: any, index: number) => (
                        <div key={index} className="flex items-center text-3xl md:text-xl mb-10 md:mb-5 rounded-xl">
                            <div
                                className="mr-5 w-9 h-11 max-w-9 max-h-11 flex items-center justify-center"
                                style={{
                                    backgroundColor: boxShadows[index],
                                    boxShadow: `0 0 3px 4px ${boxShadows[index]}`,
                                }}
                            >
                                {answerLetters[index]}
                            </div>
                            {choice.choice}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
