import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({locals}: ServerLoadEvent) {

    if(locals.user){
        throw redirect(302, '/')
    }

    return {
        props:{}
    }
}