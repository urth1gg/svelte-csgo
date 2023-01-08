import {json, type RequestHandler } from "@sveltejs/kit";
import aws from '$lib/services/aws';
import { signToken } from "$utils/auth/signToken";

export const GET: RequestHandler = async function ({locals, request}){

    // let payload = { user_id: "admin" };

    // let token = signToken(payload);

    // if(!token) return json({});

    // aws.startInstance(token);
    return json({});
}