<script lang="ts">

    import { fetch_ } from '../../utils/fetch/fetch_';
    import { page } from '$app/stores';
    export let mapName: MapName;
    export let mapImage: MapImage;


    let allowedToBan = false;
    function banMap(mapName: MapName) {
        fetch_(`/api/match/${$page.params.matchId}/maps`, {
            method: 'DELETE',
            body: JSON.stringify({
                mapName
            })
        })
    }

    let matchMaps = []; 

    async function getMaps() {
        if(matchMaps.length !== 0) return; 

        let data = await fetch_(`/api/match/${$page.params.matchId}/maps`, {
            method: 'GET',
        })
        let json = await data.json();
        matchMaps = json.data;
    }

    $:{
        (async function(){
            if(matchMaps.length !== 0) return;
            await getMaps();
        })();
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

    }
    .bla{
        background:var(--primary);
    }
    .map__container--unclickable{
        cursor: not-allowed;
        pointer-events: none;
    }
</style>
<button class="flex flex-row w-3/12 p-1 justify-between items-center map__container {!allowedToBan ? 'map__container--unclickable' : ''}" on:click={ () => banMap(mapName) }>
    <p class="">{mapName}</p>
    <img src={mapImage} alt={mapName} />
</button>