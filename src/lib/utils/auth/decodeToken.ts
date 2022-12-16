import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

if(process.argv[2] == '../.env'){
    dotenv.config({path: process.argv[2]});
}else{
    dotenv.config();
}

let { JWT_ACCESS_TOKEN_SECRET } = process.env;

export const decodeToken = (token: string | undefined) => {
    if(!token) return {} as User;
    
    try{
        let t = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET as string) as User;
        return t;
    }catch(e){
        return {} as User;
    }
}