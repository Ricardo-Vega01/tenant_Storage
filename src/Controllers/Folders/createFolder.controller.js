import { createFolderService } from "../../Services/Folder/createFolder.service.js";

export async function createFolderController(req, res) {
    try {
        const folder = await createFolderService({
            name: req.body.name,
            parentId: req.body.parentId || null,
            ownerId: req.user.id,
        });

        res.status(200).json(folder);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
