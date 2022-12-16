import { Success, InvalidRequest } from "$lib/json_responses/responses";
import type { RequestHandler } from "@sveltejs/kit";
import { initMapsForMatch, removeMapFromMatch } from "$lib/services/matches";
import { Socket } from "$lib/../socket";

let matches: MatchesInMemory = {} as MatchesInMemory;

export const GET: RequestHandler = async function ({locals, params}){
 
    console.log(matches)

    const { match_id } : {match_id?: string}= params;
    
    if(match_id === undefined || !!matches[match_id] === true){
        return InvalidRequest()
    }

    matches[match_id] = {
        maps: new Map<string, string>(),
        users: new Map<string, Partial<User>>()
    }

    initMapsForMatch(matches[match_id]);

    return Success()
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

    if(!match_id){
        return InvalidRequest()
    }

    let { map_id } : {match_id: string, map_id: string} = await request.json();

    if(!matches[match_id] || !map_id){
        return InvalidRequest()
    }

    removeMapFromMatch(matches[match_id], map_id);

    Socket.mapBanned(matches[match_id]);
    console.log(matches)
    return Success()    
}