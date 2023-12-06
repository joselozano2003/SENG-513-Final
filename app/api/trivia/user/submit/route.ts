import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: NextRequest) {

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const supabaseAuth = createServerComponentClient({ cookies });

	const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json(403);
    }

    const data = await request.json();

    const { playerId, questionId,  } = data;

    return NextResponse.json(200);
}