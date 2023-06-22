import type { SupabaseClient } from "@supabase/supabase-js"

export async function getUserWithAllRelatons(username: string, supabase: SupabaseClient){
    console.log(username)
    let user = await supabase.from('users').select(`
    id,
    username,
    email,
    created_at,
    steam_id,
    stats (
        *
    ),
    flags(
        *
    ),
    elo_history (
        *
    ),
    friends!friends_user_id_fkey (
        friend_id,
        user_id,
        status,
        user:users!friends_user_id_fkey (
            username
        ),
        friend:users!friends_friend_id_fkey (
            username
        )
    )
    `).eq('username', username).single();
  
    if(user.error){
        return null;
    }

    return user.data as Partial<User>;
}

export async function getUserById(id: string, supabase: SupabaseClient){
    if(!id) return null;

    let user = await supabase.from('users').select(`
        id,
        username,
        email,
        steam_id,
        created_at,
        stats (
            *
        ),
        flags(
            *
        )
    `).eq('id', id).single()
    
    if(user.error){
        return null;
    }

    return user.data as Partial<User>;
}

export async function updateUser(id: string, data: Partial<User>, supabase: SupabaseClient){
    let { data: user, error } = await supabase.from('users').update(data).eq('id', id);
    if(error) return {error: error};
    
    return {data: user};
}

export async function searchUserByUsername(username: string, supabase: SupabaseClient){
    let { data, error } = await supabase.from('users').select(`
        username,
        id,
        stats (
            elo
        ),
        flags(
            *
        )
    `).ilike('username', `%${username}%`).limit(5);
    if(error) return {error: error};
    
    return {data: data};
}

export async function setUserPartyId(id: string, partyId: string, supabase: SupabaseClient){
    let { data, error } = await supabase.from('users').update({
        party_id: partyId
    }).eq('id', id);

    if(error) return {error: error};
    
    return {data: data};
}

export async function convertPlayersToUsers(team: Array<Player>, supabase: SupabaseClient){
    let users = await Promise.all(team.map(async (player) => {
        let user = await getUserById(player.id, supabase);
        if(!user) return player;
        return {
            ...user,
        }
    }));

    return users as Array<Partial<User>>;
}

export async function getUserBySteamId(steam_id: string, supabase: SupabaseClient){
    let { data, error } = await supabase.from('users').select(`
        id,
        username,
        email,
        steam_id,
        created_at,
        stats (
            *
        ),
        flags(
            *
        )
    `).eq('steam_id', steam_id).single();

    if(error) return null;
    
    return data as Partial<User>;
}