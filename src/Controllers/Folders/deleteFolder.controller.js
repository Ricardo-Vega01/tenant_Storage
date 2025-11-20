import { deleteFolderService } from "../../Services/Folder/deleteFolder.service.js";

export async function deleteFolderController(req, res) {
  try {
    const result = await deleteFolderService({
      id: req.params.id,
      ownerId: req.user.id,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}