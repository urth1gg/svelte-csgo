import type { Handle } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_SECRET_KEY } from "$env/static/private"
import { accessToken } from "$lib/store/accessToken";

const supabaseUrl = 'https://msrttzvmxmhwktgferof.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_SECRET_KEY)

export const handle1: Handle = async ({event, resolve}) => {

    console.log('r')
    const response = await resolve(event)
    return response;
}
