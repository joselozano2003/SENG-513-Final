import React from "react";
import styles from "./styles.module.css";

import { prisma } from "@/lib/prisma";

import GameTitle from "../../components/GameTitle";
import CoolButton from "../../components/CoolButton";
import Avatars from "../../components/Avatars";
import JoinStuff from "../../components/JoinStuff";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
    params: {
      id: string;
    };
}

export default async function TriviaLobby({ params }: Props) {

    const { id } = params

    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const supabaseAuth = createServerComponentClient({ cookies })

    const { data: { session }} = await supabase.auth.getSession()

    if (!session) {
        return redirect('/unauthenticated')
    }

    const userId = session!.user.id

    const game = await prisma.triviaGame.findUnique({
        where: {
            id: Number(id),
            admin: userId,
        },
    });

    if (!game) {
        // Show game not found screen
        redirect(`/trivia-game/${id}/not-found`)
    }

    return (
        <div className={`flex flex-col justify-center h-full border-4 rounded-2xl ${styles.neonBorder} w-[100vw]`}>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col justify-evenly items-center">
                    <GameTitle title="Trivia Game" />
                    <CoolButton href="/trivia-game/55555/intro" textSize="text-3xl">
                        Start Game
                    </CoolButton>
                </div>
                <div>
                    <Avatars gridLayout="columns" bg={true} gap="lobby" points={false} />
                    <div className={`w-fit mx-auto mt-12 text-xl p-7 bg-gray-100 bg-opacity-10 rounded-full`}>
                        <JoinStuff id={id}/>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 m-10">
                <CoolButton href="/trivia-game/55555/lobby" textSize="text-lg" hoverScale="hover:scale-100" padding="py-4 px-2">
                    Back to Main Menu
                </CoolButton>
            </div>
        </div>
    );
}
