import{ json, type RequestHandler } from "@sveltejs/kit";
import * as FriendsService from "$lib/services/friends";

export const GET: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase } = locals;

    let { data, error } = await FriendsService.getFriends(user);

    if(error) return json({error: error.message}, {status: 500});

    return json({data: data});
}

export const POST: RequestHandler = async function ({locals, request, cookies}){

    return json({success: true}, {status: 200})
}
