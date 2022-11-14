<script lang="ts">
    export let user: User
</script>

<a data-sveltekit-reload class="flex items-center p-2 border-t border-gray-200 user" href="/profile/{user.username}">
    {#if user.profile_img}<img src={user.profile_img} class="w-8 h-8 rounded-full"/>
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