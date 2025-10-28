import { getTenantService } from "../../Services/Tenants/getTenant.service.js";
import { hashPassword } from "../../Utils/Auth/hashPass.util.js";

export const createUserController = async (req, res) => {
  const prisma = getTenantService(req.tenant.dbUrl);
  const { name, email, password, role = "user" } = req.body;

  try {
    const passwordHash = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear el usuario: ", error);
    res.status(500).json({ error: "No es posible crear el usuario" });
  }
};
