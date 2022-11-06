import { writable } from "svelte/store";

let userData = writable({id: ''})
export { userData }