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

    if(e.target.closest(".modal") === null){
        modals.update( n => ({...init, showFriends: n.showFriends}))
        console.log(modals)
        document.body.removeEventListener("click", hideModals);
    }

}

modals.subscribe( val => {
    console.log(val)
    if(browser){
        if(val.showParty){
            document.body.removeEventListener("click", hideModals);
            setTimeout( () => {
                document.body.addEventListener("click", hideModals)
            }, 0);
        }
    }
})
export { modals, toggleFriends, toggleParty }