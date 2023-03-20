import { json, type RequestHandler } from "@sveltejs/kit";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { errorInvalidFormMessage } from "../../../../utils/invalidFormValues";
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from "$env/static/private";

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
        steam_id: data[0].steam_id,
    }

    if(!match){
        let { response, headers } = errorInvalidFormMessage(
                [
                    {name: 'password', message: 'Email and/or password is incorrect.'}
                ], 401
            );

        return json(response, headers)
    }


    let accessToken = jwt.sign(obj, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '30d' })
    
    return json({success:true, accessToken}, { status: 200})
}