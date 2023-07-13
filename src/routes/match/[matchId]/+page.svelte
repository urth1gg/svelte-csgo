<script lang="ts">
    import Map from '$lib/components/match/Map.svelte'
    import SectionHeader from '$components/SectionHeader.svelte';
    import { fetch_ } from '$lib/utils/fetch/fetch_';
    import { page } from '$app/stores';
    import { onMount, afterUpdate } from 'svelte';
    import { MatchEvents } from '$lib/socket_events/MatchEvents';

    export let data; 

    let { teamA, teamB, ip } = data;

    let matchMaps: any[] = [];
    let userVoted = false;

    let timeToConnect = 180; // start time in seconds
    let timeToVote: any = null;
    const formatTime = (time: number) => {
        let minutes = Math.floor(time / 60);
        let seconds = (time % 60).toString().padStart(2, '0');

        return `${minutes}:${seconds}`;
    }

    setInterval(() => {
        if(timeToConnect > 0) {
            timeToConnect--;
        }
    }, 1000);

    async function getMaps() {
        if(matchMaps.length !== 0) return; 

        let data = await fetch_(`/api/match/${$page.params.matchId}/maps`, {
            method: 'GET',
        })

        let json = await data.json();
        matchMaps = json.maps ? json.maps : [];
        userVoted = json.userVoted;

        if(json.maps.length === 1) {
            userVoted = true;
        }
    }

    function copyToClipboard(event: any) {
        event.target.select();
        navigator.clipboard.writeText("connect " + ip);
    }

    onMount(async () => {
        await getMaps();
    });

    MatchEvents.on("REFRESH_ACTIVE_MAPS", async (_: any) => {
        let data = await fetch_(`/api/match/${$page.params.matchId}/maps`, {
            method: 'GET',
        })
        let json = await data.json();
        matchMaps = json.maps ? json.maps : [];
        userVoted = json.userVoted;

        if(json.maps.length === 1) {
            userVoted = true;
        }

    })

    MatchEvents.on("MAP_VOTE_TIMER", (data: any) => {
        timeToVote = data.secondsLeft
    });
</script>

<style>
    .player{
        color:white;
        display:flex;
        width:100%;
        height:30px;
        justify-content: center;
        align-items: center;
        border-left:3px solid white;
        padding:25px;
    }

    .ip{
        padding-left:0.5rem !important;
        padding-right:0.5rem !important;
        padding-top:0 !important;
        padding-bottom:0 !important;
        cursor: pointer;
        font-size:1.2rem;
        color:var(--yellow) !important;
    }

    .maps__container{
        margin:0 auto;
        grid-auto-rows: 50px;
    }

    .time-to-connect{
        color: var(--yellow) !important;
        font-size:1.5rem;
    }

    .bg-transparent{
        background-color:transparent !important;
        border-left:none;
        border-right:none;
    }
</style>

<div class="w-9/12 ml-auto mr-auto mt-5">
    <SectionHeader title={!userVoted ? "Click on the map you'd like to ban." : "You have already voted."} divider={false} classProp="mb-3" />
    {#if timeToVote !== null && timeToVote > 0}
        <div class="flex justify-center">
            <p class="time-to-connect">Time to vote: {timeToVote}s</p>
        </div>
    {/if}
    <div class="flex gap-5 section">
        <div class="flex flex-col w-3/12 gap-1">
            {#each teamA as player}
                <div class="player">
                    <p><i class="fas fa-user mr-1 "></i>{player.username || player.id || player}</p>
                    <div class="flex flex-col ml-auto text-sm">
                        <p>ELO: {player.stats?.elo}</p>

                        {#if player.stats?.kills}
                            <p>K/D: {(player.stats.kills / player.stats.deaths).toFixed(2) }</p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        <div class="grid grid-cols-2 gap-1 w-6/12 maps__container">
            {#if matchMaps.length !== 0}
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_dust2")} mapName="de_dust2" mapImage="/images/maps/dust2.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_mirage")} mapName="de_mirage" mapImage="/images/maps/mirage.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_inferno")} mapName="de_inferno" mapImage="/images/maps/inferno.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_nuke")} mapName="de_nuke" mapImage="/images/maps/nuke.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_overpass")} mapName="de_overpass" mapImage="/images/maps/overpass.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_train")} mapName="de_train" mapImage="/images/maps/train.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_vertigo")} mapName="de_vertigo" mapImage="/images/maps/vertigo.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_anubis")} mapName="de_anubis" mapImage="/images/maps/anubis.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_ancient")} mapName="de_ancient" mapImage="/images/maps/ancient.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_cache")} mapName="de_cache" mapImage="/images/maps/cache.jpg" />
                <Map userVoted={userVoted} mapBanned={!matchMaps.includes("de_tuscan")} mapName="de_tuscan" mapImage="/images/maps/tuscan.jpg" />
            {/if}
        </div>

        <div class="flex flex-col w-3/12 gap-1">
            {#each teamB as player}
                <div class="player">
                    <p><i class="fas fa-user mr-1 "></i>{player.username || player.id || player}</p>
                    <div class="flex flex-col ml-auto text-sm">
                        <p>ELO: {player.stats?.elo}</p>
                        {#if player.stats?.kills}
                            <p>K/D: {(player.stats.kills / player.stats.deaths).toFixed(2) }</p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    {#if ip}
    <div class="flex flex-col w-full h-[250px] items-center section text-white">
        <p class="mt-3"><b>Match has been STARTED!</b></p>
        <p class="text-bold mt-10">Time to connect: <span class="time-to-connect">{formatTime(timeToConnect)}</span></p>

        <input value="connect {ip}" class="mt-1 text-center ip w-[350px] bg-transparent" on:click={copyToClipboard} />

        <p class="mt-5">Good luck, have fun and REMEMBER to RESPECT the rules.</p>
    </div>
    {/if}
</div>
