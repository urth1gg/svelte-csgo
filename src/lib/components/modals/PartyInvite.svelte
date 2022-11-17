<script lang="ts">
    import { modals } from '$lib/store/modals';
    import { userData } from '$lib/store/userData';
    import UserDisplay from '$lib/components/user/User.svelte';
    import { Socket } from '../../../socket';


    Socket.getInstance().on('party_invite', (data: any) => {
        console.log(data);
    })  
</script>

{#if $modals.showPartyInvite}
    <div class="overlay justify-start items-start">
        <div class="modal party-invite flex flex-col w-[300px] section2 text-white p-3">

            <h1>Party Invite</h1>

            <div class='flex gap-4'>
                <p>Test</p>
                <button on:click={() => $modals.showPartyInvite = false}>Accept</button>
                <button on:click={() => $modals.showPartyInvite = false}>Decline</button>
            </div>
        </div>


    </div>
{/if}