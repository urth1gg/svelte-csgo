import type { Handle } from "@sveltejs/kit";
import { supabase } from "./utils/db/supabase";
import { decodeToken } from "./utils/auth/decodeToken";
import { InvalidToken } from "$lib/json_responses/responses";


export const handle: Handle = async ({event, resolve}) => {
    let user = event.cookies.get('user') ? JSON.parse(event.cookies.get('user') || '') : null;

    event.locals = {
        supabase: supabase,
        user: user
    }
    
    let protectedRoutes = [
        '/api/ping',
        '/api/friends',
        '/api/party',
    ]
    
    if(protectedRoutes.includes(event.url.pathname)){
        delete event.locals.user // remove user from the cookie and generate a new one with the token 

        console.log(event.locals.user)
        let token = event.request.headers.get('Authorization')?.split(" ")[1];
        let user = decodeToken(token);
        if(!user.id) return InvalidToken();
        event.locals.user = user;
        console.log(event.locals.user)

    }
    

    const response = await resolve(event)
    return response;
}
