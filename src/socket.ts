import { io } from 'socket.io-client';

//singleton pattern socket 
export class Socket {
    private static instance: Socket;
    private socket: any

    private constructor() {
        this.socket = io('ws://localhost:4000');
    }

    public static getInstance(): any {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }

        return Socket.instance.socket;
    }

}


export default Socket;