"use client";

import React, { useEffect, useState} from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";

interface Props {
    gameId: string;
    gameData: any;
}


// Component to fetch realtime data from the database, does not render anything
export function GameQuestion({ gameId, gameData }: Props) {

    const supabase = createClientComponentClient() // create a supabase client for a client-side component
    const router = useRouter() // get the router


    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
    is used to subscribe to a Supabase channel for real-time updates on a trivia game. */

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

    }, [supabase, router]) // add supabase and router to the dependency array

    const gameState = gameData![0].state // get the game state from the game data

    console.log(gameState) // log the game state

    return null; // return nothing
}