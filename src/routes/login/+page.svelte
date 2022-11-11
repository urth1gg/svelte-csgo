<script lang="ts">
    import { browser } from '$app/environment';

    let emailErrors: string[] = [];
    let passwordErrors: string[] = [];
    let email = '';
    let password = '';
    let errorClassEmail = '';

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
    async function tryToLogin(){
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
        return res.json();
    }
    async function onSubmit(e: Event){
        e.preventDefault();

        emailErrors = []
        passwordErrors = []

        let emailErrored = checkEmailErrors(email);

        if(!emailErrored){
            return;
        }

        try{

            let data = await tryToLogin();
            
            if(serverErrorHappened(data)) return;

            redirect('/');
        }catch(e){
            passwordErrors = ["Something went wrong, please try again later"]
            return;
        }
    }

</script>

<div class="flex justify-center items-center bg-custom h-screen section">
    <div class="w-1/3 max-sm:w-2/3">
        <h1 class="text-3xl font-bold text-center text-white">Login</h1>
        <form class="mt-4" on:submit={onSubmit}>
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input bind:value={email} autofocus={true} class="{errorClassEmail} shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email">
                {#each emailErrors as error}
                    <p class="italic input-error">{error}</p>
                {/each}
            </div>
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input bind:value={password} autocomplete="current-password" class="bla shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
                {#each passwordErrors as error}
                    <p class="italic input-error">{error}</p>
                {/each}
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
            </div>
        </form>
    </div>
</div>