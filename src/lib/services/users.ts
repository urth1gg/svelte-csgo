import type { SupabaseClient } from "@supabase/supabase-js"

export async function getUserWithAllRelatons(username: string, supabase: SupabaseClient){
    let user = await supabase.from('users').select(`
    id,
    username,
    email,
    created_at,
    stats (
        *
    ),
    friends!friends_user_id_fkey (
        friend_id,
        user_id,
        status
    )
    `).eq('username', username).single()
    
    if(user.error){
        return null;
    }

    return user.data as Partial<User>;
}

export async function getUserById(id: string, supabase: SupabaseClient){
    let user = await supabase.from('users').select(`
      username
    `).eq('id', id).single()
    
    if(user.error){
        return null;
    }

    return user.data as Partial<User>;
}