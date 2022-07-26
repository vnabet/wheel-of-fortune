import { writable } from "svelte/store";


let savedEntries = localStorage.getItem('entries');

export const entries = writable(savedEntries?JSON.parse(savedEntries):['<= click to edit', '<= click to edit', '<= click to edit']);
export const formVisible = writable(false);