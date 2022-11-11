import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN_SECRET} from '$env/static/private'

export const decodeToken = (token: string | undefined) => {
    if(!token) return {} as User;
    
    try{
        let t = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as User;
        return t;
    }catch(e){
        return {} as User;
    }
}