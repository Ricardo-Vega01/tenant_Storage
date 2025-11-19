import { uploadFileService } from "../../Services/Files/uploadFile.service.js";

export async function uploadFileController(req, res) {
    try {
        const { file } = req;
        const { folder } = req.body.folder;
        const result = await uploadFileService({ file, folder });

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}