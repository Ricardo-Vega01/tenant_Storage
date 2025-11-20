import { updateFolderService } from "../../Services/Folder/updateFolder.service.js";

export async function updateFolderController(req, res) {
  try {
    const folder = await updateFolderService({
      id: req.params.id,
      name: req.body.name,
      ownerId: req.user.id,
    });
    res.json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}