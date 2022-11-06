import{ json, type RequestHandler } from "@sveltejs/kit";
import { decodeToken } from "../../../utils/auth/decodeToken";

export const GET: RequestHandler = async function ({locals, request, cookies}){
    
    return json({success: true}, {status: 200})
}

export const POST: RequestHandler = async function ({locals, request, cookies}){

    return json({success: true}, {status: 200})
}
