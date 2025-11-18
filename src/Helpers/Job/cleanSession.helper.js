import cron from "node-cron";
import { cleanExpiredSessions } from "../../Services/Session/session.service.js";


export function sessionCleaner() {
    cron.schedule("0 0 * * *", async () => {
        await cleanExpiredSessions();
        console.log("Las sesiones expiradas, han sido eliminadas");
    });
}
