import { writable } from "svelte/store";

let userData = writable({id: '', username: ''} as Partial<User>);
export { userData }