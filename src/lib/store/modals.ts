import { type Writable, writable } from "svelte/store";

let init = {
    showFriends: false,
    showParty: false
}

let modals = writable(init) as Writable<Partial<ModalsState>>

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

export { modals, toggleFriends, toggleParty }