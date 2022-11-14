<script lang="ts">
    import { FriendRequestStatus } from "$lib/enums/enums";
    import { fetch_ } from "../../../../utils/fetch/fetch_"
    import { setFriends } from "$lib/store/userData";
    export let userLoggedIn: Partial<User> | null;
    export let profile: User | null;
    export let isFriend: Partial<Friend> | null;

    async function onAddFriend(){
        let res = await fetch_('/api/friends', {
            method: 'POST',
            body: JSON.stringify({
                friend: profile,
            })
        })

        let json = await res.json();
        if(json.success){
            isFriend = {
                status: FriendRequestStatus.PENDING_SECOND_USER_REQUESTED,
            }
        }
    }

    async function onCancelRequest(){
        let res = await fetch_('/api/friends', {
            method: 'DELETE',
            body: JSON.stringify({
                friend: profile,
            })
        })

        let json = await res.json();
        if(json.success){
            isFriend = null;
        }
    }

    async function onAcceptRequest(){

        let res = await fetch_('/api/friends', {
            method: 'PATCH',
            body: JSON.stringify({
                friend: profile?.friends?.find((x: Partial<Friend>) => x.friend_id === userLoggedIn?.id),
                status: FriendRequestStatus.ACCEPTED,
            })
        })

        let json = await res.json();
        if(json.success){
            isFriend = {
                status: FriendRequestStatus.ACCEPTED,
            }
            setFriends();
        }
    }


</script>

{#if userLoggedIn && userLoggedIn.id !== profile?.id}
{#if isFriend?.status === FriendRequestStatus.ACCEPTED}
    <div class="flex justify-center items-center mt-5">
        <button class="btn rounded-lg">
                <span class="font-bold">Friends</span>
                <i class="fa-solid fa-check"></i>
        </button>
    </div>
{:else if isFriend?.status === FriendRequestStatus.PENDING_SECOND_USER_REQUESTED}
    <div class="flex justify-center items-center mt-5">
        <button class="btn rounded-lg" on:click={onCancelRequest}>Cancel Request</button>
    </div>
{:else if isFriend?.status === FriendRequestStatus.PENDING_FIRST_USER_REQUESTED}
    <div class="flex justify-center items-center mt-5">
        <button class="btn rounded-lg" on:click={onAcceptRequest}>Accept</button>
    </div>
{:else}
    <div class="flex justify-center items-center mt-5">
        <button class="btn rounded-lg" on:click={onAddFriend}>Add friend</button>
    </div>
{/if}
{/if}