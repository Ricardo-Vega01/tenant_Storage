import { StorageService } from "../../Services/Storage/actionBucket.service.js";
import { tenantManager } from "../../Services/Tenants/manager.service.js";

const storage = new StorageService();
export const ListFolders = async (req, res) => {
    try {
        const {slug, dbUrl, id: tenant} = req.tenant;

        const prisma = tenantManager.getClient(dbUrl);

        const folder = await prisma.folder.findMany();

        await storage.get

    } catch (error) {
        console.error("Fail to list folders", error);
        res.status(500).json({error: "Folders no exist"})
    }
}