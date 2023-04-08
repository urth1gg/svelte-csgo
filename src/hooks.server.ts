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
        '/api/user@PATCH',
        '/api/flags@ALL',
        '/api/match/*/steam_id@POST',
        '/api/match/*/match_end@POST',
        '/api/match/*/halftime@POST',
        '/api/match/*/teams_swapped@POST',
        '/api/ac/audio@POST',
        '/api/ac/screenshots@POST',
        '/api/ac/memory/*@POST',
        '/api/ac/metrics@POST'
    ];
    
    let protectedRoutesRegex = protectedRoutes.map(route => {
        if (route.endsWith('@ALL')) {
            let path = route.substring(0, route.length - 3);
            return new RegExp(`^${path}`);
        } else if (route.includes('*')) {
            let parts = route.split('*');
            let start = parts[0].replace(/\//g, "\\/");
            let end = parts[1].replace(/\//g, "\\/");
            return new RegExp(`^${start}.*${end}$`);
        } else {
            return new RegExp(`^${route}$`);
        }
    });
    
    if (
        protectedRoutesRegex.some(route => route.test(event.url.pathname + '@' + event.request.method))
    ) {
        console.log('Protected route: ' + event.url.pathname + '@' + event.request.method)

        event.locals.user = null; 
        let token = event.request.headers.get('Authorization')?.split(" ")[1];

        console.log('Token received: ' + token);

        let user = decodeToken(token);
        if(!user) return InvalidToken();
        event.locals.user = user;
        event.locals.token = token;
    }
    
    const response = await resolve(event)
    return response;
}
