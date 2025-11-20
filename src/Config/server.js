import { ErrorHandler } from "../Middlewares/Errors/errorHandle.middleware.js";
import { corsOptions } from "../Middlewares/Secure/CorsOptions.middleware.js";
import { web } from "../Routes/Web/global.router.js";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import { users } from "../Routes/Api/users.router.js";
import { login } from "../Routes/Api/login.router.js";
import { filesRouter } from "../Routes/Api/files.router.js";
import { sessionCleaner } from "../Helpers/Job/cleanSession.helper.js";
import { foldersRouter } from "../Routes/Api/folder.router.js";

export const app = express();

app.use(json());
// Read special characters
app.use(express.json({ encoding: "utf-8" }));
app.use(express.urlencoded({ extended: true }));

// General Web Routes
app.use("/", web);

// Api Router
app.use("/api/v1", [users, filesRouter, foldersRouter]);
app.use("/auth", login);
// Middlewares Implements
app.use(ErrorHandler);
app.use(helmet());
app.use(cors(corsOptions));

// catch ipAdd
app.set("trust proxy", true);

// Cron init
sessionCleaner();
