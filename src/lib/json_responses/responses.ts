import { json } from "@sveltejs/kit";

function InvalidToken(){
    return json({error: 'Invalid token'}, {status: 401})
}

function Success(){
    return json({success: true}, {status: 200})
}

function InvalidRequest(){
    return json({error: 'Invalid request'}, {status: 400})
}

export { InvalidToken, Success, InvalidRequest }