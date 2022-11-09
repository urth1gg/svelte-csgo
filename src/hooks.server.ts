import type { Handle } from "@sveltejs/kit";
import { supabase } from "./utils/db/supabase";
import { decodeToken } from "./utils/auth/decodeToken";
import { InvalidToken } from "$lib/json_responses/responses";


export const handle: Handle = async ({event, resolve}) => {
    event.locals = {
        supabase: supabase,
    }

    let protectedRoutes = [
        '/api/ping',
        '/api/friends',
        '/api/party',
    ]
    
    if(protectedRoutes.includes(event.url.pathname)){


        let token = event.request.headers.get('Authorization')?.split(" ")[1];

        let user = decodeToken(token);
        if(!user.id) return InvalidToken();

        event.locals.user = decodeToken(token);
    }
    

    const response = await resolve(event)
    return response;
}
