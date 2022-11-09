import{ json, type RequestHandler } from "@sveltejs/kit";
import { Success } from "$lib/json_responses/responses";
import { client } from "../../..//utils/redis/client";

export const GET: RequestHandler = async function ({locals, request, cookies}){
    
    return json({success: true}, {status: 200})
}

export const POST: RequestHandler = async function ({locals, request, cookies}){
    let { partyId } = await request.json();
    let { user } = locals

    if(!partyId) partyId = Math.random().toString(36).substring(2, 11);

    await client.HSET(`user:${user?.id}`, 'partyId', partyId);
    
    return Success();
}
