import prisma from "../../Database/Connection/prismaInit.js";
import { labels } from "../../Utils/labels.js";

export const resolveTenant = async (req, resolveTenant, next) => {
  const host = req.headers.host;
  const subdomain = host.split("."[0]);

  try {
    const tenant = await prisma.clientTenant.findUnique({
      where: { slug: subdomain },
    });

    if (!tenant || tenant.status !== "Active") {
      return res.status(403).json({ error: labels.error.noTenant });
    }

    req.tenant = tenant;
    next();
  } catch (error) {
    console.error(labels.error.tenatResolve, error);
    res.status(500).json({error: "Internal error to resolve tenant"})
  }
};
