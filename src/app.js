import { app } from "./Config/server.js";
import { shutdownSetup } from "./Database/Connection/prismaClose.js";
import { labels } from "./Utils/labels.js";

const port = process.env.APP_PORT || 5000

const server = app.listen(port, () => {
  try {
    console.log(`${labels.success.serverUp} port: ${port}`);
  } catch (err) {
    console.log(labels.error.deniedServer, err);
  }
});

shutdownSetup(server);
