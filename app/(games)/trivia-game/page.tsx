import React from "react";
import CoolButton, { TestButton } from "./components/CoolButton";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function page() {

    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const supabaseAuth = createServerComponentClient({ cookies })

    const { data: { session }} = await supabase.auth.getSession()

    if (!session) {
        return redirect('/unauthenticated')
    }

    const userId = session!.user.id

    return (
        <div
            className="h-screen w-screen flex flex-col justify-end items-center pb-10"
            style={{
                backgroundImage: `url("/trivia-intro.png")`,
                // backgroundPosition: "center",
                // backgroundSize: "contain",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                margin: "-4vh -3vw", // done to offset what layout.tsx does for the padding of each page
            }}
        >
            <div className="flex justify-center ml-80 animate-bounce">
                <TestButton textSize={"text-5xl"} color="green" userId={userId}>
                    Click to Start New Game!
                </TestButton>
            </div>
        </div>
    );
}
