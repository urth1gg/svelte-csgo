<script lang="ts">
    import { browser } from '$app/environment';
	import { PUBLIC_BASE_URL } from '$env/static/public';
    import { onMount } from 'svelte';

 
    let runningMatches: any = [];

    onMount(async () => {
        const response = await fetch(`${PUBLIC_BASE_URL}/api/matches?unfinished_matches=true`);
        runningMatches = await response.json();
    });

    console.log(runningMatches);
</script>

<style>

</style>
<div class="flex justify-center items-center bg-custom h-screen section w-full">
    test
</div>