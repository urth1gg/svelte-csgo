import { type Writable, writable } from "svelte/store";
import { browser } from "$app/environment";

let init = {
    showFriends: false,
    showParty: false
}

let modals = writable({
    showFriends: false,
    showParty: false
}) as Writable<Partial<ModalsState>>

function toggleFriends(){
    console.log('togglin')
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
        if(val.showFriends || val.showParty){
            document.body.removeEventListener("click", hideModals);
            setTimeout( () => {
                document.body.addEventListener("click", hideModals);
                document.body.addEventListener('keydown', hideModalsESC);
            }, 0);
        }
    }
})
export { modals, toggleFriends, toggleParty }