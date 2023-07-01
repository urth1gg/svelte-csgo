import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
//import { JWT_ACCESS_TOKEN_SECRET } from '$env/static/private'
if(process.argv[2] == '../.env'){
    dotenv.config({path: process.argv[2]});
}else{
    dotenv.config();
}

let { JWT_ACCESS_TOKEN_SECRET } = process.env;

type AdminToken = {
    admin: boolean
}

export const decodeToken = (token: string | undefined) => {
    if(!token) return false;
    
    if(!JWT_ACCESS_TOKEN_SECRET) throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined');
    
    try{
        let t = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET as string) as Partial<User>;
        return t;
    }catch(e){
        return false;
    }
}

export const decodeAdminToken = (token: string | undefined) => {
    if(!token) return false;
    
    if(!JWT_ACCESS_TOKEN_SECRET) throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined');
    
    try{
        let t = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET as string) as AdminToken;
        return t;
    }catch(e){
        return false;
    }
}