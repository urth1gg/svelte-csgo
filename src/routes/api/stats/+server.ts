import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async function ({locals, request, cookies}){
    return json({success: true}, {status: 200})
}