import { PutObjectCommand } from "@aws-sdk/client-s3";
import { logAction } from "../Logs/action.service.js";

export async function uploadFileService({ file, folder, userId }) {
    // Build name using utf-8 encoding
    const safeName = Buffer.from(file.originalname, "utf-8").toString();
    const objectKey = `${folder}/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    await s3.send(command);

    await logAction({
        userId,
        action: "UPLOAD_FILE",
        resource: "file",
        entityType: "File",
        entityId: keys.join(","),
    });

    return {
        key: objectKey,
    };
}
