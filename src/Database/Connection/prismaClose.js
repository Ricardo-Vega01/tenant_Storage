import { tenantManager } from "../../Services/Tenants/manager.service.js";

export const shutdownSetup = (server) => {
  const shutdown = async () => {
    console.log("Cerrando servidor y desconectando Prisma...");
    try {
      await tenantManager.disconnectAll();
      server.close(() => {
        console.log("Servidor cerrado correctamente");
        process.exit(0);
      });
    } catch (error) {
      console.error("Error al cerrar conexiones:", error);
      process.exit(1);
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};