import { Router } from "../../Config/router.config.js";
import { loginController } from "../../Controllers/Auth/login.controller.js";
import { logoutController } from "../../Controllers/Auth/logout.controller.js";
import { refreshController } from "../../Controllers/Auth/refresh.controller.js";

export const login = Router();

// Define route for user access

login.post("/login", loginController);
login.post("/logout", logoutController);
login.post("/refresh", refreshController);

/**
 * Before pass to production add auth middleware for protected routes 
 */