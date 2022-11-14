<script lang="ts">
    import { userData } from '$lib/store/userData';
    import { onlyAcceptedFriends } from '$utils/filters/filters';
    import { modals } from '$lib/store/modals';

    let friends: Friend[] = [];

    userData.subscribe( value => {
        if(value && value.friends) {
            friends = onlyAcceptedFriends(value.friends);
        }
    })

</script>


{#if friends.length > 0 && $modals.showFriends}
    <div class="w-full flex flex-col gap-2 modal-friends">
        {#each friends as friend}
            <div class="w-full flex flex-row gap-2 items-center">
                <span class="text-white">
                    {friend.friend.username}
                </span>
            </div>
        {/each}
    </div>
{/if}

