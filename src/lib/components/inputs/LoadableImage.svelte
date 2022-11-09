<script lang='ts'>
    export let src: string; 
</script>

<div class="w-[200px] aspect-square">

    {#if src}
        <img src={src} alt="profile-photo" class="object-cover" />
    {:else}
        <div class="bg-gray-200 w-full h-full"></div>
    {/if}
</div>