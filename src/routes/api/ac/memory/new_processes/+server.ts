import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { aws } from '$lib/services/aws';
import { memory } from '$lib/services/memory';
import { Success } from '$lib/json_responses/responses';

export const POST: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase } = locals;

    if(!user){
        return json({ error: 'User not found' }, { status: 500 })
    }

    let requestData = await request.json();

    memory.setTableToNewProcesses();

    console.log(requestData);
    
    let { error } = await memory.sendMemoryData(JSON.stringify(requestData), user, supabase);

    if(error){
        console.log(error);
        return json({ error: error }, { status: 500 })
    }

    return Success();
};
