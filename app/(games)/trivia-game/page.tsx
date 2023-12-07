import React from "react";
import CoolButton, { TestButton } from "./components/CoolButton";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function page() {

    const cookieStore = cookies() // get cookies from the request

    const supabase = createClient(cookieStore) // create a supabase client with the cookies

    const supabaseAuth = createServerComponentClient({ cookies }) // create a supabase auth client with the cookies

    const { data: { session }} = await supabase.auth.getSession() // get the session from the cookies

    if (!session) {
        return redirect('/unauthenticated') // redirect to the unauthenticated page if there is no session
    }

    const userId = session!.user.id // get the user id from the session

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
                <TestButton textSize={"text-5xl"} color="green" userId={userId}> {/* Button to start new game*/}
                    Click to Start New Game!
                </TestButton>
            </div>
        </div>
    );
}
