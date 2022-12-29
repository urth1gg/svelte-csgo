import {json, type RequestHandler } from "@sveltejs/kit";
import * as FlagsService from '$lib/services/flags';


function assertUserIsNotNull (user: User | null): asserts user is User {
  if (user === null) {
    throw new Error('User does not exist');
  }
}

export const GET: RequestHandler = async function ({locals, request}){
    let { user } = locals;

    assertUserIsNotNull(user);

    let { data, error } = await FlagsService.getUserFlags(user, locals.supabase);

    if(error) return json({error: error.message}, {status: 500});

    return json({data: data, success: true});
}
export const POST: RequestHandler = async function ({locals, request}){
    let { user } = locals;

    assertUserIsNotNull(user);

    let { flags } = await request.json();

    let { data, error } = await FlagsService.setUserFlags(user, flags, locals.supabase);

    if(error) return json({error: error.message}, {status: 500});

    return json({data: data});
}