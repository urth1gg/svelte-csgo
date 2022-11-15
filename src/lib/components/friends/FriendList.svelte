<script lang="ts">
    import { userData } from '$lib/store/userData';
    import { onlyAcceptedFriends } from '$utils/filters/filters';
    import { modals } from '$lib/store/modals';
    import UserDisplay from '$lib/components/user/User.svelte';

    let friends: Friend[] = [];

    userData.subscribe( value => {
        if(value && value.friends) {
            friends = onlyAcceptedFriends(value.friends);
        }
    })

    let show: boolean | undefined = false;

    modals.subscribe( value => {
        show = value.showFriends;
    })

    let widthClass: string = 'w-0';
    $:{
        if(show) {
            widthClass = 'w-[300px]';
        } else {
            widthClass = 'hide-me';
        }
    }
</script>


<div class="{widthClass} flex flex-col gap-2 modal-friends section2">
    {#each friends as friend}
        <UserDisplay user={friend.friend} />
    {/each}
</div>

