<script lang="ts">
    import UserDisplay from '$lib/components/user/User.svelte';

    let show: User[] = [];

    let inputValue: string = '';

    function onInput(e: Event) {
        let target = e.target as HTMLInputElement
        let value: any = target.value;
        inputValue = value;
        
        search(value)
    }

    let timeout: NodeJS.Timeout | null = null;

    function search(input: string){
        
        if(timeout){
            clearTimeout(timeout)
            timeout = null;
        }

        if(!input) {
            show = [];
            return;
        }
        timeout = setTimeout(async () => {
            let res = await fetch('/api/user?query=' + input)
            let {error, data} = await res.json()

            if(error){
                return;
            } 

            show = data
            if(timeout) clearTimeout(timeout)
            timeout = null;
        }, 150)
    }
</script>

<div class="relative accent-color-shade w-[300px]">
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
                <path d="M21 21l-6-6M18 10a8 8 0 11-12.73-5.73A8 8 0 0118 10z"></path>
            </svg>
        </button>
    </span>
    <input
        value={inputValue}
        on:input={onInput}
        type="search"
        name="q" 
        class="py-2 input text-sm text-white bg-whitex rounded-md pl-10 pr-2 focus:outline-none focus:accent-color-shade w-full" placeholder="Search players..." autocomplete="off">
    {#if inputValue }
        {#if show.length > 0}
            <div class="absolute top-10 left-0 w-full bg-[var(--section)] rounded-md shadow-lg z-10">
                {#each show as user}
                    <UserDisplay user={user}/>
                {/each}
            </div>
        {:else}
            {#if !timeout}
            <div class='absolute top-10 left-0 w-full bg-[var(--section)] rounded-md shadow-lg p-2'>
                <p class="text-white pl-1">No users found.</p>
            </div>
            {/if}
        {/if}
    {/if}
</div>