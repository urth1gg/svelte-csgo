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

    let { steam_id } = await request.json();

    console.log(steam_id)
    // check if there's a match and steam_id is in the match

    let curHalftime = await locals.supabase.from('matches').select('halftime').eq('id', params.match_id).single();

    if(curHalftime.error) {
        console.log(curHalftime.error)
        return json({error: curHalftime.error}, {status: 500})
    }
    if(!curHalftime.data) return InvalidRequest();

    let { halftime } = curHalftime.data;
    let match = await locals.supabase.from('matches').update({halftime: !halftime}).eq('id', params.match_id).single();

    if(match.error) {
        return InvalidRequest()
    }

    console.log('Match updated');
    return Success()
    
}