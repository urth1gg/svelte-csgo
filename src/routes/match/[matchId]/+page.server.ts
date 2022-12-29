import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import { playingMatches } from "$lib/services/matchMaking";

export async function load({locals, params}: ServerLoadEvent) {

    const { matchId } : {matchId?: string}= params;

    if(!matchId){
        throw redirect(302, '/')
    }

    if(!playingMatches.matches.some(x => x.matchId === matchId)){
        throw redirect(302, '/')
    }

    return {
        teamA: playingMatches.matches.find(x => x.matchId === matchId).teamA,
        teamB: playingMatches.matches.find(x => x.matchId === matchId).teamB,
        matchId: matchId
    }
}