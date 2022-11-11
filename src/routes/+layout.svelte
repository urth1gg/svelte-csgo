<script lang="ts">
    import "../app.css";
    import { browser } from '$app/environment'; 
    import { accessToken } from '$lib/store/accessToken';
    import Nav  from '$lib/components/Nav.svelte';
    import { fetch_ } from "../utils/fetch/fetch_";
    import { afterUpdate } from "svelte";
	import { userData } from "$lib/store/userData";

    export let data;

    let { loggedIn, id, user } : { loggedIn: boolean, id: string, user: User } = data;

    let token = '';
    accessToken.subscribe( value => {
        token = value;

        if(value !== '') refreshAccessToken();
    })

    function makePingRequest(){
        if(localStorage.getItem('lastPingTime')){
            const lastPingTime = Number(localStorage.getItem('lastPingTime'));
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastPingTime;
            if(timeDiff > 1000 * 60 * 5){
                fetch_('/api/ping');
                localStorage.setItem('lastPingTime', currentTime.toString());
            }
        }else{
            fetch_('/api/ping');
            localStorage.setItem('lastPingTime', new Date().getTime().toString());
        }
    }

    async function refreshAccessToken(){
        if(token !== ''){
            makePingRequest();
            let t = JSON.parse(window.atob(token.split('.')[1]));
            userData.set(t);
            if(t.exp > Math.floor(Date.now() / 1000)) return
        }

        if(!document.cookie.includes('user')) return;


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

    afterUpdate(async () => {
    
        if(!browser) return;

        refreshAccessToken()

    })
</script>
  
<Nav loggedIn={loggedIn} id={id} user={user}/>
<slot loggedIn={loggedIn} id={id} />