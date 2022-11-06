import { writable } from "svelte/store";

let accessToken = writable('');
let userData = writable({})
export { accessToken }