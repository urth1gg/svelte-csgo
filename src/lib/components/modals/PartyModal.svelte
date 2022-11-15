<script lang="ts">
    import { userData } from '$lib/store/userData';
    import { modals } from '$lib/store/modals';
    import UserDisplay from '$lib/components/user/User.svelte';

    let friends: Friend[]  = [];

    userData.subscribe( value => {
        friends = value.friends as Friend[];
    })
</script>  

{#if $modals.showParty}

<div class="overlay">
        <div class="w-[300px] flex flex-col gap-2 modal-friends section2">
            {#each friends as friend}
                <UserDisplay user={friend.friend} clickEffect='INVITE_TO_PARTY' />
            {/each}
        </div>
</div>    
{/if}
