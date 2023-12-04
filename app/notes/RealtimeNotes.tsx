"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RealtimeNotes({ notes} : { notes:any}) {

    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        const channel = supabase.channel('realtime:notes').on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'notes'
        }, () => {
            router.refresh()
        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, router])

    return (
        <div>
            
            {notes?.map((note: any) => (
                <li key={note.id}>{note.title}</li>
            ))}
            
        </div>
    )
}