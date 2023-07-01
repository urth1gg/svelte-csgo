import { getAllUnfinishedMatches } from '$lib/services/matches';
import { InvalidRequest, Success } from '$lib/json_responses/responses';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async function ({ locals, request }) {

    let { user, supabase } = locals;

    if (!user) {
        return InvalidRequest();
    }

    let data = null;

    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);

    if(params.get('unfinished_matches') === 'true'){
        data = await getAllUnfinishedMatches(supabase);
    }

    if (!data) {
        return InvalidRequest();
    }
    
    return json({ data: data, success: true });
}