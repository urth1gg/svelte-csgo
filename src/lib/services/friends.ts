import { supabase } from "../../utils/db/supabase";

async function getFriends(user: User | undefined) {
    let acceptedFriends = supabase.from('friends').select('*').eq('user_id', user?.id).eq('status', FriendRequestStatus.ACCEPTED).then();
    let pendingFriends = supabase.from('friends').select('*').eq('user_id', user?.id).eq('status', FriendRequestStatus.PENDING).then();

    let promises = [ acceptedFriends, pendingFriends ];

    try{
        let [ acceptedFriends, pendingFriends ] = await Promise.all(promises);
        let data = {
            acceptedFriends: acceptedFriends.data,
            pendingFriends: pendingFriends.data
        }
        return { data, error: false}
    }catch(e: any){
        return { error: e}
    }
}

export { getFriends }