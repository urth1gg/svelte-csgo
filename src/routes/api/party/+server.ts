import{ json, type RequestHandler } from "@sveltejs/kit";
import { Success } from "$lib/json_responses/responses";

export const GET: RequestHandler = async function ({locals, request, cookies}){
    
    return json({success: true}, {status: 200})
}

export const POST: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase } = locals

    let { friendId } = await request.json();

    let { data } = await supabase.from('users').select('party_id').eq('id', user?.id).single();

    let partyId = data?.party_id;

    if(!partyId) partyId = Math.random().toString(36).substring(2, 11);
    
    await supabase.from('users').update({party_id: partyId}).eq('id', user?.id);
    await supabase.from('users').update({party_id: partyId}).eq('id', friendId);
    
    return Success();
}
