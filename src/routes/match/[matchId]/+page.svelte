<script lang="ts">
    import Map from '$lib/components/match/Map.svelte'
    import SectionHeader from '$components/SectionHeader.svelte';
    import { fetch_ } from '$lib/utils/fetch/fetch_';
    import { page } from '$app/stores';
    import { onMount, afterUpdate } from 'svelte';
    import { MatchEvents } from '$lib/socket_events/MatchEvents';

    export let data; 

    let { teamA, teamB } = data;
    let matchMaps: any[] = [];

    let userVoted = false;
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

    onMount(async () => {
        await getMaps();
    })

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
        padding: 2rem !important;
    }

    .maps__container{
        margin:0 auto;
        grid-auto-rows: 50px;
    }
</style>

<div class="section w-9/12 ml-auto mr-auto mt-5">
    <SectionHeader title={!userVoted ? "Click on the map you'd like to ban." : "You have already voted."} divider={false} classProp="mb-3" />
    <div class="flex gap-5">
        <div class="flex flex-col w-3/12 gap-1">
            {#each teamA as player}
                <div class="player">
                    <p><i class="fas fa-user mr-1 "></i>{player.id}</p>
                    <div class="flex flex-col ml-auto text-sm">
                        <p>ELO: {player.elo}</p>
                        <p>K/D: 1.32</p>
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
                    <p><i class="fas fa-user mr-1 "></i>{player.id}</p>
                    <div class="flex flex-col ml-auto text-sm">
                        <p>ELO: {player.elo}</p>
                        <p>K/D: 1.32</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
