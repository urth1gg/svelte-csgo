import { io } from 'socket.io-client';
import { MatchEvents } from '$lib/socket_events/MatchEvents';

//singleton pattern socket 
export class Socket {
    private static instance: Socket;
    private socket: any;

    public static MatchEvents = MatchEvents;
    private constructor() {
        this.socket = io('ws://localhost:5000');
    }

    public static getInstance(): any {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }

        return Socket.instance.socket;
    }

}


export default Socket;