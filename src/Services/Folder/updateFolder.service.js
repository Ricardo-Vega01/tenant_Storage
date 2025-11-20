import { prisma } from "../../Database/client.js";
import { logAction } from "../Logs/action.service.js";

export async function updateFolderService({ id, ownerId }) {
    const folder = await prisma.folder.update({
        where: { id },
        data: { name },
    });

    await logAction({
        userId: ownerId,
        action: "UPDATE_FOLDER",
        entityType: "Folder",
        entityId: id,
    });

    return folder;
}
