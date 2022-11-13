import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit"
import bcrypt from 'bcrypt'
import * as UsersService from '$lib/services/users'
import { InvalidToken, Success } from '$lib/json_responses/responses'

export const GET: RequestHandler = async function ({locals, request}){
    
    // get params from the get type request 
    let params: any = new URLSearchParams(request.url.split('?')[1]);
    
    let users = await UsersService.searchUserByUsername(params.get('query'), locals.supabase)
    if(users.error) return json({error: users.error.message}, {status: 500})

    return json({data: users.data}, {status: 200})
}

export const PATCH: RequestHandler = async function ({locals, request}){
    let { user } = locals;

    if(!user) return InvalidToken();

    let body = await request.json();
    let { username } = body;

    //validate username 
    if(username.length < 3) return json({error: 'Username must be at least 3 characters long.'}, {status: 400})
    if(username.length > 15) return json({error: 'Username must be less than 15 characters long.'}, {status: 400})

    //check if username is email regex 
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(emailRegex.test(username)) return json({error: 'Username cannot be an email.'}, {status: 400})

    //check if username is already taken

    let taken = await locals.supabase.from('users').select('*').eq('username', username);
    if(taken.error) throw new Error(taken.error.message)
    if(taken.data.length > 0) return json({error: 'Username is already taken.'}, {status: 400})


    let { data, error } = await UsersService.updateUser(user.id, {username: username}, locals.supabase);

    if(error) return json({error: error.message}, {status: 500});

    return json({data: data});
}

export const POST: RequestHandler = async function ({locals, request}){
    let { email, password } = await request.json();

    const hash = await bcrypt.hash(password, 10)

    let { data, error } = await locals.supabase.from('users').insert({
        email: email,
        password: hash
    });
    
    if(error?.message === 'duplicate key value violates unique constraint "users_email_key"'){
        return json({
            error: "Invalid form values.",
            fields: [{
                name: "email",
                message: "Email already exists."
            }]
        }, {
            status: 409
        })
    }

    if(error) {
        return json({
            error: "Error while creating user."
        }, {status: 500})
    }
    
    return json({success: true, message: 'User created'})
}