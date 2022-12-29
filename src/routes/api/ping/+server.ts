import { Success } from "$lib/json_responses/responses";
import type { RequestHandler } from "@sveltejs/kit";
//import { client } from "../../../utils/redis/client";

let timeouts = new Map();

export const GET: RequestHandler = async function ({locals}){
    let { user, supabase } = locals;


    
    // Set user online

    await supabase.from('flags').update({ is_online: true }).eq('user_id', user?.id);
    // Set timeout to set the user offline after 5 minutes
    clearTimeout(timeouts.get(user?.id)); 
    timeouts.set(user?.id, setTimeout(() => {
        supabase.from('flags').update({ is_online: false }).eq('user_id', user?.id);
        timeouts.delete(user?.id);
    }, 1000 * 60 * 5));
    
    return Success()
}   