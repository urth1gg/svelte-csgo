<script lang="ts">
    import Queue from '$lib/components/Queue.svelte';
    import FriendRequests from '$lib/components/FriendRequests.svelte';
    import { accessToken } from '$lib/store/accessToken';
    import StartPlaying from '$lib/components/unauth/StartPlaying.svelte';
    import { browser } from '$app/environment';

    export let data;

    let { loggedIn, id } : { loggedIn: boolean, id: string } = data;
</script>

<div class="w-full p-5 flex gap-5">
    {#if loggedIn}
        <Queue lazy={$accessToken ? false: true }/>
        <FriendRequests lazy={$accessToken ? false: true }/>
    {:else}
        <StartPlaying />
    {/if}
</div>
