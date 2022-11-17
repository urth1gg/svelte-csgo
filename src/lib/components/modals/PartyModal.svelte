<script lang="ts">
    import { userData } from '$lib/store/userData';
    import { modals } from '$lib/store/modals';
    import UserDisplay from '$lib/components/user/User.svelte';
	import { FriendRequestStatus } from '$lib/enums/enums';
    import { onlyAcceptedFriends, onlyActiveFriends  } from '$utils/filters/filters';
    import { fetch_ } from '$utils/fetch/fetch_';
    import { Socket } from '../../../socket';
    import { accessToken } from '$lib/store/accessToken';   
    let friends: Friend[]  = [];

    
    // populate friends with fake data 
    for(let i = 0; i < 10; i++){
        // friends.push({
        //     id: i.toString(),
        //     user:{
        //         id: i.toString(),
        //         username: 'test',
        //         profile_img: '',
        //         created_at: '',
        //         email: '',
        //         isFriend: null,
        //         stats: [{
        //             elo: 1000,
        //             wins: 0,
        //             losses: 0,
        //             games_played: 0,
        //             user_id: i.toString(),
        //             kills: 0,
        //             deaths: 0,
        //             created_at: '',
        //         }],
        //     },
        //     friend: {
        //         friend_id: i.toString(),
        //         created_at: '',
        //         status: FriendRequestStatus.ACCEPTED,
        //     }
        // })
    }


    userData.subscribe( value => {
        friends = value.friends?.filter(onlyAcceptedFriends).filter(onlyActiveFriends) as Friend[];
    })

    

    function onClick(friendId: string) {
        // let r = await fetch_("/api/party", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         friendId
        //     })
        // })

        //let data = await r.json();

        Socket.getInstance().emit('party_invite', { token: $accessToken, friendId });

        console.log('yep clicked')
    }
</script>  

{#if $modals.showParty}

<div class="overlay">
        <div class="w-[300px] flex flex-col modal modal-friends section2">
            {#each friends as friend}
                <UserDisplay user={friend.friend} clickEffect='INVITE_TO_PARTY' onClick={() => onClick(friend.friend_id)}/>
            {/each}
        </div>
</div>    
{/if}
