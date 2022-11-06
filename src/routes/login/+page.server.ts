import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({locals, cookies}: ServerLoadEvent) {

    if(cookies.get('user')){
        throw redirect(302, '/')
    }

    return {
        props:{}
    }
}