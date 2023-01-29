import type { RequestHandler } from "@sveltejs/kit";
import { InvalidRequest, Success } from "$lib/json_responses/responses";
import { json } from "@sveltejs/kit"
import { CSGO_USER } from "$env/static/private";
import * as UsersService from "$lib/services/users";
import { aws } from '$lib/services/aws';
import { signToken } from "$utils/auth/signToken";

const DRAW = '1';
const CS_TEAM_T = '2';
const CS_TEAM_CT = '3';

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

    let winner = '0';
    if(ctScore > tScore){
        winner = CS_TEAM_CT
    }else if(tScore > ctScore){
        winner = CS_TEAM_T
    }else{
        winner = DRAW;
    }

    console.log('ct_score', ctScore)
    console.log('t_score', tScore)
    
    await locals.supabase.from('matches').update({winner}).eq('id', params.match_id);


    let winningTeam = null;
    if(winner === CS_TEAM_CT){
        winningTeam = match.data.team_a;
    }else if(winner === CS_TEAM_T){
        winningTeam = match.data.team_b;
    }

    console.log('winning_team', winningTeam);


    return Success();
}