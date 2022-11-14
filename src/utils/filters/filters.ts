import { FriendRequestStatus } from '$lib/enums/enums';

function onlyAcceptedFriends(friends: Friend[]) {
  return friends.filter(friend => friend.status === FriendRequestStatus.ACCEPTED);
}

function onlyPendingFriends(friends: Friend[]) {
    return friends.filter(friend => friend.status === FriendRequestStatus.PENDING_SECOND_USER_REQUESTED);
}

export { onlyAcceptedFriends, onlyPendingFriends };