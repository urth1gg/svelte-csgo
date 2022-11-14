import { type Writable, writable } from "svelte/store";
import { fetch_ } from "$utils/fetch/fetch_";

let init = {
    id: '', username: '', email: '', friends: []
}

let userData = writable(init) as Writable<Partial<User>>


async function setFriends(){
    let res = await fetch_("/api/friends");
    let json = await res.json();
    if(json.success){
       userData.update(
         n => ({...n, friends: json.data})
       )
    }
}


export { userData, setFriends }