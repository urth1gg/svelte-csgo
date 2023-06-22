<script lang="ts">
    import { browser } from '$app/environment';
    import SectionHeader from '$lib/components/SectionHeader.svelte';
    import LoadableImage from '../inputs/LoadableImage.svelte';
    import Graph from '../graphs/Graph.svelte';

    export let user: User = {} as User;
    export let userLoggedIn: User | null = null;

    let stats: Stats | undefined;
    let winRate = 0;
    let kdRatio = 0;

    let dataPoints = {
      labels: ['', '', '', '', ''],
      datasets: [
        {
          label: 'User ELO',
          data: [300, 500, 650, 800, 950],  // ELO ratings
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: true,
        }
      ]
    };

    let dataPoints2 = {
      labels: ['', '', '', '', ''],
      datasets: [
        {
          label: 'Kills per match',
          data: [19, 18, 22, 21, 23],  // ELO ratings
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: true,
        }
      ]
    };

    if(user){
        stats = user.stats;

        if(stats){
            winRate = stats.wins/stats.losses * 100;
            kdRatio = stats.kills/stats.deaths;
        }

        user.isFriend = {
            status: user?.friends?.find((x: Partial<Friend>) => x.friend_id === userLoggedIn?.id)?.status,
        }

    }

</script>

<style>
    .info{
        line-height: 1.8em !important;
        color: white;
        @apply text-sm;
    }
</style>
<div class="flex w-3/12 flex-col gap-2 mr-5">
    <div class="stats-box flex flex-col w-[300px] h-[150px]">
        <h4>ELO</h4>
        <h4>{stats?.elo}</h4>
    </div>

    <div class="stats-box flex flex-col w-[300px] h-[150px]">
        <h4>K/D</h4>
        <h4 class="text-base font-bold info">{isNaN(kdRatio) ? '0' : kdRatio }</h4>
    </div>

    <div class="stats-box flex flex-col w-[300px] h-[150px]">
        <h4>Win Rate</h4>
        <h4 class="text-base font-bold info">{isNaN(winRate) ? '0' : winRate }%</h4>
    </div>
</div>
<div class="w-full flex">
    <div class="w-auto profile">
        <LoadableImage 
            src={user.profile_img} 
            username={user.username} 
            userLoggedIn={userLoggedIn} 
            isFriend={user.isFriend} 
            profile={user}
        />
    </div>
    <div class="w-full ml-5">
        <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">Username</h4>
                    <h4 class="text-base font-bold info">Email</h4>
                    <h4 class="text-base font-bold info">Joined</h4>
                </div>
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">{user.username}</h4>
                    <h4 class="text-base font-bold info">
                        {#if userLoggedIn?.id === user.id}
                            {user.email}
                        {:else}
                            Hidden
                        {/if}
                    </h4>
                    <h4 class="text-base font-bold info">{new Date(user.created_at).toLocaleDateString()}</h4>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">Wins</h4>
                    <h4 class="text-base font-bold info">Losses</h4>
                </div>
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">{stats?.wins}</h4>
                    <h4 class="text-base font-bold info">{stats?.losses}</h4>
                </div>
            </div>

            <div class="flex flex-row gap-2">
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">Kills</h4>
                    <h4 class="text-base font-bold info">Deaths</h4>
                </div>
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">{stats?.kills}</h4>
                    <h4 class="text-base font-bold info">{stats?.deaths}</h4>
                </div>
            </div>
        </div>
        <div class="flex w-full h-[300px]" style="margin-left:-100px">
            <Graph dataPoints={dataPoints} />
            <Graph dataPoints={dataPoints2} />
        </div>

    </div>

</div>
