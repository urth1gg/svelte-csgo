<script lang="ts">
    import "../app.css";
    import { browser } from '$app/environment'; 
    import { accessToken } from '$lib/store/accessToken';
    import { userData } from '$lib/store/userData';
    import { afterUpdate, onMount, beforeUpdate } from 'svelte';
    import Nav  from '$lib/components/Nav.svelte';
    import { fetch_ } from "../utils/fetch/fetch_";

    export let data;

    let { loggedIn, id } : { loggedIn: boolean, id: string } = data;
    userData.set({id:id})

    async function refreshAT(){

        // Don't refresh access token if not logged in
        if(!document.cookie.includes('user')) return;


        // Don't refresh access token if current one is stil valid
        if($accessToken !== ''){
            fetch_('/api/ping', {
                method: 'GET',
                credentials: 'include'
            })
            let t = JSON.parse(window.atob($accessToken.split('.')[1]));
            if(t.exp > Math.floor(Date.now() / 1000)) return
        }


        let res = null;

        try{
            res = await fetch('http://localhost:5173/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            let r = await res.json()

            if(r.error) throw new Error(r.error)

            accessToken.set(r.accessToken)
        }catch(e){
            console.log(e)
        }
    }

    
    beforeUpdate(() => {
        if(browser) refreshAT()
    })


</script>
  
<Nav loggedIn={loggedIn} id={id}/>
<slot />