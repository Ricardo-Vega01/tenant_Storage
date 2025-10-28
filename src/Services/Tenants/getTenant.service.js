import { PrismaClient } from "@prisma/client";
const clients = new Map();

export const getTenantService = (dbUrl) => {
  if (clients.has(dbUrl)) return clients.get(dbUrl);

  const prisma = new PrismaClient({
    datasources: { db: { url: dbUrl } },
  });

  clients.set(dbUrl, prisma);
  return prisma;
};
