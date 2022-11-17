<script lang="ts">
    import { modals } from '$lib/store/modals';
    import { userData } from '$lib/store/userData';
    import UserDisplay from '$lib/components/user/User.svelte';
    import { Socket } from '../../../socket';


    let invitedBy: User = {} as User;

    Socket.getInstance().on('party_invite', (data: any) => {
        invitedBy = data.friend;
        modals.update( n => {
            return {
                ...n,
                showPartyInvite: true,
            }
        })
    })  

</script>

{#if $modals.showPartyInvite}
    <div class="justify-center items-start overlay">
        <div class="modal party-invite flex flex-col w-[500px] text-white p-3">
            <div class='flex gap-4 section4'>
                <UserDisplay user={invitedBy} clickEffect="PARTY_INVITE" />
                <button on:click={() => $modals.showPartyInvite = false}>Accept</button>
                <button on:click={() => $modals.showPartyInvite = false}>Decline</button>
            </div>
        </div>


    </div>
{/if}