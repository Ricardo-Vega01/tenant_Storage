import { Router } from "../../Config/router.config.js";
import { upload } from "../../Middlewares/Storage/multer.middleware.js";
import { uploadFileController } from "../../Controllers/Files/uploadFile.controller.js";
import { getFilesController } from "../../Controllers/Files/getFiles.controller.js";

export const filesRouter = Router();

filesRouter.post("/uploadfile", upload.single("file"), uploadFileController);
filesRouter.get("/files", getFilesController);