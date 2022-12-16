import type { SupabaseClient } from "@supabase/supabase-js";

export async function setUserFlags(user: Partial<User>, flags: Partial<UserFlags>, supabase: SupabaseClient){
    let {data, error} = await supabase.from('flags').update(flags).eq('user_id', user.id);

    if(error){
        return {data: null, error: error};
    }

    return {data: data};
}

export async function getUserFlags(user: Partial<User>, supabase: SupabaseClient){
    let {data, error} = await supabase.from('flags').select('*').eq('user_id', user.id);

    if(error){
        return {data: null, error: error};
    }

    return {data: data};
}