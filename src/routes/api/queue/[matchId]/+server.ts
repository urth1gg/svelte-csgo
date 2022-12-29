import { Success, InvalidRequest } from "$lib/json_responses/responses";
import type { RequestHandler } from "@sveltejs/kit";
import { playingMatches } from "$lib/services/matchMaking";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async function ({locals, params}){
    let { user, supabase } = locals;


    let { matchId } : {matchId?: string}= params;

    if(matchId === undefined){
        return InvalidRequest()
    }

    
    let numOfPlayersWhoAccepted = 0;

    let match = playingMatches.matches.find((x:any) => x.matchId === matchId);
    if(match){
        let allPlayers = [...match.teamA, ...match.teamB ]

        allPlayers.forEach( (player: any) => {
            if(player.acceptedMatch){
                numOfPlayersWhoAccepted++;
            }
        });
    }
    return json({ playersAccepted: numOfPlayersWhoAccepted })
}   