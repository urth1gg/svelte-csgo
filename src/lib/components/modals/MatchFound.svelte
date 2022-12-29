<script lang="ts">
    import SectionHeader from '$lib/components/SectionHeader.svelte';
    import { MatchEvents } from '$lib/socket_events/MatchEvents';
    import Timer from '$lib/components/Timer.svelte';
    import { modals } from '$lib/store/modals';
    import { accessToken } from '$lib/store/accessToken';
    import { onMount } from 'svelte';
	import { fetch_ } from '$utils/fetch/fetch_';

    let playersAccepted = 0;    

    export let matchId: string; 

    MatchEvents.on("MATCH_ACCEPTED", (data: any) => {
        playersAccepted = playersAccepted + 1;
    });


    onMount( async () => {
        let res = await fetch_(`/api/queue/${matchId}`)
        let data = await res.json();

        playersAccepted = data.playersAccepted;
    });

    let matchAccepted = false;
    function acceptMatch(){
        MatchEvents.emit("MATCH_ACCEPTED", { match: { matchId }, token: $accessToken });
        matchAccepted = true 
    }
</script>

<style>
    .accept__box{
        background-color: var(--blue);
        width:30px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;
        text-shadow: black 0.1em 0em 0.2em;
        filter:brightness(0.8);
        @apply rounded-lg;
    }

    .accept__box--accepted{
        filter:brightness(1)
    }

    .p0{
        padding-bottom: 0!important;
    }
</style>

<div class="overlay justify-start items-center flex-col">
    <div class="w-[450px]">
        <div class="w-full flex flex-col modal section2 p-5 mt-1">
            <SectionHeader title="Match Found" />
    
            <div class="flex w-full justify-between p-2">
                {#each {length: 10} as _, i}
                    {#if i < playersAccepted}
                        <div class="accept__box accept__box--accepted">&#10003;</div>
                    {:else}
                        <div class="accept__box"></div>
                    {/if}
                {/each}
            </div>
    
            <button disabled={matchAccepted} class="btn btn-primary w-[120px] ml-auto mr-auto mt-3 p-1 rounded-lg" on:click={!matchAccepted ? acceptMatch : f => f}>
                {#if matchAccepted}
                    <i class="fas fa-check"></i>
                {:else}
                    Accept
                {/if}
            </button>
        </div>
    
        <div class="w-full">
            <Timer seconds={5} callback={ () => {
                $modals.showMatchFound = false;
                localStorage.removeItem("MATCH_FOUND");
                MatchEvents.emit("MATCH_DECLINED", { match: { matchId }, token: $accessToken });
            }}/>
        </div>
    </div>
</div> 

