import { io } from 'socket.io-client';
import { PUBLIC_SOCKET_URL } from '$env/static/public'

//singleton pattern socket 
export class Socket {
    private static instance: Socket;
    private socket: any;

    private constructor() {
        this.socket = io(`ws://${PUBLIC_SOCKET_URL}`);
    }

    public static getInstance(): any {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }

        return Socket.instance.socket;
    }

}


export default Socket;