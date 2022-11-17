<script lang="ts">
    export let user: User
    export let clickEffect: string = 'GO_TO_PROFILE';
    export let onClick = () => {};

    let hashMap = new Map();


</script>

{#if clickEffect === 'INVITE_TO_PARTY'}
    <button data-sveltekit-reload class="flex items-center p-2 user" on:click={onClick}>
        {#if user.profile_img}<img src={user.profile_img} alt={user.username} class="w-8 h-8 rounded-full"/>
        {:else}
            <div class="w-8 h-8 rounded-full bg-[var(--test-color)] flex justify-center items-center">
                <i class="fas fa-user text-sm text-white"></i>
            </div>
        {/if}
        <div class="ml-2 w-full justify-between flex items-center user-border">
            <div class="">
                <p class="text-sm font-bold">
                    {#if user.flags?.[0].is_online} 
                        <i class="fas fa-circle text-green-500 text-xs"></i>
                    {/if}
                    {user.username}
                    
                </p>
                <p class="text-xs text-white">ELO: {user.stats?.[0].elo}</p>

            </div>
            {#if hashMap.get(user.username)}<p class="text-white">Click to invite</p>{/if}
        </div>
    </button>
{:else if clickEffect === 'GO_TO_PROFILE'}
    <a data-sveltekit-reload class="flex items-center p-2 border-t border-gray-200 user-visit" href="/profile/{user.username}">
        {#if user.profile_img}<img src={user.profile_img} alt={user.username} class="w-8 h-8 rounded-full"/>
        {:else}
            <div class="w-8 h-8 rounded-full bg-[var(--test-color)] flex justify-center items-center">
                <i class="fas fa-user text-sm text-white"></i>
            </div>
        {/if}
        <div class="ml-2">
            <a data-sveltekit-reload href="/profile/{user.username}">
                <p class="text-sm font-bold">
                    {#if user.flags?.[0].is_online} 
                        <i class="fas fa-circle text-green-500 text-xs"></i>
                    {/if}
                    {user.username}
                </p>
            </a>
            <p class="text-xs text-white">ELO: {user.stats?.[0].elo}</p>
        </div>
    </a>
{:else if clickEffect === 'PARTY_INVITE'}
    <div data-sveltekit-reload class="flex items-center p-2 user-invite">
        {#if user.profile_img}<img src={user.profile_img} alt={user.username} class="w-8 h-8 rounded-full"/>
        {:else}
            <div class="w-8 h-8 rounded-full bg-[var(--test-color)] flex justify-center items-center">
                <i class="fas fa-user text-sm text-white"></i>
            </div>
        {/if}
        <div class="ml-2 w-full justify-between flex items-center user-border">
            <div class="">
                <p class="text-sm font-bold">
                    {#if user.flags?.[0].is_online} 
                        <i class="fas fa-circle text-green-500 text-xs"></i>
                    {/if}
                    {user.username}
                    
                </p>
                <p class="text-xs text-white">ELO: {user.stats?.[0].elo}</p>

            </div>
            {#if hashMap.get(user.username)}<p class="text-white">Accept</p>{/if}
        </div>
    </div>
{/if}