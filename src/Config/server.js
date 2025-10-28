import express, { json } from "express";
import { web } from "../Routes/Web/global.router.js";
import { ErrorHandler } from "../Middlewares/errorHandle.middleware.js";

const app = express();

app.use(json());

// General Web Routes
app.use('/',web)

// Middlewares Implements
app.use(ErrorHandler)

export {app}