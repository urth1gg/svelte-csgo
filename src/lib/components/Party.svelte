<script lang="ts">

    import { setFriends, userData } from "$lib/store/userData";
    import { modals } from "$lib/store/modals";
    import { Socket } from "../../socket";
	import { fetch_ } from "$utils/fetch/fetch_";
    import { onMount } from "svelte";
    let partyMembers: Partial<User>[] = [];


    onMount(async () => {
        const res = await fetch_('/api/party', {
            cache: 'force-cache'
        });
        const data = await res.json();
        if(data.data) {
            partyMembers = data.data;
        }else{
            partyMembers[0] = {username: $userData.username, profile_img: $userData.profile_img};
        }
    
        while(partyMembers.length < 5){
            partyMembers.push({username: ''});
        }

        partyMembers = partyMembers.slice(0, 5);
    })

    let inQueue = false;
    let dateString = '00:00';
    let interval: NodeJS.Timeout;

    function onQueueClick(){
        clearInterval(interval);

        inQueue = !inQueue;
        dateString = '00:00';

        if(!inQueue) return; 

        let date = new Date().getTime(); 

        interval = setInterval(() => {
            let elapsed = new Date().getTime() - date;
            let date_ = new Date(elapsed);
            dateString = date_.toISOString().substr(14, 5);
        }, 1000)
    }

    function partyButtonHandler(){
        modals.update( value => {
            value.showParty = !value.showParty;
            return value;
        })
    }

    async function removeFromParty(username: string | undefined){
        if(!username) return;

        console.log('run')
        let res = await fetch_('/api/party', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username
            })
        })
    }

    Socket.getInstance().on("REFRESH_PARTY", async (data: any) => {


        fetch_('/api/party', {cache: 'reload'});
        
        partyMembers = data.partyMembers;

        while(partyMembers.length < 5){
            partyMembers.push({username: ''});
        }

        if(!data.partyMembers.find( (member: any) => member.username === $userData.username)){
            partyMembers = [{username: $userData.username, profile_img: $userData.profile_img}];

            while(partyMembers.length < 5){
                partyMembers.push({username: ''});
            }
        }

        partyMembers = partyMembers.slice(0, 5);
        setFriends();

    });
</script>

<style>
    .btn{
        background: #00ff77;
        @apply p-3 rounded-lg font-bold text-sm;
        width: 120px;
        margin:0 auto;
        margin-top:2rem;
        text-shadow: black 0px 0px 4px;
    }

    .btn:hover{
        filter: brightness(0.9)
    }

    i{
        color: var(--blue-shade)
    }

</style>
<div class="flex flex-col justify-center h-full">
    <!-- display 5 user icons in one row-->

    <div class="container__">
        <div class="w-11/12 flex gap-3 justify-center items-center ml-auto mr-auto">
            {#each partyMembers as player, index}
                
                <div class="w-full aspect-square text-3xl w-full max-w-[230px]">
                    <h4 class="text-base text-center mb-4 text-[#fff] font-bold text-2xl">{player.username || "Player " + (index+1)}</h4>
                    {#if player.username === $userData.username}
                    <button class="pointer-events-none cool-input w-full aspect-square 
                        rounded-[20px] border-2 flex justify-center 
                        items-center flex-col">
                        <i class="fa-sharp fa-solid fa-headset text-8xl"></i>
                        <i class="fa-sharp fa-solid fa-plus text-xl mt-5"></i>
                    </button>
                    {:else if player.username !== ''}
                        <button class="cool-input w-full aspect-square  
                            rounded-[20px] border-2 flex justify-center 
                            items-center flex-col" on:click={() => removeFromParty(player.username)}>
                            <i class="fa-sharp fa-solid fa-headset text-8xl"></i>
                            <i class="fa-sharp fa-solid fa-plus text-xl mt-5"></i>
                        </button>
                    {:else}
                    <button class="cool-input w-full aspect-square  
                        rounded-[20px] border-2 flex justify-center 
                        items-center flex-col" on:click={partyButtonHandler}>
                        <i class="fa-sharp fa-solid fa-headset text-8xl"></i>
                        <i class="fa-sharp fa-solid fa-plus text-xl mt-5"></i>
                    </button>
                    {/if}
                </div>
            {/each}
        </div>
    </div>


    <button class="btn" on:click={onQueueClick}>{!inQueue ? 'Queue up' : dateString}</button>
</div>