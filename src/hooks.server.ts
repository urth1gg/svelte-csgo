import type { Handle } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_SECRET_KEY } from "$env/static/private"
import { verifyToken } from "./utils/auth/verifyToken";
import { InvalidToken } from "$lib/json_responses/responses";

const supabaseUrl = 'https://msrttzvmxmhwktgferof.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_SECRET_KEY)

export const handle: Handle = async ({event, resolve}) => {
    event.locals = {
        supabase: supabase
    }

    let protectedRoutes = [
        '/api/ping',
        '/api/friends',
        '/api/party',
    ]
    
    if(protectedRoutes.includes(event.url.pathname)){



        let token = event.request.headers.get('Authorization')?.split(" ")[1];

        if(!token) return InvalidToken();

        if(!verifyToken(token)) return InvalidToken();
    }

    const response = await resolve(event)
    return response;
}
