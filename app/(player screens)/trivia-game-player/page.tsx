import React from "react";
// import GameTitle from "../../(games)/trivia-game/components/GameTitle";
// import JoinButton from "../../(games)/trivia-game/components/JoinButton";
import JoinButton from "./components/JoinButton";
import JoinForm from "./components/JoinForm";


import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function JoinGamePage({ params }: Props) {

  const { id } = params

  const cookieStore = cookies()

  const supabase = createClient(cookieStore)

  const supabaseAuth = createServerComponentClient({ cookies })

  const { data: { session }} = await supabase.auth.getSession()


  if (!session) {
      return redirect('/unauthenticated')
  }

  const gameCodeList:number[] = [];
  const userId = session!.user.id

  const { data, error } = await supabase
  .from('triviaGame')
  .select('*')

  if (error) {
    console.error('Error fetching data from the database', error);
  } else {
    console.log('Data from the database:', data);
    
    // Do something with the data...
    data.map((triviagameinstance) => {
      gameCodeList.push(triviagameinstance.id.toString());
    })
    console.log(gameCodeList)
  }


  return (
    <div className="flex flex-col justify-center text-center">
      <JoinForm codeList={gameCodeList}/>
    </div>
  );
};
