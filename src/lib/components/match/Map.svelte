<script lang="ts">

    import { fetch_ } from '../../utils/fetch/fetch_';
    import { page } from '$app/stores';
    export let mapName: MapName;
    export let mapImage: MapImage;


    export let mapBanned = true;
    export let userVoted = false;
    function banMap(mapName: MapName) {

        if(mapBanned) return;
        if(userVoted) return;

        fetch_(`/api/match/${$page.params.matchId}/maps`, {
            method: 'DELETE',
            body: JSON.stringify({
                map_id: mapName
            })
        })
    }



</script>

<style>
    img{
        width:50px;
        height:50px;
        object-fit:cover;
    }
    *{
        color:white;
    }

    .map__container{
        width: 100%;
        margin:0 auto;
        background:var(--section);
        padding-right:0 !important;
        @apply flex justify-between pl-3;
        background:#232323;


    }
    .bla{
        background:var(--primary);
    }
    .map__container--banned{
        cursor: not-allowed;
        filter:brightness(0.5);
    }

    .map__container--already-voted{
        cursor: not-allowed !important;
    }
</style>
<button class="{userVoted ? 'map__container--already-voted' : ''} flex flex-row w-3/12 p-1 justify-between items-center map__container {mapBanned ? 'map__container--banned' : ''}" on:click={ () => banMap(mapName) }>
    <p class="">{mapName}</p>
    <img src={mapImage} alt={mapName} />
</button>