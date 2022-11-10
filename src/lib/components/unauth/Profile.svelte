<script lang="ts">
    import { browser } from '$app/environment';
    import SectionHeader from '$lib/components/SectionHeader.svelte';
    import LoadableImage from '../inputs/LoadableImage.svelte';
    import { afterUpdate } from 'svelte';
    import { accessToken } from '$lib/store/accessToken';
    export let user: User;
    export let userLoggedIn: Partial<User> | null;

    let stats: Stats | undefined;
    let winRate = 0;
    let kdRatio = 0;


    stats = user.stats?.[0];

    if(stats){
        winRate = stats.wins/stats.losses * 100;
        kdRatio = stats.kills/stats.deaths;
    }

    console.log('Profile')
    console.log(userLoggedIn)
</script>

<style>
    .info{
        line-height: 1.8rem;
        color: white;
    }
</style>
<div class="section w-full flex">
    <div class="w-2/12">
        <LoadableImage src={user.profile_img} username={user.username} {userLoggedIn} />
    </div>
    <div class="w-8/12 ml-auto mr-auto">
        <SectionHeader title="STATS" />
        <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">Username</h4>
                    <h4 class="text-base font-bold info">Email</h4>
                    <h4 class="text-base font-bold info">Joined</h4>
                </div>
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">{user.username}</h4>
                    <h4 class="text-base font-bold info">{user.email}</h4>
                    <h4 class="text-base font-bold info">{new Date(user.created_at).toLocaleDateString()}</h4>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">Wins</h4>
                    <h4 class="text-base font-bold info">Losses</h4>
                    <h4 class="text-base font-bold info">Win Rate</h4>
                </div>
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">{stats?.wins}</h4>
                    <h4 class="text-base font-bold info">{stats?.losses}</h4>
                    <h4 class="text-base font-bold info">{isNaN(winRate) ? '0%' : winRate + '%'}</h4>
                </div>
            </div>

            <div class="flex flex-row gap-2">
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">Kills</h4>
                    <h4 class="text-base font-bold info">Deaths</h4>
                    <h4 class="text-base font-bold info">K/D Ratio</h4>
                </div>
                <div class="w-1/2">
                    <h4 class="text-base font-bold info">{stats?.kills}</h4>
                    <h4 class="text-base font-bold info">{stats?.deaths}</h4>
                    <h4 class="text-base font-bold info">{isNaN(kdRatio) ? '0%' : kdRatio + '%'}</h4>
                </div>
            </div>
        </div>
    </div>
</div>