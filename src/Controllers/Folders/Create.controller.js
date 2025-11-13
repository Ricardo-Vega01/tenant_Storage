import { StorageService } from "../../Services/Storage/actionBucket.service.js";
import { tenantManager } from "../../Services/Tenants/manager.service.js";

const storage = new StorageService();

export const CreateFolder = async (req, res) => {
    try {
        const { slug, dbUrl, id: tenantId } = req.tenant;
        const { name, parentId } = req.body;
        const ownerId = req.user.id;

        if (!name) {
            return res.status(400).json({
                error: "The folder name is required",
            });
        }

        const prisma = tenantManager.getClient(dbUrl);
        const folder = await prisma.folder.create({
            data: {
                name,
                parentId,
                ownerId,
                tenantId,
            },
        });

        await storage.createFolderService(slug, folder.id);

        res.status(201).json({ folder });
    } catch (error) {
        console.error("Error to create a new folder", error);
        res.status(500).json({ error: "Folder no created" });
    }
};
