import { s3, bucket } from "../../Config/s3.config.js";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { actionLog } from "../../Utils/actionLog.js";

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

        await actionLog({
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