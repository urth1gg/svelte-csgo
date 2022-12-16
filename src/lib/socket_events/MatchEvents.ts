import type { Socket } from "socket.io";
import { Socket as SocketSingleton } from "$lib/../socket";

type MatchSubscriptions = {
    MATCH_FOUND: string
    MATCH_ACCEPTED: string
}

type MatchEmitters = {
    REFRESH_ACTIVE_MAPS: string
    MATCH_ACCEPTED: string
    MATCH_REJECTED: string
    MATCH_FOUND: string
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