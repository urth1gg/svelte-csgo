import { S3Client } from '@aws-sdk/client-s3';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async function ({locals, request, cookies}){

    let { user, supabase } = locals;

    return json({});
};