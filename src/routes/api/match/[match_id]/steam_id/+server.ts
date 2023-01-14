import type { RequestHandler } from "@sveltejs/kit";
import { InvalidRequest, Success } from "$lib/json_responses/responses";
import { json } from "@sveltejs/kit"
import { CSGO_USER } from "$env/static/private";

export const POST: RequestHandler = async function ({locals, params, request}){
 
    let { user } = locals;

    console.log(user)
    if(!user){
        return InvalidRequest()
    }

    console.log(user)

    if(user.username !== CSGO_USER){
        return InvalidRequest()
    }

    let { steam_id } = await request.json();

    console.log(steam_id)
    // check if there's a match and steam_id is in the match

    let match = await locals.supabase.from('matches').select('*').eq('id', params.match_id).single();

    
    if(match.error) {
        console.log(match.error)
        return json({error: match.error}, {status: 500})
    }
    if(!match.data) return InvalidRequest();

    let teamA = match.data.team_a.map((x: string) => JSON.parse(x))
    let teamB = match.data.team_b.map((x:string) => JSON.parse(x))

    let playerIsInMatch = false;

    for(let player of [...teamA, ...teamB]){
        if(player.steam_id === steam_id) playerIsInMatch = true;
    }
    
    return json({playerIsInMatch}, {status: 200});
}