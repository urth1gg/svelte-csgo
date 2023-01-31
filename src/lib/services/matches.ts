import { convertPlayersToUsers } from "./users";
import { CS_TEAM_CT, CS_TEAM_T, DRAW } from "../consts/consts";
import type { SupabaseClient } from "@supabase/supabase-js";

function initMapsForMatch(activeMatch: Match) {

    activeMatch.maps = new Map<string, string>();
    activeMatch.usersWhoVoted = new Map<string, boolean>();

    let mapList = [
        {id: 'de_dust2', name: 'Dust 2'},
        {id: 'de_mirage', name: 'Mirage'},
        {id: 'de_inferno', name: 'Inferno'},
        {id: 'de_nuke', name: 'Nuke'},
        {id: 'de_overpass', name: 'Overpass'},
        {id: 'de_train', name: 'Train'},
        {id: 'de_vertigo', name: 'Vertigo'},
        {id: 'de_anubis', name: 'Anubis'},
        {id: 'de_ancient', name: 'Ancient'},
        {id: 'de_cache', name: 'Cache'},
        {id: 'de_tuscan', name: 'Tuscan'},
    ]

    let maps = new Map<string, string>();

    mapList.forEach((map) => {
        activeMatch.maps.set(map.id, map.name)
    });
}

async function isUserInMatch(match_id: string, user_id: string, supabase: any) {
    // let { data, error } = await supabase
    //     .from('match_users')
    //     .select('user_id')
    //     .eq('match_id', match_id)
    //     .eq('user_id', user_id)
    //     .single()

    // if (error) {
    //     console.log(error)
    //     return false
    // }

    // if (data === null) {
    //     return false
    // }

    // return true
}

async function removeUserFromMatch(match_id: string, user_id: string, matchesInMemory: any) {
    let match = matchesInMemory[match_id]
    let user = match.users[user_id]

    if (user === undefined) {
        return false
    }

    delete match.users[user_id]
    return true
}

async function removeMapFromMatch(activeMatch: Match, userId: string, map_id: string) {
    let map = activeMatch.maps.get(map_id)

    if (map === undefined ||
         activeMatch.usersWhoVoted.get(userId) === true) {
        return false
    }

    activeMatch.usersWhoVoted.set(userId, true)
    activeMatch.maps.delete(map_id);
    return true
}

async function createMatch(activeMatch: any, supabase: any, map: string) {

    let { matchId, teamA, teamB } = activeMatch

    let teamA_ = convertPlayersToUsers(teamA, supabase)
    let teamB_ = convertPlayersToUsers(teamB, supabase)

    let [ teamA__, teamB__] = await Promise.all([teamA_, teamB_]);

    let { data, error } = await supabase
        .from('matches')
        .insert({
            id: matchId,
            team_a: teamA__,
            team_b: teamB__,
            map: map,
            ip: null,
            winner: '0'
        })

    console.log('data', data)
    console.log('created match')
    if (error) {
        console.log(error)
        return false
    }

    return true
}

async function changeElo(matchId:number, supabase: SupabaseClient){
    let { data, error } = await supabase
        .from('matches')
        .select('team_a, team_b, winner')
        .eq('id', matchId)
        .single()

    if(error){
        console.log(error)
        return false
    }

    if(data === null){
        return false
    }

    if(data.winner === DRAW){
        return false
    }

    let { team_a, team_b } = data

    let AteamAverageElo = 0
    let BteamAverageElo = 0

    let teamA: string[] = []
    let teamB: string[] = []

    team_a.forEach((JSONString: string) => {
        let data = JSON.parse(JSONString)

        teamA.push(data.id)
        AteamAverageElo += data.elo
    })

    team_b.forEach((JSONString: string) => {
        let data = JSON.parse(JSONString)

        teamB.push(data.id)
        BteamAverageElo += data.elo
    })

    AteamAverageElo = AteamAverageElo / team_a.length
    BteamAverageElo = BteamAverageElo / team_b.length

    let expectedScoreA = 1 / (1 + Math.pow(10, (BteamAverageElo - AteamAverageElo) / 400))
    let expectedScoreB = 1 / (1 + Math.pow(10, (AteamAverageElo - BteamAverageElo) / 400))

    let actualScoreA = 0
    let actualScoreB = 0


    if(data.winner === CS_TEAM_CT){
        actualScoreA = 1
    }else if(data.winner === CS_TEAM_T){
        actualScoreB = 1
    }

    let kFactor = 32

    let newEloA = AteamAverageElo + kFactor * (actualScoreA - expectedScoreA)
    let newEloB = BteamAverageElo + kFactor * (actualScoreB - expectedScoreB)

    
    let eloDifferenceTeamA = Math.round(newEloA - AteamAverageElo);
    let eloDifferenceTeamB = Math.round(newEloB - BteamAverageElo);
    

    for(let i = 0; i < teamA.length; i++){

        let { data: data2, error: error2 } = await supabase
            .from('stats')
            .select('elo')
            .eq('user_id', teamA[i])
            .single()

        if(error2){
            console.log(error2)
            continue
        }

        if(data2 === null){
            continue
        }

        let { elo } = data2

        let { data, error } = await supabase
            .from('stats')
            .update({ elo: elo +  eloDifferenceTeamA})
            .eq('user_id', teamA[i])


        if(error){
            console.log(error)
            continue
        }
    }

    for(let i = 0; i < teamB.length; i++){
        let { data: data2, error: error2 } = await supabase
        .from('stats')
        .select('elo')
        .eq('user_id', teamA[i])
        .single()

        if(error2){
            console.log(error2)
            continue
        }

        if(data2 === null){
            continue
        }

        let { elo } = data2

        let { data, error } = await supabase
            .from('stats')
            .update({ elo: elo +  eloDifferenceTeamB })
            .eq('user_id', teamB[i])

        if(error){
            console.log(error)
            continue
        }
    }

}   

export { initMapsForMatch, isUserInMatch, removeUserFromMatch,removeMapFromMatch, createMatch, changeElo }