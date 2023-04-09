import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { Success } from '$lib/json_responses/responses';
import { metrics } from '$lib/services/metrics';

export const POST: RequestHandler = async function ({locals, request}){
    let { user, supabase } = locals;


    if(!user){
        return json({ error: 'User not found' }, { status: 500 })
    }

    let data = await request.json();

    console.log(data);

    let { error } = await metrics.sendMetrics(data.vm_full_access_counter, user, supabase);

    if(error){
        return json({ error: error }, { status: 500 })
    }

    return Success();
};