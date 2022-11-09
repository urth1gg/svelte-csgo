import { request } from "@playwright/test";
import type { ServerLoadEvent } from "@sveltejs/kit";
import { supabase } from "../../../../src/utils/db/supabase";
import { getStats } from "$lib/services/stats";
import { getUser } from "$lib/services/users";

export async function load({ params, locals }: ServerLoadEvent) {

    if(!params.username) return { error: 404 }

    let user: User | null = await getUser(params.username, locals.supabase);

    if(!user) return { error: 404 }

    let stats: Stats | null = user ? await getStats(user.id, supabase) : null;

    return {
        user: user,
        stats: stats
    }
}