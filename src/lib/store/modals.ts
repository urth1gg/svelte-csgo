import { type Writable, writable } from "svelte/store";
import { browser } from "$app/environment";

let init = {
    showFriends: false,
    showParty: false,
    showPartyInvite: false,
}

let modals = writable({
    showFriends: false,
    showParty: false,
    showPartyInvite: false
}) as Writable<ModalsState>

function toggleFriends(){
    modals.update(
        n => ({...n, showFriends: !n.showFriends})
    )
}

function toggleParty(){
    modals.update(
        n => ({...n, showParty: !n.showParty})
    )
}


let hideModals = (e: any) => {
    modals.update( n => ({...init }))
    document.body.removeEventListener("click", hideModals);
}

let hideModalsESC = (e: any) => {
    if(e.keyCode == 27){
        modals.update( n => ({...init }))
        document.body.removeEventListener("keydown", hideModalsESC);
    }
}

modals.subscribe( val => {
    if(browser){
        if(val.showFriends || val.showParty || val.showPartyInvite){
            document.body.removeEventListener("click", hideModals);
            setTimeout( () => {
                document.body.addEventListener("click", hideModals);
                document.body.addEventListener('keydown', hideModalsESC);
            }, 0);
        }
    }
})
export { modals, toggleFriends, toggleParty }