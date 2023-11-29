import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
    params: {
      id: string;
    };
}


interface Game1 {
    id: number;
    state: number;
    players: Players | null;
    questions: Questions | null;
    player_limit: number | null;
}



interface Response {
    [playerId: string]: number;
}
  
interface Question {
    id: number;
    responses: Response;
}
  
interface Questions {
    [key: string]: Question;
}
  
interface Player {
    id: number;
    score: number;
}
  
interface Players {
    [key: string]: Player;
}
  
interface Game {
    id: number;
    state: number;
    players: Players | null;
    questions: Questions | null;
    player_limit: number | null;
}



export default async function Tests({ params }: Props) {

    const { id } = params

    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const supabaseAuth = createServerComponentClient({ cookies })

    const { data: { session }} = await supabase.auth.getSession()

    const test = session?.user?.id

    // console.log(test)

    if (!session) {
        return redirect('/unauthenticated')
    }

   
    let { data: trivia, error } = await supabase.from('trivia')
    .select('*')
        
    let playersData = JSON.stringify(trivia![0].players);

    const player: Player = {
        id: 1,
        score: 0
    }
        

    return (
        <div className="w-[100vw] text-center text-white">
            <p className="">Hello {id}</p>
            {playersData}
        </div>
    )
}