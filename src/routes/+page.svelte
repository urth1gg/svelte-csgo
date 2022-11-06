<script lang="ts">
    import { browser } from '$app/environment';
    import Queue from '$lib/components/Queue.svelte';
    import OnlineFriends from '$lib/components/OnlineFriends.svelte';
    export let data; 

    let { loggedIn } = data;
</script>

<div class="w-full p-5 flex gap-5">
    <Queue />
    <OnlineFriends />
</div>
