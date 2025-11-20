import { deleteFilesService } from "../../Services/Files/deleteFiles.service.js";

export async function deleteFileController(req, res) {
    try {
        const userId = req.user?.id || req.body.userId;
        const { keys } = req.body;
        const file = await deleteFilesService({
            keys,
            userId,
        });

        return res.status(200).json({ success: true, ...file });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}
