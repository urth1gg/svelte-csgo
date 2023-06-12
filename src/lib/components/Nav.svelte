<script lang="ts">
	import Searchable from "./inputs/Searchable.svelte";
    import { userData } from "$lib/store/userData";
    import { FriendRequestStatus } from "$lib/enums/enums";
    import { toggleFriends } from "$lib/store/modals";
    import { fetch_ } from "$utils/fetch/fetch_";
    import { PUBLIC_BASE_URL } from "$env/static/public";

    export let loggedIn: boolean;
    export let id: string;
    export let user: User;

    let friends: Friend[] = [];

    userData.subscribe((value) => {
        if(value && value.friends) {
            friends = value.friends.filter(x => {
                return x.status === FriendRequestStatus.ACCEPTED
            })
        }
    });

    async function logout(){
        await fetch_('/api/party', {cache: 'reload'});

        await fetch(`${PUBLIC_BASE_URL}/api/session`, {
            method: 'DELETE',
            credentials: 'include'
        })
        
        window.location.reload()
    }
</script>
<nav class="gradient-section">
    <div class="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="flex-1 flex items-center justify-center">
                <div class="flex-shrink-0 flex items-center">
                    {#if loggedIn }

                        <button class='mr-10 relative' title="Friends" on:click={toggleFriends}> 
                            <i class="text-xl fas fa-user-friends text-white"></i>
                            <span class="inline-block p-[0.5em] text-sm text-white absolute top-3 left-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                                {friends.filter(x => x.friend.flags?.[0].is_online).length || 0}
                            </span>

                        </button>

                    {/if}
                    <!-- <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
                    <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"> -->
                    <a href="/"><div class="flex items-center lg:hidden h-8 w-auto text-white text-bold">DUSTYDREAMS.GG</div></a>
                    <a href="/"><div class="hidden lg:flex lg:items-center h-8 w-auto text-white text-bold">DUSTYDREAMS.GG</div></a>
                </div>
                <div class="hidden sm:block sm:ml-3 w-full">
                    <div class="flex space w-full">
                        <Searchable />
                        {#if loggedIn}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <div class="flex justify-end items-center w-full gap-1">
                                <a data-sveltekit-reload href="/profile/{user.username}" class="text-white flex justify-center items-center 
                                hover:bg-gray-700 hover:text-white px-1 py-1 
                                rounded-md text-sm font-medium">{id} <i class="fas fa-user-circle ml-2 text-2xl text-white"></i></a>
                                <button on:click={logout} class="text-white hover:bg-gray-700 hover:text-white px-1 py-1 rounded-md text-sm font-medium">Logout</button>

                            </div>
                        {:else}
                            <div class="flex justify-end items-center w-full">
                                <a href="/login" class="text-white hover:bg-gray-700 hover:text-white px-1 py-1 rounded-md text-sm font-medium">Login</a>
                                <a href="/register" class="text-white hover:bg-gray-700 hover:text-white px-1 py-1 rounded-md text-sm font-medium">Register</a>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>