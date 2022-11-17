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

        let { token, friendId } = data;


        let decoded = decodeToken(token);
        if(!decoded) return;

        let { id } = decoded;

        console.log(id, friendId)
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

    socket.on('disconnect', () => {
        console.log(socket.id)
        delete sockets[socket.id];
    });
});

setInterval( () => {
    console.log(Object.keys(sockets))

    if(sockets['99e09d1b-abcd-4d64-aa3e-ba475bb9c345']){
        //sockets['99e09d1b-abcd-4d64-aa3e-ba475bb9c345'].send('123')
    }
}, 5000)
