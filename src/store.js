import { writable } from "svelte/store";


let savedEntries = localStorage.getItem('entries');

export const entries = writable(savedEntries?JSON.parse(savedEntries):['1', '2', '3']);
export const formVisible = writable(false);