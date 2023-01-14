import { json, type Cookies, type RequestHandler } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_SECRET, CSGO_USER, CSGO_PASS } from "$env/static/private";
import { getUserById } from "$lib/services/users"
import { InvalidRequest } from "$lib/json_responses/responses";

export const POST: RequestHandler = async ({locals, request, cookies}) => {
    let data = await request.json();

    if(data.user === CSGO_USER && data.pass === CSGO_PASS){
        let newAccessToken = jwt.sign({username: CSGO_USER}, JWT_ACCESS_TOKEN_SECRET, {expiresIn: '3h'});
        return json({success: true, accessToken: newAccessToken }, {status: 200})
    }

    return InvalidRequest();

}