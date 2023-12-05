"use client";

import React, { useEffect, useState} from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";

interface Props {
    gameId: string;
    gameData: any;
}

export function GameQuestion({ gameId, gameData }: Props) {

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

    }, [supabase, router])

    const gameState = gameData![0].state

    console.log(gameState)

    return null;
}