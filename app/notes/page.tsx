import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import RealtimeNotes from './RealtimeNotes'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)


  const { data: notes } = await supabase.from('notes').select()

  return (
    <div>
      <h1>Notes</h1>
      <RealtimeNotes notes={notes} />
    </div>
  )
}