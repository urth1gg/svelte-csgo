import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
if(process.argv[2] == '../.env'){
    dotenv.config({path: process.argv[2]});
}else{
    dotenv.config();
}

let { JWT_ACCESS_TOKEN_SECRET } = process.env;

export const signToken = (payload: any) => {
    if(!payload) return false;
    
    if(!JWT_ACCESS_TOKEN_SECRET) throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined');
    
    try{
        let t = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
        return t;
    }catch(e){
        return false;
    }
}