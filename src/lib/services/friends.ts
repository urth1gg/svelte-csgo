import { supabase } from "../../utils/db/supabase";
import { FriendRequestStatus } from '$lib/enums/enums';

async function getFriends(user: User | undefined) {
    let p1 = supabase.from('friends').select(
        `
        friend_id,
        user_id,
        status,
        user:users!friends_user_id_fkey (
            id,
            username,
            flags(
                is_online
            ),
            stats(
                elo
            )
        ),
        friend:users!friends_friend_id_fkey (
            id,
            username,
            flags(
                is_online
            ),
            stats(
                elo
            )
        )
    `
    ).eq('user_id', user?.id).or(`status.eq.${FriendRequestStatus.ACCEPTED},status.eq.${FriendRequestStatus.PENDING_SECOND_USER_REQUESTED}`);
    
    let promises = [ p1 ];

    try{
        let [ p1 ] = await Promise.all(promises);


        if(p1.error){
            return { error: p1.error }
        }

        return { data: p1.data, success: true }
    }catch(e: any){
        return { error: e.message }
    }
}

async function updateFriendStatus(user_id: string, friend_id: string, status: FriendRequestStatus){
    let { data, error } = await supabase.from('friends').update({ status: status }).eq('user_id', user_id).eq('friend_id', friend_id).single();
    if(error){
        return { error: error }
    }
    return { data, error: false }
}

async function sendFriendRequest(profile1: Partial<User> | undefined, profile2: Partial<User> | undefined, status: FriendRequestStatus){
    let { data, error } = await supabase.from('friends').insert({ user_id: profile1?.id, friend_id: profile2?.id, status: status }).single();

    if(error){
        return { error: error }
    }
    return { data, error: false }
}

async function deleteFriend(loggedInUser: Partial<User>, friend: Partial<User>){
    let { data, error } = await supabase.from('friends').delete().eq('user_id', loggedInUser.id).eq('friend_id', friend.id).single();

    if(error){
        return { error: error }
    }
    return { data, error: false }
}


export { getFriends, updateFriendStatus, sendFriendRequest, deleteFriend }