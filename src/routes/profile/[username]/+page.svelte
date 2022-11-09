<script>
    import Profile from '$lib/components/unauth/Profile.svelte';
    export let data;

    let { user, stats } = data;

</script>

<div class="p-5 w-full">
    <div class="flex w-8/12">
        <Profile {user} {stats} />
    </div>
</div>
