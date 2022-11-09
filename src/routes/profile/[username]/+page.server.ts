import { request } from "@playwright/test";
import type { ServerLoadEvent } from "@sveltejs/kit";
import { supabase } from "../../../../src/utils/db/supabase";
import { getStats } from "$lib/services/stats";
import { getUserAndStats } from "$lib/services/users";

export async function load({ params, locals }: ServerLoadEvent) {

    if(!params.username) return { error: 404 }
    let user: User | null = await getUserAndStats(params.username, locals.supabase);

    console.log(user)

    return {
        user: user,
    }
}