import type { Handle } from "@sveltejs/kit";
import { supabase } from "./utils/db/supabase";
import { decodeToken } from "./utils/auth/decodeToken";
import { InvalidToken } from "$lib/json_responses/responses";

export const handle: Handle = async ({event, resolve}) => {
    let user = event.cookies.get('user') ? JSON.parse(event.cookies.get('user') || '') : null;

    event.locals = {
        supabase: supabase,
        user: user,
    }
    
    let protectedRoutes = [
        '/api/ping@ALL',
        '/api/friends@ALL',
        '/api/party@ALL',
        '/api/queue@ALL',
        '/api/match@ALL',
        '/api/user@PATCH'
    ]
    

    if(protectedRoutes.includes(
        event.url.pathname + '@' + event.request.method 
    ) || 
        protectedRoutes.includes(
            event.url.pathname + '@ALL'
        )
    ){
        let [ _ , method ] = protectedRoutes.find(route => route.includes(event.url.pathname))?.split('@') || [];

        if(method === event.request.method || method === 'ALL'){
            event.locals.user = null; 

            let token = event.request.headers.get('Authorization')?.split(" ")[1];
            let user = decodeToken(token);
            if(!user) return InvalidToken();
            event.locals.user = user;
            event.locals.token = token;
        }

    }
    

    const response = await resolve(event)
    return response;
}
