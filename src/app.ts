import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(bodyParser.json());

// Default route
app.use("/", userRoutes);

export default app;
