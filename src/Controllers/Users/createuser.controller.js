import { createUserService } from "../../Services/User/createUser.service.js";

async function createUser(req, res) {
    try {
        const { email, name, password, role } = req.body;
        const createdBy = req.user.id;

        const newUser = await createUserService({
            email,
            name,
            password,
            role,
            createdBy,
        });

        return res.status(200).json({ user: newUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export { createUser };
