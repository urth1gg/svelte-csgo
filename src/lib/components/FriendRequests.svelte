<script lang="ts">
    import SectionHeader from "./SectionHeader.svelte"
    import { beforeUpdate } from "svelte"
    import { fetch_ } from "../../utils/fetch/fetch_"
    import { FriendRequestStatus } from "$lib/enums/enums"
    import { setMessage } from "$lib/store/pushMessage"
	import LoadableImage from "./inputs/LoadableImage.svelte";

    let friends: User[] = [];

    let loaded = false; 

    async function getFriends(){
        let res = await fetch_("/api/friends");
        let json = await res.json();
        if(json.success){
            friends = json.data.pending;
        }

        console.log(friends)
    }
    
    beforeUpdate( () => {
        if(!lazy && !loaded) {
            if ( friends.length === 0) {
                getFriends();
            }
            loaded = true;
        }
    })

    export let lazy: boolean; 

    let lazyClass = ""
    $:{
        lazyClass = lazy ? "lazyComponent" : "";
    }

    async function onAcceptRequest(profile: Partial<User>){
        let res = await fetch_('/api/friends', {
            method: 'PATCH',
            body: JSON.stringify({
                friend: profile,
                status: FriendRequestStatus.ACCEPTED,
            })
        })

        let json = await res.json();
        if(json.success){

            setMessage({
                message: `You are now friends with ${profile.username}`,
                type: "success"
            })

            getFriends()
        }
    }

    async function onCancelRequest(profile: Partial<User>){
        let res = await fetch_('/api/friends', {
            method: 'DELETE',
            body: JSON.stringify({
                friend: profile,
            })
        })

        let json = await res.json();
        if(json.success){
            getFriends();
            setMessage({
                message: "Friend request cancelled",
                type: "success"
            })
        }
    }
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
<div class="section text-white w-[300px] p-3 max-h-[200px] overflow-y-auto {lazyClass}">
    {#if lazy}
        <div></div>
    {:else}
        <SectionHeader title="Friend requests" />
        {#if friends.length === 0}
            <div class="text-white">No new friend requests.</div>
        {/if}

        <div class='grid grid-cols-2'>
            {#each friends as friend}
            <div class="flex flex-col">
                <div class="flex items-center p-3">
                    <span>
                        <i class="fa fa-user mr-2"/>
                    </span> 
                    <p class="accent-color leading-none text-xl leading-5 mt-[-1px]">{friend.username}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button class="text-lg p-2 flex items-center" on:click={() => onAcceptRequest(friend)}>&#10003;</button>
                <button class="text-lg p-2 flex items-center red" on:click={() => onCancelRequest(friend)}>&#10005;</button>
            </div>
            {/each}
        </div>
    {/if}
</div>

