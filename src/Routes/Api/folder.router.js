import { Router } from "../../Config/router.config.js";
import { createFolderController } from "../../Controllers/Folders/createFolder.controller.js";
import { deleteFolderController } from "../../Controllers/Folders/deleteFolder.controller.js";
import { getFolderController } from "../../Controllers/Folders/getFolder.controller.js";
import { updateFolderController } from "../../Controllers/Folders/updateFolder.controller.js";

export const foldersRouter = Router();

foldersRouter.post("/folders", createFolderController);
foldersRouter.get("/folders", getFolderController);
foldersRouter.put("/folders:id", updateFolderController);
foldersRouter.delete("/folders:id", deleteFolderController);
