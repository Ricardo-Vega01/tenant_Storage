import { Router } from "../../Config/router.config.js";
import { createUserController } from "../../Controllers/Users/create.controller.js";
import { deleteUser } from "../../Controllers/Users/delete.controller.js";
import { getUserById } from "../../Controllers/Users/findById.controller.js";
import { getAllUsers } from "../../Controllers/Users/getAll.controller.js";
import { updateUser } from "../../Controllers/Users/update.controller.js";
import { authMiddle } from "../../Middlewares/Auth/auth.middle.js";

const users = Router();

//users.use(authMiddle);

users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.put('/:id', updateUser);
users.delete('/:id', deleteUser);
users.post('/', createUserController);

export {users}