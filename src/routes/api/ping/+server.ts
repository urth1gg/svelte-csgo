import type { RequestHandler } from "@sveltejs/kit";
import { InvalidToken, Success } from "$lib/json_responses/responses";
import { decodeToken } from "../../../utils/auth/decodeToken";
//import { client } from "../../../utils/redis/client";

let timeouts = new Map();

export const GET: RequestHandler = async function ({request, locals}){
    let token = request.headers.get('Authorization')?.split(" ")[1];
    if(!token) return InvalidToken();

    let user = decodeToken(token);
    if(!user?.id) return InvalidToken();

    await locals.supabase.rpc('set_online_status', {online: true, user_uuid: user.id})

    clearTimeout(timeouts.get(user.id)); 

    timeouts.set(user.id, setTimeout(async () => {
        await locals.supabase.rpc('set_online_status', {user_uuid: user.id, online: false})
        timeouts.delete(user.id);
    }, 10000))

    return Success() 
}   