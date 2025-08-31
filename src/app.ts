import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";

const app = express();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setting Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

// Middleware
app.use(bodyParser.json());

// Static files
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
9;
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Default route
app.use("/", userRoutes);

export default app;
