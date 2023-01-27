import type { RequestHandler } from "@sveltejs/kit";
import { InvalidRequest, Success } from "$lib/json_responses/responses";
import { json } from "@sveltejs/kit"
import { CSGO_USER } from "$env/static/private";
import * as UsersService from "$lib/services/users";


const CS_TEAM_T = 2;
const CS_TEAM_CT = 3;

class TeamVariable{
    team: number;

    constructor(team: number){
        this.team = team;
    }

    swap(){
        if(this.team === CS_TEAM_T){
            this.team = CS_TEAM_CT;
        }else if(this.team === CS_TEAM_CT){
            this.team = CS_TEAM_T;
        }
    }

}
export const POST: RequestHandler = async function ({locals, params, request}){
 
    let { user, supabase } = locals;

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

    let { halftime, teams_swapped } = match.data;

    let teamA = match.data.team_a.map((x: string) => JSON.parse(x))
    let teamB = match.data.team_b.map((x:string) => JSON.parse(x))

    let playerIsInMatch = false;

    for(let player of [...teamA, ...teamB]){
        if(player.steam_id === steam_id) playerIsInMatch = true;
    }
    
    if(!playerIsInMatch){
        return json({playerIsInMatch}, {status: 200});
    }else{
        let user = await UsersService.getUserBySteamId(steam_id, supabase);
        if(!user) return InvalidRequest();

        let { username } = user;
        
        let playerIsInTeamCT = teamA.some((x: any) => x.steam_id === steam_id); 


        let team; 

        if(playerIsInTeamCT){
            team = new TeamVariable(CS_TEAM_CT);
        }else{
            team = new TeamVariable(CS_TEAM_T);
        }

        if(teams_swapped){
            team.swap();
        }

        if(halftime){
            team.swap();
        }

        return json({username, team: team.team, playerIsInMatch}, {status: 200})
    }
}