"use client";

import React, { use } from "react";

// components
import CircularTimer from "./CircularTimer";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface QuandAProps {
    questions: any;
    gameData: any;
    choices: any;
}

export default function QandA({ questions, gameData, choices }: QuandAProps) {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const currentQuestion = gameData![0].currentQuestion

    const questionData = questions[currentQuestion - 1]
    
    console.log(questionData)

    const currentChoices = choices[questionData.id]

    console.log(currentChoices)

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

    }, [supabase, router])

    // const answersPro = 

    // get these from the database later
    let answers = ["Paris", "London", "Berlin", "Madrid", "Another One"];
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
                    <CircularTimer />
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
