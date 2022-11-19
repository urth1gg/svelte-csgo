import{ json, type RequestHandler } from "@sveltejs/kit";
import { Success } from "$lib/json_responses/responses";
import { Socket } from '../../../socket';
export const GET: RequestHandler = async function ({locals, request, cookies}){
    
    let { user, supabase } = locals;

    let { data, error } = await supabase.from('users').select('party_id').eq('id', user?.id).single();

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

    let p1_ = supabase.from('users').select('party_id').eq('id', user?.id).single().then();
    let p2_ = supabase.from('users').select('party_id').eq('id', friendId).single().then();
    
    let [p1, p2] = await Promise.all([p1_, p2_]);

    if(p1.error || p2.error){
        return json({error: "Error finding party"}, {status: 500});
    }


    let partyId: string = "";

    if(p1.data?.party_id){
        partyId = p1.data?.party_id
    }else{
        partyId = p2.data?.party_id
    }

    if(!partyId || partyId === '') {
        partyId = Math.random().toString(36).substring(2, 11);
    }

    console.log('called by', user?.username)
    console.log(p1.data, p2.data)

    let p11 = supabase.from('users').update({party_id: partyId}).eq('id', user?.id).then()
    let p21 = supabase.from('users').update({party_id: partyId}).eq('id', friendId).then()

    await Promise.all([p11, p21]);
    
    return Success();
}

export const DELETE: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase, token } = locals

    let { username } = await request.json();

    let { data, error } = await supabase.from('users').select('party_id').eq('username', username).single();

    let userPartyId = await supabase.from('users').select('party_id').eq('id', user?.id).single();

    if(userPartyId?.data?.party_id !== data?.party_id){
        return json({error: "You are not in the same party"}, {status: 403});
    }

    if (error) {
        return json({error: error.message}, {status: 500});
    }


    await supabase.from('users').update({party_id: null}).eq('username', username);
    let partyMembers = await supabase.from('users').select('id').eq('party_id', data?.party_id);


    if(partyMembers?.data?.length === 1){
        await supabase.from('users').update({party_id: null}).eq('id', user?.id);
    }

    Socket.getInstance().emit('REFRESH_PARTY', {token: token, partyId: data?.party_id});
    return Success();
}