<script lang="ts">
    import { browser } from '$app/environment';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { parse } from 'dotenv';
    import { onMount } from 'svelte';

 
    let runningMatches: any = [];

    onMount(async () => {
        const response = await fetch(`${PUBLIC_BASE_URL}/api/matches?unfinished_matches=true`);
        let matches = await response.json();
        runningMatches = await matches.data;
        console.log(runningMatches)

    });

    function stopMatch(matchId: string) {
        fetch(`${PUBLIC_BASE_URL}/api/match/${matchId}/stop`, {
            method: 'POST',
        }).then(() => {
            runningMatches = runningMatches.filter((match: any) => match.id !== matchId);
        });
    }


</script>

<style>
    table{
        border-collapse: collapse;
        color:white;
    }
</style>

<div class="flex bg-custom w-8/12 p-5">
    <table class="w-full section p-5">
        <thead>
            <tr>
                <th class="px-4 py-2">Match ID</th>
                <th class="px-4 py-2">Team A</th>
                <th class="px-4 py-2">Team B</th>
                <th class="px-4 py-2">Stop Match</th>
            </tr>
        </thead>
        <tbody>
            {#each runningMatches as match}
                <tr>
                    <td class="px-4 py-2 text-center">{match.id}</td>
                    <td class="px-4 py-2 text-center">
                        {#each match.team_a as key, i (key)}
                            {JSON.parse(key).username || JSON.parse(key).id}{i === match.team_a.length - 1 ? '' : ', '}
                        {/each}
                    </td>
                    <td class="px-4 py-2 text-center">
                        {#each match.team_b as key, i (key)}
                            {JSON.parse(key).username || JSON.parse(key).id}{i === match.team_b.length - 1 ? '' : ', '}
                        {/each}
                    </td>
                    <td class="px-4 py-2 text-center">
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-2 rounded" on:click={() => stopMatch(match.id)}>Stop</button>
                    </td>
                </tr>
            {/each}
        </tbody>
</div>