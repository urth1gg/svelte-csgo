<script lang="ts">
    import Party from "$lib/components/Party.svelte";

    export let lazy: boolean; 
    export let partyMembers: Partial<User>[] = [];

    let lazyClass = ""
    $:{
        lazyClass = lazy ? "lazyComponent" : "";
    }
</script>

<div class="section flex flex-col w-9/12 text-white p-3 {lazyClass} h-[450px]">
    {#if lazy}
        <div></div>
    {:else}
        <Party  />
    {/if}   
</div>    
