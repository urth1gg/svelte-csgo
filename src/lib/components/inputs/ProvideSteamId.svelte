<script lang="ts">
    import { fetch_ } from "$utils/fetch/fetch_";
    import { accessToken } from "$lib/store/accessToken";

    let error: string = "";

    let steam_id = ''
    async function onSubmit(e: Event) {
        e.preventDefault()

        let res = await fetch_('/api/user', {
            method: 'PATCH',
            body: JSON.stringify({
                steam_id
            })
        })

        let json = await res.json()

        if (json.error) {
            error = json.error
        } else {
            let r = await fetch_('/api/token', {
                method: 'PUT'
            })
            let json = await r.json()
            accessToken.set(json.accessToken)

            let t = JSON.parse(atob(json.accessToken.split('.')[1]))
            document.cookie = `user=${JSON.stringify(t)}; path=/; max-age=${t.exp - t.iat};`
            
            window?.location.reload()
        }
    }


</script>

<style>
    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 99;
    }
</style>

<div class='overlay'>
    <div class="justify-center items-center flex flex-col h-screen section w-full">
        <form on:submit={onSubmit} autocomplete="off">
            <label for="steam_id" class='text-white font-bold'>Please set your CS:GO Steam ID to proceed</label><br/><br/>
            <input type="text" id="steam_id" name="steam_id_new" bind:value={steam_id} placeholder="Steam ID"/>
            <button class="btn btn-primary p-2" type="submit">Submit</button>
            {#if error}
            <div class="errors mt-1">
                <p class="input-error">{error}</p>
            </div>
            {/if}
        </form>
    </div>
</div>
