<script lang="ts">

    import { userData } from "$lib/store/userData";


    let partyMembers: Partial<User>[] = [
        { username: $userData.username, profile_img: ''}
    ];

    $: {
        while(partyMembers.length < 5){
            partyMembers.push({username: 'Player'});
        }
    }

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