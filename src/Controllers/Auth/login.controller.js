import { loginService } from "../../Services/Auth/login.service.js";

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const ipAdd = req.headers["x-forwarded-for"] || req.ip;
        const userAgent = req.headers["user-agent"];
        const deviceId = req.body.deviceId;

        const result = await loginService({
            email,
            password,
            ipAdd,
            userAgent,
            deviceId,
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}
