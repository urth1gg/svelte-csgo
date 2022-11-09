import type { SupabaseClient } from "@supabase/supabase-js"

export async function getUser(username: string, supabase: SupabaseClient){
    let user = await supabase.from('users').select('*').eq('username', username)
    if(user.error){
        return null;
    }
    return user.data[0]
}