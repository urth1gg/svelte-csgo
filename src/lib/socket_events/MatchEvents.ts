import { Socket as SocketSingleton } from "$lib/../socket";

type MatchSubscriptions = {
    MATCH_FOUND: string
    MATCH_ACCEPTED: string
    MATCH_DECLINED: string
    UPDATE_PLAYERS: string
    REMOVE_FROM_PLAYING_MATCHES: string
    START_MATCH: string
    REFRESH_ACTIVE_MAPS: string
    CREATE_MATCH: string
}

type MatchEmitters = {
    REFRESH_ACTIVE_MAPS: string
    MATCH_ACCEPTED: string
    MATCH_REJECTED: string
    MATCH_FOUND: string
    MATCH_DECLINED: string
    CREATE_MATCH: string
}

class MatchEvents{

    static on(event: keyof MatchSubscriptions, callback: any){
        SocketSingleton.getInstance().on(event, callback);
    }

    static emit(event: keyof MatchEmitters, data: any){
        SocketSingleton.getInstance().emit(event, data);
    }
}

export { MatchEvents };