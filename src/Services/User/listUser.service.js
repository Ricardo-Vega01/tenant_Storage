import { prisma } from "../../Database/client.js";

export async function listUserService() {
    const users = await prisma.user.findMany();
    return users; 
}
