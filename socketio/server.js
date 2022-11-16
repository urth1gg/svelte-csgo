import { createServer } from "http";
import { Server } from "socket.io";


let sockets = {};
const io = new Server(4000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("connected");
    sockets[socket.id] = true;
    socket.on("message", (msg) => {
        console.log(msg)
    });

    socket.on('disconnecting', () => {
        console.log('disc')
        delete sockets[socket.id];
    });

});



setInterval(() => {
    console.log('sockets', Object.keys(sockets).length);
}, 2000);