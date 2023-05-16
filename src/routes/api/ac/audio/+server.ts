import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { aws } from '$lib/services/aws';

export const GET: RequestHandler = async function ({locals, request, cookies}){

    let { user, supabase } = locals;

    return json({});

    const s3 = aws.getS3();
    
    let { audio } = await request.json();

    const buffer = Buffer.from(audio);

    let fileName = user?.username + '-' + Date.now() + '.mp3';

    const params = {
        Bucket: "upload-screenshot-1ec9ifkweu5efds9x7iibhstiwrooeuc1a-s3alias",
        Key: fileName,
        Body: buffer
    };

    try {
        await s3.putObject(params)
        console.log("File uploaded successfully.");
    } catch (error: any) {
        console.error("Error uploading file: ", error);
        return json({ message: error.message });
    }
};