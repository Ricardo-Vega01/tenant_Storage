import { Router } from "../../Config/router.config.js";
import { createUser } from "../../Controllers/Users/createuser.controller.js";
import { deleteUser } from "../../Controllers/Users/deleteUser.controller.js";
import { getUser } from "../../Controllers/Users/findUser.controller.js";
import { getAllUsers } from "../../Controllers/Users/getUsers.controller.js";
import { updateUser } from "../../Controllers/Users/updateUser.controller.js";
import { verifyUser } from "../../Middlewares/Users/verifyUser.middleware.js";

const users = Router();
users.get("/users", getAllUsers);
users.get("/users:id", getUser);
users.post("/users", verifyUser, createUser);
users.patch("/users", updateUser);
users.delete("/users:id", deleteUser);

export { users };
