import { json, type Cookies, type RequestHandler } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_SECRET, CSGO_USER, CSGO_PASS } from "$env/static/private";
import { getUserById } from "$lib/services/users"
import { InvalidRequest } from "$lib/json_responses/responses";

function destroyUserCookie(cookies: Cookies): void{
    cookies.set('user', '', { maxAge: -1, path: '/'})
}

function destroyRefreshTokenCookie(cookies: Cookies): void{
    cookies.set('rf_token', '', { maxAge: -1, path: '/'})
}

export const POST: RequestHandler = async ({locals, request, cookies}) => {
    let data = await request.json();

    if(data.user === CSGO_USER && data.pass === CSGO_PASS){
        let newAccessToken = jwt.sign({user: CSGO_USER}, JWT_ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
        return json({success: true, accessToken: newAccessToken }, {status: 200})
    }

    return InvalidRequest();

}