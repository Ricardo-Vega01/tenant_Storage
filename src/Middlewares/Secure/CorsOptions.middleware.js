import { labels } from "../../Utils/labels.js";

// Sites whit access config
const allowedOrigins = ["*"];

// Access Options

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(labels.error.deniedCors));
    }
  },
  credentials: true,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
};
