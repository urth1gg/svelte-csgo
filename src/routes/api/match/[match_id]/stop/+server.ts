import type { RequestHandler } from "@sveltejs/kit";
import { InvalidRequest, Success } from "$lib/json_responses/responses";
import { json } from "@sveltejs/kit"
import { CSGO_USER, CSGO_PASS } from "$env/static/private";
import * as UsersService from "$lib/services/users";
import { aws } from '$lib/services/aws';

export const POST: RequestHandler = async function ({locals, params, request}){
     
        let { user, supabase } = locals;
    
        if(!user){
            return InvalidRequest()
        }
    
        //TODO: Make sure that the action is coming from an admin.

        if(user.role_name !== 'admin'){
            return InvalidRequest()
        }
    
    
        let match = await locals.supabase.from('matches').select('*').eq('id', params.match_id).single();
    
        if(match.error) {
            console.log(match.error)
            return json({error: match.error}, {status: 500})
        }
    
        if(!match.data) return InvalidRequest();
    
        let ip = match.data.ip;

        //aws.terminateInstance(ip);

        await locals.supabase.from('matches').update({winner: '4'}).eq('id', params.match_id);
        return Success();
    
}