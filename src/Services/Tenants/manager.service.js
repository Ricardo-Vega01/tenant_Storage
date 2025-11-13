import prisma from "../../Database/Connection/prismaInit.js";

class TenantManager {
    constructor() {
        this.clients = new Map();
    }

    getClient(dbUrl) {
        if (!dbUrl) {
            throw new Error("dbUrl requerido para obtener PrismaClient");
        }

        if (this.clients.has(dbUrl)) {
            return this.clients.get(dbUrl);
        }

        prisma({
            datasources: {
                db: { url: dbUrl },
            },
        });

        this.clients.set(dbUrl, prisma);
        return prisma;
    }

    async disconnectAll() {
        for (const [dbUrl, prisma] of this.clients.entries()) {
            try {
                await prisma.$disconnect();
                console.log(`Desconectado de la base de datos: ${dbUrl}`);
            } catch (error) {
                console.error(
                    `Error al desconectar de la base de datos ${dbUrl}:`,
                    error,
                );
            }
        }
    }
}

export const tenantManager = new TenantManager();
