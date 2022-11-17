import { writable } from "svelte/store";

let accessToken = writable('');

async function refreshManually(){
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

        let t = JSON.parse(window.atob(r.accessToken.split('.')[1]));

        document.cookie = `user=${JSON.stringify(t)}; path=/; max-age=31536000; SameSite=Lax;`
    }catch(e){
    }
}

export { accessToken, refreshManually }