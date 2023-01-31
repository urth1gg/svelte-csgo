import type { RequestHandler } from "@sveltejs/kit";
import { InvalidRequest, Success } from "$lib/json_responses/responses";
import { json } from "@sveltejs/kit"
import { CSGO_USER } from "$env/static/private";
import * as UsersService from "$lib/services/users";
import { aws } from '$lib/services/aws';
import { signToken } from "$utils/auth/signToken";
import { changeElo } from "$lib/services/matches";

const DRAW = '1';
const CS_TEAM_T = '2';
const CS_TEAM_CT = '3';
const MATCH_STOPPED = '4';

class TeamVariable{
    team: string;

    constructor(team: string){
        this.team = team;
    }

    swap(){
        if(this.team === DRAW) return;

        if(this.team === CS_TEAM_T){
            this.team = CS_TEAM_CT;
        }else if(this.team === CS_TEAM_CT){
            this.team = CS_TEAM_T;
        }
    }

}

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

    let t = signToken({user_id: 'admin'})

    if(!t) return InvalidRequest();
    
    //let response = await aws.terminateInstance(t);
    //console.log(response)

    //await aws.terminateInstance(match.data.ip);

    let ctScore = data.ct_score;
    let tScore = data.t_score;

    if(ctScore < 16 && tScore < 16) {
        //locals.supabase.from('matches').update({winner: MATCH_STOPPED}).eq('id', params.match_id).then();
        //console.log('stopped prematurely');
        //return Success();
    }

    let winner = null;
    if(ctScore > tScore){
        winner = new TeamVariable(CS_TEAM_CT);
    }else if(tScore > ctScore){
        winner = new TeamVariable(CS_TEAM_T);
    }else{
        winner = new TeamVariable(DRAW);
    }


    if(match.data.halftime){
        winner.swap();
    }

    if(match.data.teams_swapped){
        winner.swap();
    }

    await locals.supabase.from('matches').update({winner: winner.team}).eq('id', params.match_id).then();

    if(winner.team === DRAW){
        return Success();
    }

    await changeElo(match.data.id, supabase);

    return Success();
}