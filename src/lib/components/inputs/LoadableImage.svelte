<script lang='ts'>
    export let src: string; 
    export let username: string;
    export let userLoggedIn: Partial<User> | null;
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
</style>
<div class="w-[200px] aspect-square p-1">

    {#if src}
        <img src={src} alt="profile-photo" class="object-cover" />
    {:else}
        <div class="no-img w-full h-full place-items-center grid">
            <i class="fa-solid fa-user-secret"></i>
        </div>
    {/if}
    {#if username}
        <h4 class="text-base mt-2 text-center text-[#fff] font-bold">{username}</h4>
    {/if}
    <div class="flex justify-center items-center mt-5">
        <button class="btn rounded-lg">Add friend</button>
    </div>
</div>