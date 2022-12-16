
// import { createServer } from "http";
import { Server } from "socket.io";
// import jwt from 'jsonwebtoken'
//import { supabase } from '$utils/db/supabase';
import { decodeToken } from '../src/utils/auth/decodeToken';
import { supabase } from "../src/utils/db/supabase";
import type * as types from '../src/app.d';
import * as FriendsService from '../src/lib/services/friends';
 
let sockets: any = {}
const io = new Server(5000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


const SocketEvents = {
    MATCH_FOUND: 'MATCH_FOUND',
    REFRESH_ACTIVE_MAPS: 'REFRESH_ACTIVE_MAPS',
    MATCH_ACCEPTED: 'MATCH_ACCEPTED',
    MATCH_REJECTED: 'MATCH_REJECTED',
    party_invite: 'party_invite',
    join: 'join',
    disconnect: 'disconnect'
} as const;

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

    socket.on("join", async (msg) => {
        let t = decodeToken(msg.token);
        
        if(!t) return;

        let prevId = socket.id; 
        delete sockets[prevId];
        delete sockets[t.id];
        sockets[t.id] = socket;
        let p1_ = await supabase.from('users').select('party_id').eq('id', t.id).single();

        if(p1_.error) return;

        let partyId = p1_.data?.party_id;

        if(partyId){
            socket.join(partyId);
        }
    });

    socket.on('party_invite_accepted', async (data) => {
        let { token, friend } = data;
        let decoded = decodeToken(token);
        if(!decoded) return;

        let p1_ = supabase.from('users').select('party_id').eq('id', decoded.id).single().then();
        let p2_ = supabase.from('users').select('party_id').eq('id', friend.id).single().then();
        
        let [p1, p2] = await Promise.all([p1_, p2_]);
    
        if(p1.error || p2.error){
            throw new Error("Error finding party");
        }
    
    
        let partyId = "";
    
        if(p1.data?.party_id){
            partyId = p1.data?.party_id
        }else{
            partyId = p2.data?.party_id
        }
    
        if(!partyId || partyId === '') {
            partyId = Math.random().toString(36).substring(2, 11);
        }
    
    
        await sockets[friend.id]?.join(partyId);
        await sockets[decoded.id]?.join(partyId);

        let p11 = supabase.from('users').update({party_id: partyId}).eq('id', decoded.id).then()
        let p21 = supabase.from('users').update({party_id: partyId}).eq('id', friend.id).then()
    

        await Promise.all([p11, p21]);

        let partyMembers = await supabase.from('users').select('username,email,id,party_id').eq('party_id', partyId).then();
        if(partyMembers.error){
            throw new Error("Error finding party members");
        }

        let room = io.sockets.adapter.rooms.get(partyId);

        if(room){
            io.to(partyId).emit('REFRESH_PARTY', { partyId, partyMembers: partyMembers.data });

        }   
    })

    socket.on("REFRESH_PARTY", async data => {
        let { token, partyId } = data;
        let decoded = decodeToken(token);
        if(!decoded) return;

        let room = io.sockets.adapter.rooms.get(partyId);


        let partyMembers = await supabase.from('users').select('username,email,id,party_id').eq('party_id', partyId).then();
        if(partyMembers.error){
            throw new Error("Error finding party members");
        }


        if(room){
            io.to(partyId).emit('REFRESH_PARTY', { partyId, partyMembers: partyMembers.data });
            console.log(partyMembers.data)
        }

        if(room?.size === 1){
            setTimeout( () => io.sockets.adapter.rooms.delete(partyId), 3000);
        }

        console.log(io.sockets.adapter.rooms)
        setTimeout( () => console.log(io.sockets.adapter.rooms), 4000);
 
    })

    socket.on(SocketEvents.REFRESH_ACTIVE_MAPS, async data => {
        let { token, match } = data;
        let decoded = decodeToken(token);
        if(!decoded) return;

        let room = io.sockets.adapter.rooms.get(match.id);

        if(room){
            io.to(match.id).emit(SocketEvents.REFRESH_ACTIVE_MAPS, match.maps);
        }
    })

    socket.on(SocketEvents.MATCH_FOUND, async data => {
        let { match } = data;

        console.log(data)
        console.log(match)
        let { matchId, teamA, teamB } = match; 

        let allPlayers = [...teamA, ...teamB].map(x => x.id);

        for(let userId in sockets){
            let s = sockets[userId];
            if(allPlayers.includes(userId)) s.join(matchId);
        };


        let room = io.sockets.adapter.rooms.get(matchId);   

        if(room){
            io.to(matchId).emit(SocketEvents.MATCH_FOUND, { matchId, teamA, teamB });
        }
    })

    socket.on(SocketEvents.MATCH_ACCEPTED, async data => {

        let { token, match } = data;
        let decoded = decodeToken(token);
        if(!decoded) return;

        let { matchId } = match;

        let room = io.sockets.adapter.rooms.get(matchId);

        console.log('room is', room);
        if(room){
            io.to(matchId).emit(SocketEvents.MATCH_ACCEPTED, match);
        }

    });

    socket.on('disconnect', () => {
        console.log(socket.id)
        delete sockets[socket.id];
    });
});


setInterval( () => {
    console.log(Object.keys(sockets));
}, 10000)
