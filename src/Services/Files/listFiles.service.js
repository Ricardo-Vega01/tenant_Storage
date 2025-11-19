
import { bucket, s3 } from "../../Config/bucket.config.js";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function listFilesService({ folder }) {
    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: folder
    });

    const response = await s3.send(command);
    return response.Contents?.map(item => item.Key) || [];
}