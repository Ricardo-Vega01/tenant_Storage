import { ErrorHandler } from "../Middlewares/Errors/errorHandle.middleware.js";
import { corsOptions } from "../Middlewares/Secure/CorsOptions.middleware.js";
import { web } from "../Routes/Web/global.router.js";
import express, { json } from "express";
import helmet from "helmet";
import cors from 'cors';
import 'dotenv/config';
import { users } from "../Routes/Api/users.router.js";

const app = express();

app.use(json());

// General Web Routes
app.use('/',web)

// Api Router
app.use('/api/v1/user', users);

// Middlewares Implements
app.use(ErrorHandler)
app.use(helmet())
app.use(cors(corsOptions));


export {app}