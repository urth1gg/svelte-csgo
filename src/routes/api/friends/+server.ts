import{ json, type RequestHandler } from "@sveltejs/kit";
import { FriendRequestStatus } from "$lib/enums/enums";
import * as FriendsService from "$lib/services/friends";

export const GET: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase } = locals;

    let { data, error } = await FriendsService.getFriends(user);

    if(error) return json({error: error.message}, {status: 500});

    return json({data: data, success: true});
}

export const PATCH: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase } = locals;
    let { friend, status } = await request.json();

    if(!user?.id) return json({error: "Not logged in"}, {status: 401});
    if(!friend) return json({error: "No friend provided"}, {status: 400});
    if(!status) return json({error: "No status provided"}, {status: 400});

    if(friend.status === FriendRequestStatus.PENDING_FIRST_USER_REQUESTED){
        friend.friend_id = friend.user_id;
    }
    let p1 = FriendsService.updateFriendStatus(user.id, friend.friend_id, status);
    let p2 = FriendsService.updateFriendStatus(friend.friend_id, user.id, status);

    let promises = [ p1, p2 ];

    try{
        let [ p1, p2 ] = await Promise.all(promises);

        if(p1.error || p2.error){
            return json({error: p1.error || p2.error}, {status: 500});
        }

        return json({success: true});
    }catch(e: any){
        return json({error: e.message}, {status: 500});
    }
}
export const POST: RequestHandler = async function ({locals, request, cookies}){

    let { user, supabase } = locals;

    let { friend } = await request.json();

    let p1 = FriendsService.sendFriendRequest(user, friend, FriendRequestStatus.PENDING_FIRST_USER_REQUESTED);
    let p2 = FriendsService.sendFriendRequest(friend, user, FriendRequestStatus.PENDING_SECOND_USER_REQUESTED);

    let promises = [ p1, p2 ];

    try{
        let [ p1, p2 ] = await Promise.all(promises);

        if(p1.error || p2.error){
            return json({error: p1.error || p2.error}, {status: 500});
        }
        return json({success: true});
    }catch(e: any){
        return json({error: e.message}, {status: 500});
    }
}

export const DELETE: RequestHandler = async function ({locals, request, cookies}){
    let { user, supabase } = locals;

    let { friend } = await request.json();

    let p1 = FriendsService.deleteFriend(user as Partial<User>, friend);
    let p2 = FriendsService.deleteFriend(friend, user as Partial<User>);

    let promises = [ p1, p2 ];
    try{
        let [p1, p2] = await Promise.all(promises);

        if(p1.error || p2.error){
            return json({error: p1.error || p2.error}, {status: 500});
        }
        return json({success: true}, {status: 200})
    }catch(e: any){
        return json({error: e.message}, {status: 500})
    }
}