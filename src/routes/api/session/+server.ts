import { json, type RequestHandler } from "@sveltejs/kit";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { errorInvalidFormMessage } from "../../../utils/invalidFormValues";
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from "$env/static/private";
import { refreshTokens } from "../../../utils/tokenStorage";
import { verifyToken } from "../../../utils/auth/verifyToken";
import { destroyUserCookie, destroyRefreshTokenCookie } from "../../../utils/auth/logout";

export const GET: RequestHandler = async ({locals, request, cookies}) => {
    let token = request.headers.get('Authorization')?.split(" ")[1]

    if(!token) return json({error: 'Invalid token', success: false}, {status: 401})

    let isTokenValid = await verifyToken(token)
    if(!isTokenValid) return json({error: 'Invalid token', success: false}, {status: 401})

    return json({success: true, loggedIn: true}, {status: 200})
}

export const POST: RequestHandler = async function ({locals, request, cookies}){

    let { email, password } = await request.json();
    let { data, error } = await locals.supabase.from('users').select('*').eq('email', email);
    
    if(error) throw new Error(error.message)
 
    if(!data || data.length === 0){
        let { response, headers } = errorInvalidFormMessage(
            [
                {name: 'password', message: 'Email and/or password is incorrect.'}
            ], 401)
        return json(response, headers)
    }
    
    const hash = data[0].password
    const match = await bcrypt.compare(password, hash)

    let obj = {
        id: data[0].id,
        email: data[0].email,
        username: data[0].username,
    }

    if(!match){
        let { response, headers } = errorInvalidFormMessage(
                [
                    {name: 'password', message: 'Email and/or password is incorrect.'}
                ], 401
            );

        return json(response, headers)
    }


    let accessToken = jwt.sign(obj, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    let refreshToken = jwt.sign(obj, JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    
    refreshTokens.set(obj.email, refreshToken)

    cookies.set('user', JSON.stringify(obj), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: 'strict',
        secure: true
    });

    cookies.set('rf_token', refreshToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    })

    return json({success:true, accessToken}, { status: 200})
}

export const DELETE: RequestHandler = async ({locals, request, cookies}) => {
    destroyRefreshTokenCookie(cookies)
    destroyUserCookie(cookies)

    return json({success: true}, {status: 200})
}