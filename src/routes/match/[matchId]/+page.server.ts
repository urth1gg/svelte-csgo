import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import { supabase } from "$utils/db/supabase";
import { getUserById } from "$lib/services/users";

export async function load({locals, params}: ServerLoadEvent) {

    const { matchId } : {matchId?: string}= params;

    if(!matchId){
        throw redirect(302, '/')
    }

    let { data, error } = await supabase.from('matches').select('*').eq('id', matchId).single();

    if(error){
        console.log(error)
        throw redirect(302, '/')
    }

    if(!data){
        throw redirect(302, '/')
    }

    let teamA: User[] = await Promise.all(data.team_a.map(async (player: string) => {
        let user = await getUserById(player, supabase);
        return user ? user as User : player as any;
    }));
    
    let teamB: User[] = await Promise.all(data.team_b.map(async (player: string) => {
        let user = await getUserById(player, supabase);
        return user ? user as User : player as any;
    }));

    let ip = data.ip;
    return {
        teamA: teamA,
        teamB: teamB,
        ip: ip,
        matchId: matchId
    }
}