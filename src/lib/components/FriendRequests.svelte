<script lang="ts">
    import SectionHeader from "./SectionHeader.svelte"
    import { beforeUpdate } from "svelte"
    import { fetch_ } from "../../utils/fetch/fetch_"
    import { FriendRequestStatus } from "$lib/enums/enums"
    import { setMessage } from "$lib/store/pushMessage"


    export let lazy: boolean;
    export let friends: Friend[] = [];
    export let invalidate: () => void;
    
    let loaded = false; 

    let lazyClass = ""

    $:{
        lazyClass = (lazy || !friends) ? "lazyComponent" : "";
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

            invalidate()
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
            invalidate();
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
<div class="section2 text-white w-3/12 p-3 max-h-[200px] overflow-y-auto {lazyClass}">
    {#if lazy}
        <div></div>
    {:else}
        {#if friends.length === 0}
            <div class="text-white p-2">No new friend requests.</div>
        {/if}

        <div class='grid grid-cols-2'>
            {#each friends as friend}
            <div class="flex flex-col">
                <div class="flex items-center p-3">
                    <span>
                        <i class="fa fa-user mr-2"/>
                    </span> 
                    <p class="accent-color leading-none text-xl leading-5 mt-[-1px]">
                        <a data-sveltekit-reload href="/profile/{friend.friend.username}">{friend.friend.username}</a>
                    </p>
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

