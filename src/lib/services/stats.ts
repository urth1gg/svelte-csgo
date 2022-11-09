import type { SupabaseClient } from "@supabase/supabase-js"
import type { UniqueInterface } from "@sveltejs/kit/types/private"

export async function getStats(user_id: string, supabase: SupabaseClient){
    let stats = await supabase.from('stats').select('*').eq('user_id', user_id)
    if(stats.error){
        throw new Error(stats.error.message)
    }
    return stats.data[0]
}