import { s3, bucket } from "../../Config/bucket.config.js";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { logAction } from "../Logs/action.service.js";


export async function deleteFilesService({ keys, userId }) {

    if (!keys || keys.length === 0) throw new Error("Keys are required");

    const command = new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
            Objects: keys.map(k => ({ Key: k })),
        },
    });

    try {
        await s3.send(command);

        await logAction({
            userId,
            action: "DELETE_FILE",
            resource: "file",
            entityType: "File",
            entityId: keys.join(","),
        });

        return { message: "File deleted successfully" };
    } catch (error) {
        throw new Error(`Error deleting file: ${error.message}`);
    }
}