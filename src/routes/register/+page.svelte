<script lang="ts">
    let passwordErrors: string[] = [];
    let emailErrors: string[] = [];

    let email = '';
    let password = '';
    let errorClassPassword = '';
    let errorClassEmail = '';

    let success = false;
    let error = false; 

    let scaleClass = 'scale-0';
    let errorClass = 'scale-0';

    $: {
        success ? scaleClass = 'scale-1' : scaleClass = 'scale-0';
        error ? errorClass = 'scale-1' : errorClass = 'scale-0';
        errorClassPassword = passwordErrors.length > 0 ? 'border-red-500' : '';
        errorClassEmail = emailErrors.length > 0 ? 'border-red-500' : '';
    }

    function checkPasswordErrors(password: string){
        passwordErrors = [];
        if(password.length < 8){
            passwordErrors = [...passwordErrors, 'Password must be at least 8 characters long'];
        }
        if(!password.match(/[A-Z]/)){
            passwordErrors = [...passwordErrors, 'Password must contain at least one uppercase letter'];
        }
        if(!password.match(/[a-z]/)){
            passwordErrors = [...passwordErrors, 'Password must contain at least one lowercase letter'];
        }
        if(!password.match(/[0-9]/)){
            passwordErrors = [...passwordErrors, 'Password must contain at least one number'];
        }
        if(!password.match(/[^A-Za-z0-9]/)){
            passwordErrors = [...passwordErrors, 'Password must contain at least one special character'];
        }

        return passwordErrors.length === 0
    }

    function checkEmailErrors(email: string){
        emailErrors = [];
        if(!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
            emailErrors = [...emailErrors, 'Email is not valid'];
        }

        return emailErrors.length === 0
    }

    async function onSubmit(e: Event){
        e.preventDefault();

        if(success){
            return;
        }
        let emailErrored = checkEmailErrors(email);
        let passwordErrored = checkPasswordErrors(password);

        if(!emailErrored || !passwordErrored){
            return;
        }

        try{
            let res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            let data = await res.json();
            
            if(data.error && data.error === 'Invalid form values.'){
                emailErrors = data.fields.map((x: FormErrorField ) => x.name === 'email' ? x.message : '');
                return;
            }

            if(data.error){
                error = true
                return;
            }
        }catch(e: any){
            console.log(e)
            error = true
        }

        success = true;
        setTimeout( () => {
            success = false;
            document.location.pathname = "/"
        }, 2000)

        password = '';
        email = '';
    }

</script>

<div class="{scaleClass} bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute w-full transation-all duration-700" role="alert">
    <strong class="font-bold">Success!</strong>
    <span class="block sm:inline">Your account has been created.</span>
</div>

<div class="{errorClass} bg-red-400 text-white px-4 py-3 rounded absolute w-full transation-all duration-700" role="alert">
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">An unexpected error has occured. Please try again and reach out if the problem persists.</span>
</div>


<div class="flex justify-center items-center bg-custom h-screen section">
    <div class="w-1/3 max-sm:w-2/3">
        <h1 class="text-3xl font-bold text-center text-white">Register</h1>
        <form class="mt-4" on:submit={onSubmit}>
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input bind:value={email} autofocus={true} class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none" id="email" type="text" placeholder="Email" name="email">
                {#each emailErrors as error}
                    <p class="text-sm italic font-bold input-error">{error}</p>
                {/each}
            </div>
            <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input bind:value={password} autocomplete="current-password" class="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none" id="password" type="password" placeholder="******************">
                {#each passwordErrors as error}
                    <p class="text-xs italic input-error">{error}</p>
                {/each}
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                    Register
                </button>
            </div>
        </form>
    </div>
</div>