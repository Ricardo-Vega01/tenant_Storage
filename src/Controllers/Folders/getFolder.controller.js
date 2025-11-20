import { listFolderService } from "../../Services/Folder/listFolder.service.js";

export async function getFolderController(req, res) {
    try {
        const folders = await listFolderService({
            parentId: req.query.parentId || null,
            ownerId: req.user.id,
        });

        res.json(folders);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
