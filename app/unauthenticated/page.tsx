import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function UnAuthenticated() {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session }} = await supabase.auth.getSession()

    if (session) {
        return redirect('/')
    }

    return (
        <div>
            <h1>Unauthenticated</h1>
            <p>You have to log in to play a game</p>
        </div>
    )
}