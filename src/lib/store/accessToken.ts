import { writable } from "svelte/store";

let accessToken = writable('');
export { accessToken }