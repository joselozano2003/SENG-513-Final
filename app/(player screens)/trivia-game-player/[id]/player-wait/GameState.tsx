"use client";

import React, { useEffect, useState} from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";

interface Props {
    gameId: string;
    gameData: any;
}

// Component to fetch realtime data from the database, does not render anything
export function GameState({ gameId, gameData }: Props) {

    const supabase = createClientComponentClient() // create a supabase client for a client-side component
    const router = useRouter() // get the router

    // Subscribe to the channel
    useEffect(() => {
        const channel = supabase.channel(`realtime:triviaGame:gameId=eq.${gameData![0].id}`).on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'triviaGame' // listen for changes to the triviaGame table
        }, () => {
            router.refresh() // refresh the page when a change is detected
        }).subscribe() // subscribe to the channel

        return () => {
            supabase.removeChannel(channel) // remove the channel when the component is unmounted
        }

    }, [supabase, router, gameData]) // add supabase and router to the dependency array

    const gameState = gameData![0].state // get the game state from the game data

    console.log(gameState) // log the game state

    if (gameState == 1){ // if the game state is 1, redirect to the player choose page
        return (
            <div>
                <h1>Waiting for Host</h1>
            </div>
        )
    }
    else { // if the game state is not 1, redirect to the player choose page
        window.location.href = `/trivia-game-player/${gameId}/player-choose`
    }

    return null;
}