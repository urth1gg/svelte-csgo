import { Success } from "$lib/json_responses/responses";
import type { RequestHandler } from "@sveltejs/kit";
import { client } from "../../../utils/redis/client";

let timeouts = new Map();

export const GET: RequestHandler = async function ({locals}){
    let { user } = locals;


    client.HSET(`user:${user?.id}`, 'isOnline', "true");

    // Set timeout to set the user offline after 5 minutes
    clearTimeout(timeouts.get(user?.id)); 
    timeouts.set(user?.id, setTimeout(() => {
         client.HSET(`user:${user?.id}`, 'isOnline', "false");
         timeouts.delete(user?.id);
    }, 1000 * 60 * 5));
    
    return Success()
}   