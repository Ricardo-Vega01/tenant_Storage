import { PutObjectCommand } from "@aws-sdk/client-s3";
import { bucket, s3 } from "../../Config/bucket.config.js";
import { prisma } from "../../Database/client.js";
import { logAction } from "../Logs/action.service.js";

export async function createFolderService({ name, parentId, ownerId }) {
    const folder = await prisma.folder.create({
        data: {
            name,
            parentId,
            owner,
        },
    });

    // create a bucket prefix
    const key = `${folder.name}/.keep`;
    await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: "",
        }),
    );

    await logAction({
        userId: ownerId,
        action: "CREATE_FOLDER",
        resource: "folder",
        entityType: "Folder",
        entityId: folder.id,
    });

    return folder;
}
