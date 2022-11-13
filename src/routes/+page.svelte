<script lang="ts">
    import Queue from '$lib/components/Queue.svelte';
    import FriendRequests from '$lib/components/FriendRequests.svelte';
    import { accessToken } from '$lib/store/accessToken';
    import StartPlaying from '$lib/components/unauth/StartPlaying.svelte';
    import { browser } from '$app/environment';
    import ProvideUsername from '$components/inputs/ProvideUsername.svelte';
    import { fetch_ } from '$utils/fetch/fetch_';
	import { beforeUpdate, onMount } from 'svelte';
    import FriendList from '$components/friends/FriendList.svelte';
	import { FriendRequestStatus } from '$lib/enums/enums';

    export let data;

    let { loggedIn, id, user} : { loggedIn: boolean, id: string, user: User } = data;

    let friends: Friend[] = [];

    async function getFriends(){
        let res = await fetch_("/api/friends");
        let json = await res.json();
        if(json.success){
           friends = json.data;
        }
    }

    accessToken.subscribe(async (token) => {
        if(token){
            await getFriends();
        }
    })
</script>

<div class="w-full p-5 flex gap-5">
    {#if loggedIn}
        {#if !user.username}
            <ProvideUsername />
        {/if}
        
        <FriendList friends={friends.filter(x => x.status === FriendRequestStatus.ACCEPTED)} />
        <Queue lazy={$accessToken ? false: true }/>
        <FriendRequests lazy={$accessToken ? false: true } friends={
            friends.filter(x => x.status !== FriendRequestStatus.ACCEPTED && 
            x.status !== FriendRequestStatus.PENDING_FIRST_USER_REQUESTED    
        )} invalidate={getFriends} />
    {:else}
        <StartPlaying />
    {/if}
</div>
