<script lang="ts">
    import Queue from '$lib/components/Queue.svelte';
    import FriendRequests from '$lib/components/FriendRequests.svelte';
    import { accessToken } from '$lib/store/accessToken';
    import StartPlaying from '$lib/components/unauth/StartPlaying.svelte';
    import ProvideUsername from '$components/inputs/ProvideUsername.svelte';
	import { FriendRequestStatus } from '$lib/enums/enums';
    import { userData, setFriends } from '$lib/store/userData';
    import ProvideSteamId from '$components/inputs/ProvideSteamId.svelte';

    export let data;

    let { loggedIn, user} : { loggedIn: boolean, id: string, user: User } = data;

    let friends: Friend[]  = [];

    userData.subscribe( value => {
        friends = value.friends as Friend[];
    })

    console.log(user)

</script>

<div class="w-full p-5 flex gap-5">
    {#if loggedIn}
        {#if !user.username}
            <ProvideUsername />
        {/if}
        
        {#if !user.steam_id}
            <ProvideSteamId />
        {/if}
        
        <Queue lazy={$accessToken ? false: true }/>
        <FriendRequests lazy={$accessToken ? false: true } friends={
            friends ? (friends.filter(x => x.status !== FriendRequestStatus.ACCEPTED && x.status !== FriendRequestStatus.PENDING_FIRST_USER_REQUESTED)) : []} 
            invalidate={setFriends} />
    {:else}
        <StartPlaying />
    {/if}
</div>
