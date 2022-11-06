<script lang="ts">
    type Friend = {
        name: string,
    }
    let friends: Friend[] = [{name: 'test'}, {name: 'test'}, {name: 'test'}];
    import SectionHeader from "./SectionHeader.svelte"
</script>

<style>

button{
    border-radius: 10px;
    background: green;
    height:30px;
}

.red{
    background-color: red;
}
button:hover{
    filter: brightness(0.9)
}
</style>
<div class="section text-white w-[300px] p-3 max-h-[200px] overflow-y-auto ">
    <SectionHeader title="Friend requests" />
    {#if friends.length === 0}
        <div class="text-white">No new friend request.</div>
    {/if}

    <div class='grid grid-cols-2'>
        {#each friends as friend}
        <div class="flex flex-col">
            <div class="flex items-center p-3">
                <div class="w-3 h-3 bg-green-300 rounded-full mr-2"></div> 
                <p class="accent-color leading-none text-xl leading-5 mt-[-1px]">{friend.name}</p>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <button class="text-lg p-2 flex items-center">&#10003;</button>
            <button class="text-lg p-2 flex items-center red">&#10005;</button>
        </div>
        {/each}
    </div>
</div>

