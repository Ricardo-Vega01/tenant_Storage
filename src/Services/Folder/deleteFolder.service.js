import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { bucket, s3 } from "../../Config/bucket.config.js";
import { prisma } from "../../Database/client.js";

export async function deleteFolderService({ id, ownerId }) {
    await prisma.folder.delete({ where: { id } });

    const prefix = `${id}/`;
    const list = await s3.send({
        Bucket: bucket,
        Prefix: prefix,
    });

    if (list.Contents?.length) {
        const command = new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: { Objects: list.Contents.map((obj) => ({ Key: obj.Key })) },
        });
        await s3.send(command);
    }

    await actionLog({
        userId: ownerId,
        action: "DELETE_FOLDER",
        entityType: "Folder",
        entityId: id,
    });

    return { message: "Folder deleted successfully" };
}
