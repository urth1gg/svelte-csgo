import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '$env/static/private'

export const verifyToken = async (token: string) => {
    try{
        let t = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET)
        return true;
    }catch(e: any){
        return false
    }
}