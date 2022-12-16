<script lang="ts">
    import SectionHeader from '$lib/components/SectionHeader.svelte';
    import { MatchEvents } from '$lib/socket_events/MatchEvents';

    let playersAccepted = 0;

    export let matchId: string; 

    MatchEvents.on("MATCH_ACCEPTED", (data: any) => {
        console.log("MATCH_ACCEPTED", data)
        playersAccepted = playersAccepted + 1;
    });


    function acceptMatch(){
        console.log('clicked on match_acc')
        MatchEvents.emit("MATCH_ACCEPTED", { match: { matchId } });
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
</style>

<div class="overlay justify-center items-start">
    <div class="w-[450px] flex flex-col modal section2 p-5 mt-1">
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

        <button class="btn btn-primary w-[120px] ml-auto mr-auto mt-3 p-1 rounded-lg" on:click={acceptMatch}>Accept</button>
    </div>
</div> 

