import type { RequestHandler } from "@sveltejs/kit";
import { InvalidRequest, Success } from "$lib/json_responses/responses";

export const POST: RequestHandler = async function ({locals, params}){
 
    let { user } = locals;

    if(!user){
        return InvalidRequest()
    }

    return Success();
}