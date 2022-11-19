<script lang="ts">
    import { modals } from '$lib/store/modals';
    import { userData } from '$lib/store/userData';
    import UserDisplay from '$lib/components/user/User.svelte';
    import { Socket } from '../../../socket';
	import { onDestroy, onMount } from 'svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
    import { accessToken } from '$lib/store/accessToken';

    export let invitedBy: User = {} as User

    let num = 100

    let int: any = null; 
    let seconds: number = 20;

    onMount(() => {

        if (int) clearInterval(int);
        
        int = setInterval(() => {
            let dec = 100 / seconds;  
            num -= dec

            if(num <= 0){
                clearInterval(int)
                $modals.showPartyInvite = false
            }
        }, 1000)
    })

    onDestroy(() => {
        clearInterval(int)
    })

    function partyAccepted(){
        Socket.getInstance().emit('party_invite_accepted', { token: $accessToken, friend: invitedBy })
        $modals.showPartyInvite = false
    }


    Socket.getInstance().on('party_invite', (data: any) => {
        num = 100;
    });
</script>

{#if $modals.showPartyInvite}
    <div class="justify-center items-start overlay">
        <div class="modal party-invite flex flex-col w-[500px] text-white p-3 section2 mt-2">
            <SectionHeader title="Party Invite" />
            <div class='flex gap-4'>
                <UserDisplay user={invitedBy} clickEffect="PARTY_INVITE" />
                <button on:click={partyAccepted}>
                    <i class="fas fa-check"></i>
                </button>
                <button on:click={() => $modals.showPartyInvite = false}>
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="timerbar" style="width: {num}%"></div>
        </div>

    </div>
{/if}