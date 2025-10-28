import { labels } from "../../Utils/labels.js";
import prisma from "./prismaInit.js";

export const shutdownSetup = (server) => {
    const shutdown = async () => {
        console.log('close and dissconected prisma server');
        try{
            await prisma.$disconnect();
            server.close(()=>{
                console.log('Discconected ok, Bye');
                process.exit(0);
            })
        }catch(error){
            console.error(labels.error.dbClose, error);
            process.exit(1);
        }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}