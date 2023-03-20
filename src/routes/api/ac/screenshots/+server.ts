import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { aws } from '$lib/services/aws';

export const POST: RequestHandler = async function ({locals, request, cookies}){

    const s3 = aws.getS3();

    let { user, supabase } = locals;

    //TODO: remove break
    return json({});
    let { image } = await request.json();

    const buffer = Buffer.from(image);

    let fileName = user?.username + '-' + Date.now() + '.png';

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

    return json({});
};