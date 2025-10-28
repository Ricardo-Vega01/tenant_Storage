import { Router } from "../../Config/router.config.js";

const web = Router();

web.get("/", (req, res) => {
    res.json({message: "Welcome"})
});

export {web}
