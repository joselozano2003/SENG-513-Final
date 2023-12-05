"use client";

import React, { useEffect} from "react";

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


    console.log(gameData)
    const currentQuestion = gameData![0].currentQuestion

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

    }, [supabase, router])


    // Commented out because it spends DB's resources. Only uncomment when testing.


    useEffect(() => {
        const timer = setTimeout(async () => {

            await supabase.from('triviaGame').update({ currentQuestion: currentQuestion + 1 }).eq('id', gameData![0].id)
        }, 19000); // 20000 milliseconds = 20 seconds
    
        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const { data: playerAnswers, error: playerAnswersError } = await supabase
                .from('triviaPlayerAnswer')
                .select()
                .eq('questionId', questionData.id)
                .eq("gameId", gameData![0].id)
                .eq("gameRound", gameData![0].currentQuestion);

            // CHECK IF ERROR
            if (playerAnswersError) {
                console.error('Error fetching player answers:', playerAnswersError);
                return;
            }

            console.log(playerAnswers)

            // Get the correct answer
            let { data:correctAnswer, error:correctAnswersError } = await supabase
                .from('triviaQuestionChoice')
                .select()
                .eq('questionId', questionData.id)
                .eq("correct", true)


            if (correctAnswersError) {
                console.error('Error fetching correct answer:', correctAnswersError);
                console.log(correctAnswersError)
                return;
            }

            console.log(correctAnswer)

            const correctAnswerId = correctAnswer![0].id

            const correctAnswerPlayerIds = playerAnswers!.filter((answer: any) => answer.choiceId === correctAnswerId).map((answer: any) => answer.playerId)

            console.log(correctAnswerPlayerIds)

            // Update the players' points

            for (let i = 0; i < correctAnswerPlayerIds.length; i++) {
                const { data: playerData, error: playerDataError } = await supabase
                    .from('triviaGamePlayer')
                    .select()
                    .eq('gameId', gameData![0].id)
                    .eq('playerNumber', correctAnswerPlayerIds[i])

                if (playerDataError) {
                    console.error('Error fetching player data:', playerDataError);
                    return;
                }

                console.log(playerData)

                const playerPoints = playerData![0].score + 20

                await supabase.from('triviaGamePlayer').update({ score: playerPoints }).eq('gameId', gameData![0].id).eq('playerNumber', correctAnswerPlayerIds[i])
            }

            
            await supabase.from('triviaGame').update({ currentQuestion: currentQuestion + 1 }).eq('id', gameData![0].id)
        }, 19000); // 20000 milliseconds = 20 seconds
    
        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [currentQuestion]);



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
