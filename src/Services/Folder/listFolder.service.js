import { prisma } from "../../Database/client.js";
import { logAction } from "../Logs/action.service.js";

export async function listFolderService({parentId, ownerId}) {
    const folders = await prisma.folder.findMany({
        where: {parentId, ownerId},
        include: {children: true}
    });

    // add log after to action
    await logAction({
        userId: ownerId,
        action: "LIST_FOLDER",
        resource: "folder",
        entityType: "Folder",
        entityId: parentId || "root"
    });

    return folders;
}