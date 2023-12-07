import React from "react";
// import GameTitle from "../../(games)/trivia-game/components/GameTitle";
// import JoinButton from "../../(games)/trivia-game/components/JoinButton";
import JoinButton from "./components/JoinButton";
import JoinForm from "./components/JoinForm";


import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from "next/navigation";

export default async function JoinGamePage() {


  const cookieStore = cookies() // get cookies from the request

  const supabase = createClient(cookieStore) // create a supabase client with the cookies

  const supabaseAuth = createServerComponentClient({ cookies }) // create a supabase auth client with the cookies

  const { data: { session }} = await supabase.auth.getSession() // get the session from the cookies


  if (!session) {
      return redirect('/unauthenticated') // redirect to the unauthenticated page if there is no session
  }

  return (
    <div className="flex flex-col justify-center text-center">
      <JoinForm />
    </div>
  );
};
