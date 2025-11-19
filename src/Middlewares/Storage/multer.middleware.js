import multer from "multer";

// save in memory before send to bucket
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 50, // 50MB
    },
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Tipo de archivo no permitido"), false);
        } else {
            return cb(null, true);
        }
    },
}); 