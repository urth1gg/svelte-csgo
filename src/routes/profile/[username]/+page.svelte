<script>
    import Profile from '$lib/components/unauth/Profile.svelte';
    import Matches from '$lib/components/unauth/profile/Matches.svelte';
    export let data;

    let { user, error, userLoggedIn } = data;

</script>


{#if !error}
<div class="p-5 w-full">
    <div class="flex w-12/12 section3">
        <Profile user={user} userLoggedIn={userLoggedIn} />
    </div>
    <div class="flex w-12/12">
        <Matches />
    </div> 
</div>
{:else}
<div class="p-5 w-full">
    <div class="flex w-12/12">
        <h1 class="text-2xl font-bold text-white">User not found</h1>
    </div>
</div>
{/if}
