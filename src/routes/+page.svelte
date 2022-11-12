<script lang="ts">
    import Queue from '$lib/components/Queue.svelte';
    import FriendRequests from '$lib/components/FriendRequests.svelte';
    import { accessToken } from '$lib/store/accessToken';
    import StartPlaying from '$lib/components/unauth/StartPlaying.svelte';
    import { browser } from '$app/environment';
    import ProvideUsername from '$components/inputs/ProvideUsername.svelte';

    export let data;

    let { loggedIn, id, user} : { loggedIn: boolean, id: string, user: User } = data;

</script>

<div class="w-full p-5 flex gap-5">
    {#if loggedIn}
        {#if !user.username}
            <ProvideUsername />
        {/if}
        <Queue lazy={$accessToken ? false: true }/>
        <FriendRequests lazy={$accessToken ? false: true }/>
    {:else}
        <StartPlaying />
    {/if}
</div>
