import { type Writable, writable } from "svelte/store";
import { fetch_ } from "$utils/fetch/fetch_";

let init = {
    id: '', username: '', email: '', friends: [], partyMembers: []
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

async function setPartyMembers(data: Partial<User>[]){
    userData.update(
        n => ({...n, partyMembers: data})
    )
}

async function getUserFlags(){
    let res = await fetch_("/api/flags");
    let json = await res.json();

    if(json.success){
        userData.update(
            n => ({...n, flags: json.data})
        )
    }
}
export { userData, setFriends, setPartyMembers, getUserFlags }