import type { ServerLoadEvent } from "@sveltejs/kit";
import { getUserWithAllRelatons } from "$lib/services/users";

export async function load({ params, locals, cookies }: ServerLoadEvent) {

    if(!params.username) return { error: 404 }

    let user: User | null = await getUserWithAllRelatons(params.username, locals.supabase) as User | null;

    if(!user) return { error: 404 }

    return {
        user: user,
        userLoggedIn: locals.user
    }
}