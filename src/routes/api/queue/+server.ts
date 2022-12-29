import { Success, InvalidRequest } from "$lib/json_responses/responses";
import type { RequestHandler } from "@sveltejs/kit";
import { initMapsForMatch, removeMapFromMatch } from "$lib/services/matches";
import { Socket } from "$lib/../socket";
import { Player, Match, newQueue as queue, playingMatches } from "$lib/services/matchMaking";
import { MatchEvents } from "$lib/socket_events/MatchEvents";

const matchWithTenPlayersLoaded = (x: any) => {
    MatchEvents.emit('MATCH_FOUND', {match:x});
}

playingMatches.subscribe(matchWithTenPlayersLoaded);

export const GET: RequestHandler = async function ({locals, params}){
 
    return Success()
}   

export const POST: RequestHandler = async function ({locals}){
    let { user, supabase } = locals;

    
    if(!user){
        return InvalidRequest()
    }
    
    let { data, error } = await supabase.from('users').select(`
        *, 
        flags(
            *
        ),
        stats (
            elo
        )
    `).eq('id', user.id).single();

    if(error) return InvalidRequest();

    let partyId = data?.party_id;

    if(!partyId) {
        let player = new Player(user.id, data.stats?.[0].elo);
        queue.addToMatch(player);
    }
    return Success()
}

export const PATCH: RequestHandler = async function ({locals}){

    return Success()
}

export const DELETE: RequestHandler = async function ({locals, request, params}){

    let { user, supabase } = locals;

    if(!user){
        return InvalidRequest()
    }

    let { data, error } = await supabase.from('users').select(`
        *, 
        flags(
            *
        ),
        stats (
            elo
        )
    `).eq('id', user.id).single();

    if(error) return InvalidRequest();

    let partyId = data?.party_id;

    if(!partyId) {
        let player = new Player(user.id, data.stats?.[0].elo);

        queue.removeFromMatch(player);

    }

    return Success()    
}
