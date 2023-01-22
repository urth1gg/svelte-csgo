import type { RequestHandler } from "@sveltejs/kit";
import { InvalidRequest, Success } from "$lib/json_responses/responses";
import { json } from "@sveltejs/kit"
import { CSGO_USER } from "$env/static/private";
import * as UsersService from "$lib/services/users";

export const POST: RequestHandler = async function ({locals, params, request}){
 
    let { user, supabase } = locals;

    if(!user){
        return InvalidRequest()
    }

    if(user.username !== CSGO_USER){
        return InvalidRequest()
    }

    let data = await request.json();

    // check if there's a match and steam_id is in the match

    let match = await locals.supabase.from('matches').select('*').eq('id', params.match_id).single();

    
    if(match.error) {
        console.log(match.error)
        return json({error: match.error}, {status: 500})
    }

    if(!match.data) return InvalidRequest();
    if(match.data.winner !== '0') return InvalidRequest();

    console.log(data)
    return Success();
}