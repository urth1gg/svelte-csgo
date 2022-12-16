function initMapsForMatch(activeMatch: Match) {

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

async function removeMapFromMatch(activeMatch: Match, map_id: string) {
    let map = activeMatch.maps.get(map_id)

    if (map === undefined) {
        return false
    }

    activeMatch.maps.delete(map_id);
    return true
}
export { initMapsForMatch, isUserInMatch, removeUserFromMatch,removeMapFromMatch }