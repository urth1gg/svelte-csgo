<script lang="ts">
    import { browser } from '$app/environment';
	import { PUBLIC_BASE_URL } from '$env/static/public';
    import { onMount } from 'svelte';

    let emailErrors: string[] = [];
    let passwordErrors: string[] = [];
    let email = '';
    let password = '';
    let errorClassEmail = '';


    let emailInput: HTMLInputElement | null = null;
    let passwordInput: HTMLInputElement | null = null;

    onMount(() => {
        if (browser) emailInput?.focus();

    });

    $: {
        errorClassEmail = emailErrors.length > 0 ? 'border-red-500' : '';
    }


    function checkEmailErrors(email: string){
        emailErrors = [];
        if(!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
            emailErrors = [...emailErrors, 'Email is not valid'];
        }

        return emailErrors.length === 0
    }

    function redirect(path: string){
        window.location.href = path;
    }

    // Implement type for data response 
    function serverErrorHappened(data: any): boolean{
        if(data?.error === 'Invalid form values.'){
                emailErrors = data.fields.map((x: FormErrorField ) => {
                    if(x.name === 'email'){
                        return x.message
                    }
                }).filter((x: FormErrorField) => x !== undefined);
                passwordErrors = data.fields.map((x: FormErrorField ) => {
                    if(x.name === 'password'){
                        return x.message
                    }
                }).filter((x: FormErrorField) => x !== undefined);
        }

        return emailErrors.length !== 0 || passwordErrors.length !== 0;
    }
    async function tryToLogin(email: string, password: string){
        let res = await fetch('/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            })

        let data = await res.json();

        return data;
    }

    async function onSubmit(e: Event){
        e.preventDefault();

        emailErrors = []
        passwordErrors = []

        let email = emailInput?.value as string;
        let password = passwordInput?.value as string;
        
        let emailErrored = checkEmailErrors(email);

        if(!emailErrored){
            return;
        }

        try{

            let data = await tryToLogin(email, password);
            
            if(serverErrorHappened(data)) return;

            if(data.accessToken){

                let headers = new Headers();
                headers.append('Authorization', `Bearer ${data.accessToken}`)
                headers.append('Content-Type', 'application/json')

                await fetch(`${PUBLIC_BASE_URL}/api/party`, {
                    cache:'reload',
                    headers: headers,
                    credentials: 'include',
                })
            }
            redirect('/');
        }catch(e){
            passwordErrors = ["Something went wrong, please try again later"]
            return;
        }
    }

</script>

<style>
    .input-field {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid white;
        outline: none;
        color: white;
        width: 100%;
    }
    .input-field:focus {
        border-bottom: 1px solid #64ffda;
    }

</style>
<div class="flex justify-center items-center bg-custom h-screen section w-full">
    <div class="w-1/3 max-sm:w-2/3 p-5 bg-gray">
        <h1 class="text-3xl font-bold text-center text-white">Login</h1>
        <div class="divider"></div>
        <form class="mt-4" on:submit={onSubmit} autocomplete="on">
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input 
                    bind:this={emailInput}
                    autocomplete="email"
                    class="{errorClassEmail} shadow appearance-none w-full py-2 px-3 text-white leading-tight input-field" id="email" type="text" placeholder="Email">
                {#each emailErrors as error}
                    <p class="italic input-error">{error}</p>
                {/each}
            </div>
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input bind:this={passwordInput}
                    autocomplete="current-password" class="shadow appearance-none w-full py-2 px-3 text-gray-700 mb-3 leading-tight input-field" id="password" type="password" placeholder="******************">
                {#each passwordErrors as error}
                    <p class="italic input-error">{error}</p>
                {/each}
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="w-full mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                    Login
                </button>
            </div>
        </form>
        <div class="text-center text-white">
            <a href="/register">Don't have an account? Register here</a>
        </div>
    </div>
</div>