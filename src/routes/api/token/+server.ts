import { refreshTokens } from "../../../utils/tokenStorage";
import { json, type Cookies, type RequestHandler } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_SECRET } from "$env/static/private";
import { verifyToken } from "../../../utils/auth/verifyToken";

function destroyUserCookie(cookies: Cookies): void{
    cookies.set('user', '', { maxAge: -1, path: '/'})
}

function destroyRefreshTokenCookie(cookies: Cookies): void{
    cookies.set('rf_token', '', { maxAge: -1, path: '/'})
}

export const POST: RequestHandler = async ({locals, request, cookies}) => {

    let refreshToken = cookies.get('rf_token')
    
    if(!refreshToken) {
        destroyUserCookie(cookies)
        return json({error: 'Refresh token not provided'}, {status: 401})
    }

    try{
        let verifyRT: any = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET)
        
        if(refreshToken !== refreshTokens.get(verifyRT.email)) {
            destroyUserCookie(cookies)
            destroyRefreshTokenCookie(cookies)
            return json({error: 'Token has already been used to authenthicate you. If it was not you, contact us immediately.'}, {status: 401})
        }

        // Generate new tokens
        let newAccessToken = jwt.sign({email: verifyRT.email, id: verifyRT.id, user: verifyRT.user}, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        let newRefreshToken = jwt.sign({email: verifyRT.email, id: verifyRT.id, user: verifyRT.user}, JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

        refreshTokens.set(verifyRT.email, newRefreshToken)

        cookies.set('rf_token', newRefreshToken, {
            path: '/',
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        })

        return json({success: true, accessToken: newAccessToken, refreshToken: newRefreshToken}, {status: 200})
    }catch(e: any){
        destroyRefreshTokenCookie(cookies)
        destroyUserCookie(cookies)
        return json({error: e.message}, {status: 401})
    }
}