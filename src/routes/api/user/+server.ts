import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit"
import bcrypt from 'bcrypt'

export const GET: RequestHandler = async function ({locals}){
    return new Response('Hello World!');
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

    if(error) throw new Error(error.message)
    
    return json({success: true, message: 'User created'})
}