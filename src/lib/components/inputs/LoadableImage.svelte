<script lang='ts'>
	import { FriendRequestStatus } from "$lib/enums/enums";
	import FriendRequests from "../FriendRequests.svelte";
    import { fetch_ } from "../../../utils/fetch/fetch_"
	import ActionButton from "../unauth/profile/ActionButton.svelte";

    export let src: string; 
    export let username: string;
    export let userLoggedIn: Partial<User> | null;
    export let isFriend: Partial<Friend> | null = null;
    export let profile: User | null = null;

    export let style: string | undefined = undefined;

</script>

<style>
    .no-img{
        background-color: var(--section);
        width: 100%;
        height: 100%;
        border:1px solid white;
        @apply rounded-full;
    }
    
    i{
        @apply text-9xl;
        color: var(--yellow);
    }

    i.fa-check{
        @apply text-base;
        color: var(--yellow);
    }
</style>
<div class="w-[200px] aspect-square p-1 {style}">

    {#if src}
        <img src={src} alt={profile?.username} class="object-cover" />
    {:else}
        <button class="cool-input input-image no-img w-full h-full place-items-center grid">
            <i class="fa-solid fa-user-secret"></i>
        </button>
    {/if}
    {#if username}
        <h4 class="text-base mt-2 text-center text-[#fff] font-bold">{username}</h4>
    {/if}

    <ActionButton userLoggedIn={userLoggedIn} profile={profile} isFriend={isFriend} />
</div>
