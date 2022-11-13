<script lang="ts">
    import { userData } from '$lib/store/userData';
    import Party from "$lib/components/Party.svelte";
	import SectionHeader from './SectionHeader.svelte';

    export let lazy: boolean; 

    let lazyClass = ""
    $:{
        lazyClass = lazy ? "lazyComponent" : "";
    }
</script>

<div class="section flex flex-col w-9/12 text-white p-3 {lazyClass} h-[450px]">
    {#if lazy}
        <div></div>
    {:else}
        <!-- <SectionHeader title="Party" /> -->
        <Party />
    {/if}
</div>    
