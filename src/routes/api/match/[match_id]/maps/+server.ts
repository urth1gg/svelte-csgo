import { Success, InvalidRequest } from "$lib/json_responses/responses";
import type { RequestHandler } from "@sveltejs/kit";
import { removeMapFromMatch } from "$lib/services/matches";
import { playingMatches } from "$lib/services/matchMaking";
import { json } from "@sveltejs/kit";
import { MatchEvents } from "$lib/socket_events/MatchEvents";

export const GET: RequestHandler = async function ({locals, params}){
 
    let { user } = locals;

    if(!user){
        return InvalidRequest()
    }

    const { match_id } : {match_id?: string}= params;
    

    if(playingMatches.matches.some(x => x.matchId !== match_id)){
        return InvalidRequest()
    }


    let match = playingMatches.matches.find(x => x.matchId === match_id);

    if(!match){
        return InvalidRequest()
    }


    let maps = [];
    let userVoted = false;

    for(let map of match.maps){
        maps.push(map[0])
    }

    if(match.usersWhoVoted.get(user.id) || match.maps.size === 1){
        userVoted = true;
    }

    return json({ maps, userVoted })
}   

export const POST: RequestHandler = async function ({locals}){

    return Success()
}

export const PATCH: RequestHandler = async function ({locals}){

    return Success()
}

export const DELETE: RequestHandler = async function ({locals, request, params}){

    let { user, supabase } = locals;
    const { match_id } = params

    console.log('banning_map')
    if(!match_id || !user){
        return InvalidRequest()
    }

    let { map_id } : {map_id: string} = await request.json();

    if(!map_id){
        return InvalidRequest()
    }

    let matchIndex = playingMatches.matches.findIndex(x => x.matchId === match_id);

    if(matchIndex === -1){
        return InvalidRequest()
    }


    let token = request.headers.get('authorization')?.split(' ')[1];

    removeMapFromMatch(playingMatches.matches[matchIndex], user.id, map_id);

    console.log('map_deleted');
    if(playingMatches.matches[matchIndex].maps.size === 1){
        MatchEvents.emit("UPDATE_MAP", {match: playingMatches.matches[matchIndex]});           
    }else{
        console.log('we here')
        MatchEvents.emit("REFRESH_ACTIVE_MAPS", {match: playingMatches.matches[matchIndex]})
    }

    return Success()    
}