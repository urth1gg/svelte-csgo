<script lang="ts">
    import Map from '$lib/components/match/Map.svelte'
    import SectionHeader from '$components/SectionHeader.svelte';

    let teamA = [{user: 'bla'},{user: 'bla'},{user: 'bla'},{user: 'bla'},{user: 'bla'}]
    let teamB = [{user: 'blaB'},{user: 'blaB'},{user: 'blaB'},{user: 'blaB'},{user: 'blaB'}]
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
    <SectionHeader title="Click on the map you'd like to ban." timer={true} divider={false} classProp="mb-3" />
    <div class="flex gap-5">
        <div class="flex flex-col w-3/12 gap-1">
            {#each teamA as player}
                <div class="player">
                    <p><i class="fas fa-user mr-1 "></i>{player.user}</p>
                    <div class="flex flex-col ml-auto text-sm">
                        <p>ELO: 1302</p>
                        <p>K/D: 1.32</p>
                    </div>
                </div>
            {/each}
        </div>
        <div class="grid grid-cols-2 gap-1 w-6/12 maps__container">
            <Map mapName="de_dust2" mapImage="/images/maps/dust2.jpg" />
            <Map mapName="de_mirage" mapImage="/images/maps/mirage.jpg" />
            <Map mapName="de_inferno" mapImage="/images/maps/inferno.jpg" />
            <Map mapName="de_nuke" mapImage="/images/maps/nuke.jpg" />
            <Map mapName="de_overpass" mapImage="/images/maps/overpass.jpg" />
            <Map mapName="de_train" mapImage="/images/maps/train.jpg" />
            <Map mapName="de_vertigo" mapImage="/images/maps/vertigo.jpg" />
            <Map mapName="de_anubis" mapImage="/images/maps/anubis.jpg" />
            <Map mapName="de_ancient" mapImage="/images/maps/ancient.jpg" />
            <Map mapName="de_cache" mapImage="/images/maps/cache.jpg" />
            <Map mapName="de_tuscan" mapImage="/images/maps/tuscan.jpg" />
        </div>

        <div class="flex flex-col w-3/12 gap-1">
            {#each teamB as player}
                <div class="player">
                    <p><i class="fas fa-user mr-1 "></i>{player.user}</p>
                    <div class="flex flex-col ml-auto text-sm">
                        <p>ELO: 1302</p>
                        <p>K/D: 1.32</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
