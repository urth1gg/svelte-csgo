<script lang="ts">

    import { beforeUpdate, onMount } from 'svelte';
    import { fetch_ } from '../../utils/fetch/fetch_';
    import { accessToken } from '$lib/store/accessToken';


    let partyMembers: User[] = [];

    $: {
        while(partyMembers.length < 5){
            partyMembers.push({username: '', email: 'X', id: 'X', profile_img: '', created_at: ''});
        }
    }
    //let res = fetch_('/api/party')


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
</script>

<style>
    .btn{
        background: #1DB954;
        @apply p-4 rounded-lg font-bold text-sm transition duration-300 ease-in-out;
        width: 120px;
        margin:0 auto;
        margin-top:2rem;
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

    <div class="w-11/12 flex gap-3 justify-center items-center ml-auto mr-auto">
        {#each partyMembers as player, index}
            
            <div class="w-full aspect-square text-3xl w-full">
                <h4 class="text-base text-center mb-4 text-[#fff] font-bold text-2xl">{player.username || "Player " + (index+1)}</h4>
                <button class="w-full aspect-square text-3xl rounded-[20px] border-2 flex justify-center items-center flex-col">
                    <i class="fa-sharp fa-solid fa-headset text-8xl"></i>
                    <i class="fa-sharp fa-solid fa-plus text-xl mt-5"></i>
                </button>
            </div>
        {/each}
    </div>

    <button class="btn" on:click={onQueueClick}>{!inQueue ? 'Queue up' : dateString}</button>
</div>