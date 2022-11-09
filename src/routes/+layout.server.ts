import type { ServerLoadEvent } from "@sveltejs/kit";

export async function load({ request, cookies }: ServerLoadEvent) {
    let userCookie = cookies.get('user')
    let id = '';
    if(userCookie){
        let parsed = JSON.parse(userCookie)
        id = parsed.username ? parsed.username : parsed.email
    }
    return {
        loggedIn: userCookie ? true : false,
        user: userCookie ? JSON.parse(userCookie) : null,
        id: id
    }
}