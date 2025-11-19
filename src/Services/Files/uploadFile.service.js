
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFileService({ file, folder }) {
    // Build name using utf-8 encoding
    const safeName = Buffer.from(file.originalname, 'utf-8').toString();
    const objectKey = `${folder}/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: file.buffer,
        ContentType: file.mimetype
    });

    await s3.send(command);

    return {
        key: objectKey,
    }
}