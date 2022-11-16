import { FriendRequestStatus } from '$lib/enums/enums';

function onlyAcceptedFriends(friend: Friend) {
  return friend.status === FriendRequestStatus.ACCEPTED;
}

function onlyPendingFriends(friend: Friend) {
    return friend.status === FriendRequestStatus.PENDING_SECOND_USER_REQUESTED;
}

function onlyActiveFriends(friend: Friend) {
    return (friend.friend.flags?.[0].is_online === true);
}

function onlyNotInParty(friend: Friend) {
    return !friend.friend.flags?.[0].in_party;
}

function onlyNotInGame(friend: Friend) {
    return !friend.friend.flags?.[0].in_game;
}
export { onlyAcceptedFriends, onlyPendingFriends, onlyActiveFriends, onlyNotInParty, onlyNotInGame};