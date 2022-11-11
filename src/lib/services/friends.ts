import { supabase } from "../../utils/db/supabase";
import { FriendRequestStatus } from '$lib/enums/enums';

async function getFriends(user: User | undefined) {
    let p1 = supabase.from('users').select(
        `
        id,
        username,
        friends!inner!friends_user_id_fkey (
            friend_id,
            user_id,
            status
        )
    `
    ).eq('friends.user_id', user?.id).eq('friends.status', FriendRequestStatus.ACCEPTED).then();

    let p2 = supabase.from('users').select(
        `
        id,
        username,
        friends!inner!friends_friend_id_fkey (
            friend_id,
            user_id,
            status
        )
    `).eq('friends.user_id', user?.id).eq('friends.status', FriendRequestStatus.PENDING_SECOND_USER_REQUESTED).then();
    
    let promises = [ p1, p2 ];
    try{
        let [ p1, p2 ] = await Promise.all(promises);

        if(p1.error || p2.error){
            return { error: p1.error || p2.error }
        }

        let data = {
            friends: p1.data,
            pending: p2.data
        }
        return { data, success: true }
    }catch(e: any){
        return { error: e.message }
    }
}

async function updateFriendStatus(loggedInUser: Partial<User> | undefined, friend: Partial<User>, status: FriendRequestStatus){
    let { data, error } = await supabase.from('friends').update({ status: status }).eq('user_id', loggedInUser?.id).eq('friend_id', friend.id).single();
    if(error){
        return { error: error }
    }
    return { data, error: false }
}

async function sendFriendRequest(profile1: Partial<User> | undefined, profile2: Partial<User> | undefined, status: FriendRequestStatus){
    let { data, error } = await supabase.from('friends').insert({ user_id: profile1?.id, friend_id: profile2?.id, status: status }).single();

    if(error){
        console.log(error)
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