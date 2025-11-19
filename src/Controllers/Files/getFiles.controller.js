import { listFilesService } from "../../Services/Files/listFiles.service.js";

export async function getFilesController(req, res) {
    try {
        const { folder } = req.query;
        const files = await listFilesService({ folder });
        return res.status(200).json(files);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}