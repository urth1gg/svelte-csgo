import { createServer } from "http";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path: '../.env'});

let { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = process.env;

const decodeToken = (token) => {
    if(!token) return {};
    
    try{
        let t = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
        return t;
    }catch(e){
        console.log(e)
        return null;
    }
}

let sockets = {}
const io = new Server(5000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    sockets[socket.id] = socket;

    console.log('connected', socket.id);

    socket.on("party_invite", (data) => {
        console.log('party_invite')

        let { token, friend } = data;


        let decoded = decodeToken(token);
        if(!decoded) return;


        console.log(friend.friend_id);
        sockets[friend.friend_id]?.emit('party_invite', { friend: friend.user });
    });

    socket.on("join", (msg) => {
        console.log('joined', socket.id);
        let t = decodeToken(msg.token);
        
        if(!t) return;

        let prevId = socket.id; 
        delete sockets[prevId];
        delete sockets[t.id];
        socket.id = t.id;
        sockets[socket.id] = socket;
    });

    socket.on('party_invite_accepted', (data) => {
        console.log('party_invite_accepted', data);
        let { token, friend } = data;
        let decoded = decodeToken(token);
        if(!decoded) return;

        sockets[friend.id]?.emit('party_invite_accepted', { acceptedBy: decoded.id });
    })

    socket.on('disconnect', () => {
        console.log(socket.id)
        delete sockets[socket.id];
    });
});

