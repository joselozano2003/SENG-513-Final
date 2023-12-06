"use client";

import React, { useEffect, useState} from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";

interface Props {
    gameId: string;
    gameData: any;
}

export function GameState({ gameId, gameData }: Props) {

    const supabase = createClientComponentClient()
    const router = useRouter()

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

    const gameState = gameData![0].state

    console.log(gameState)

    if (gameState == 1){
        return (
            <div>
                <h1>Waiting for Host</h1>
            </div>
        )
    }
    else {
        window.location.href = `/trivia-game-player/${gameId}/player-choose`
    }

    return null;
}