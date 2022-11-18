import{ json, type RequestHandler } from "@sveltejs/kit";
import { Success } from "$lib/json_responses/responses";

export const GET: RequestHandler = async function ({locals, request, cookies}){
    
    let { user, supabase } = locals;

    let { data, error} = await supabase.from('users').select('party_id').eq('id', user?.id).single();

    console.log(data);
    
    if (error) {
        return json({error: error.message}, {status: 500});
    }

    if(!data?.party_id){
        return json({error: "No party found"}, {status: 404});
    }

    let partyId = data?.party_id;
    let users = await supabase.from('users').select('username, profile_img').eq('party_id', partyId);

    return json(users);
}

export const POST: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase } = locals

    let { friendId } = await request.json();

    console.log(friendId)
    let { data } = await supabase.from('users').select('party_id').eq('id', user?.id).single();

    let partyId = data?.party_id;

    if(!partyId) partyId = Math.random().toString(36).substring(2, 11);
    
    supabase.from('users').update({party_id: partyId}).eq('id', user?.id).then()
    supabase.from('users').update({party_id: partyId}).eq('id', friendId).then()
    
    return Success();
}
