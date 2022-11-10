<script>
    import Profile from '$lib/components/unauth/Profile.svelte';
    export let data;

    let { user, error, userLoggedIn } = data;

</script>


{#if !error}
<div class="p-5 w-full">
    <div class="flex w-8/12">
        <Profile {user} {userLoggedIn} />
    </div>
</div>
{:else}
<div class="p-5 w-full">
    <div class="flex w-8/12">
        <h1 class="text-2xl font-bold text-white">User not found</h1>
    </div>
</div>
{/if}
