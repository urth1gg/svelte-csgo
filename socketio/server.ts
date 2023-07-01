
// import { createServer } from "http";
import { Server } from "socket.io";
// import jwt from 'jsonwebtoken'
//import { supabase } from '$utils/db/supabase';
import { decodeToken, decodeAdminToken } from '../src/utils/auth/decodeToken';
import { signToken } from '../src/utils/auth/signToken';
import { supabase } from "../src/utils/db/supabase";
import type * as types from '../src/app.d';
import * as FriendsService from '../src/lib/services/friends';
import dotenv from 'dotenv';
import { startMapVoteTimer } from "./timers";


let sockets: any = {}
const io = new Server(5000, {
    cors: {
        origin: process.env.PUBLIC_BASE_URL,
        methods: ["GET", "POST"]
    }
});

let matches: any = {} 

const SocketEvents = {
    MATCH_FOUND: 'MATCH_FOUND',
    REFRESH_ACTIVE_MAPS: 'REFRESH_ACTIVE_MAPS',
    MATCH_ACCEPTED: 'MATCH_ACCEPTED',
    MATCH_REJECTED: 'MATCH_REJECTED',
    MATCH_DECLINED: 'MATCH_DECLINED',
    UPDATE_PLAYERS: 'UPDATE_PLAYERS',
    REMOVE_FROM_PLAYING_MATCHES: 'REMOVE_FROM_PLAYING_MATCHES',
    START_MATCH: 'START_MATCH',
    SELECT_RANDOM_MAP: 'SELECT_RANDOM_MAP',
    CREATE_MATCH: 'CREATE_MATCH',
    UPDATE_MAP: 'UPDATE_MAP',
    party_invite: 'party_invite',
    join: 'join',
    disconnect: 'disconnect'
} as const;


io.on("connection", (socket) => {
    sockets[socket.id] = socket;

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
        if(!t.id) return;

        let prevId = socket.id; 
        delete sockets[prevId];
        delete sockets[t.id];
        sockets[t.id] = socket;
        let p1_ = await supabase.from(`
            users
        `).select(`
            id,
            party_id,
            flags (
                *
            )
        `).eq('id', t.id).single();

        if(p1_.error) return;

        let partyId = p1_.data?.party_id;

        if(partyId){
            socket.join(partyId);
        }
        let matchId = p1_.data?.flags?.in_game_match_id;

    });

    socket.on('party_invite_accepted', async (data) => {
        let { token, friend } = data;
        let decoded = decodeToken(token);
        if(!decoded) return;
        if(!decoded.id) return;

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

        setTimeout( () => console.log(io.sockets.adapter.rooms), 4000);
 
    })

    socket.on(SocketEvents.REFRESH_ACTIVE_MAPS, async data => {
        let { match } = data;

        let allPlayers = [...match.teamA, ...match.teamB].map(x => x.id);

        for(let userId in sockets){
            let s = sockets[userId];

            if(allPlayers.includes(userId)) {
                s.emit(SocketEvents.REFRESH_ACTIVE_MAPS, { match });
            }
        };

    })

    socket.on(SocketEvents.MATCH_FOUND, async data => {
        let { match, token } = data;

        let decoded = decodeAdminToken(token);

        
        if(!decoded) return;
        if(!decoded.admin) return;

        let { matchId, teamA, teamB } = match; 


        let allPlayers = [...teamA, ...teamB].map(x => x.id);

        let matchIdAsAString = matchId.toString();
        for(let userId in sockets){
            let s = sockets[userId];
            if(allPlayers.includes(userId)) {
                s.join(matchIdAsAString);
            }
        };

        matches[matchIdAsAString] = match;

        let room = io.sockets.adapter.rooms.get(matchIdAsAString);   

        if(room){
            io.to(matchIdAsAString).emit(SocketEvents.MATCH_FOUND, { matchId: matchIdAsAString, teamA, teamB });
            setTimeout(() => {
                let match_ = matches[matchIdAsAString];
                let matchShouldBeDeleted = false;

                match_.teamA.forEach( (x: any) => {

                    if(x.acceptedMatch === false ){
                        sockets[x.id]?.emit(SocketEvents.MATCH_DECLINED);
                        matchShouldBeDeleted = true;
                    }
        
                });
        
                match_.teamB.forEach( (x: any) => {
                    if(x.acceptedMatch === false){
                        sockets[x.id]?.emit(SocketEvents.MATCH_DECLINED);
                        matchShouldBeDeleted = true;
                    }
                });
        
                if(matchShouldBeDeleted){
                    io.emit("REMOVE_FROM_PLAYING_MATCHES", { 
                        matchId: matchId, 
                        teamA: match_.teamA.filter( (x: any) => x.acceptedMatch === true),
                        teamB: match_.teamB.filter( (x: any) => x.acceptedMatch === true),
                        token: token 
                    });
                    delete matches[matchId];
                }
            }, 10000);
        }
    })

    socket.on(SocketEvents.MATCH_ACCEPTED, async data_ => {

        let { token, match } = data_;
        let decoded = decodeToken(token);

        if(!decoded) return;

        let { matchId } = match;

        let match_ = matches[matchId];

        if(!match_) return;


        match_.teamA = match_.teamA.map( (x:any) => {
            assertIsUser(decoded);
            if(x.id === decoded.id){
                x.acceptedMatch = true;
            }
            return x;
        })

        match_.teamB = match_.teamB.map( (x: any) => {
            assertIsUser(decoded);
            if(x.id === decoded.id){
                x.acceptedMatch = true;
            }
            return x;
        })

        let signedToken = signToken({admin: true});

        if(match_.teamA.every( (x:any) => x.acceptedMatch) && match_.teamB.every( (x:any) => x.acceptedMatch)){

            io.emit(SocketEvents.CREATE_MATCH, { matchId, token: signedToken });
            if(signedToken) startMapVoteTimer(matchId, io, signedToken, matches);

        }

        io.emit(SocketEvents.UPDATE_PLAYERS, { matchId, teamA: match_.teamA, teamB: match_.teamB, token: signedToken })

        io.to(matchId).emit(SocketEvents.MATCH_ACCEPTED, match);

    });

    socket.on(SocketEvents.START_MATCH, async data => {
        let { token, matchId } = data;

        let decoded = decodeAdminToken(token);
        if(!decoded) return;
        if(!decoded.admin) return;

        io.to(matchId).emit(SocketEvents.START_MATCH, { matchId });
    });

    socket.on('disconnect', () => {
        delete sockets[socket.id];
    });
});

let timeouts: any = {};

// assert is user typescript

function assertIsUser(user: Partial<User> | boolean): asserts user is User {
    if(user === false) throw new Error("User not found");
}