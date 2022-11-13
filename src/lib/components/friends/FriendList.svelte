<script lang="ts">
    export let friends: Friend[] = [];

    $:{
        //console.log(friends)
    }
</script>


{#if friends.length > 0}
    <div class="w-full flex flex-col gap-2">
        {#each friends as friend}
            <div class="w-full flex flex-row gap-2 items-center">
                <span class="text-white">
                    {friend.friend.username}
                </span>
            </div>
        {/each}
    </div>
{/if}

