import type { LoadEvent } from "@sveltejs/kit";

export async function load({params, data, parent}: LoadEvent) {
    console.log(params)
    console.log(data)
    console.log(parent)
}
