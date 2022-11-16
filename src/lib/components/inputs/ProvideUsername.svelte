<script lang="ts">
    import { fetch_ } from "$utils/fetch/fetch_";
    import { accessToken } from "$lib/store/accessToken";

    let error: string = "";

    let username = ''
    async function onSubmit(e: SubmitEvent) {
        e.preventDefault()

        let res = await fetch_('/api/user', {
            method: 'PATCH',
            body: JSON.stringify({
                username
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
        z-index: 100;
    }
</style>

<div class='overlay'>
    <div class="justify-center items-center flex flex-col h-screen section w-full">
        <form on:submit={onSubmit} autocomplete="off">
            <label for="username" class='text-white font-bold'>Please set username to proceed</label><br/><br/>
            <input type="text" id="username" name="username_new" bind:value={username} placeholder="Username"/>
            <button class="btn btn-primary p-2" type="submit">Submit</button>
            {#if error}
            <div class="errors mt-1">
                <p class="input-error">{error}</p>
            </div>
            {/if}
        </form>
    </div>
</div>
