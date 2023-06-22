import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({locals}: ServerLoadEvent) {

    if(!locals.user){
        throw redirect(302, '/')
    }

    if(locals.user.role_name !== 'admin'){
        throw redirect(302, '/')
    }

    return {
        props:{}
    }
}