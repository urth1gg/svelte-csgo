<script lang='ts'>
	import { FriendRequestStatus } from "$lib/enums/enums";
	import FriendRequests from "../FriendRequests.svelte";
    import { fetch_ } from "../../../utils/fetch/fetch_"
	import ActionButton from "../unauth/profile/ActionButton.svelte";

    export let src: string; 
    export let username: string;
    export let userLoggedIn: Partial<User> | null;
    export let isFriend: Partial<Friend> | null;
    export let profile: User | null;

</script>

<style>
    .no-img{
        background-color: var(--test-color);
        width: 100%;
        height: 100%;
        border:1px solid white;
        @apply rounded-full;
    }
    
    i{
        @apply text-9xl;
        color: var(--blue-shade);
    }

    i.fa-check{
        @apply text-base;
        color: var(--white);
    }
</style>
<div class="w-[200px] aspect-square p-1">

    {#if src}
        <img src={src} alt={profile?.username} class="object-cover" />
    {:else}
        <div class="no-img w-full h-full place-items-center grid">
            <i class="fa-solid fa-user-secret"></i>
        </div>
    {/if}
    {#if username}
        <h4 class="text-base mt-2 text-center text-[#fff] font-bold">{username}</h4>
    {/if}

    <ActionButton userLoggedIn={userLoggedIn} profile={profile} isFriend={isFriend} />
</div>
