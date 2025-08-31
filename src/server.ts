import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

// DB connection
const DATABASE_URL = process.env.DATABASE;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

if (!DATABASE_URL) {
  console.error("DATABASE environment variable is not defined!");
  process.exit(1);
}

if (!DATABASE_PASSWORD) {
  console.error("DATABASE_PASSWORD environment variable is not defined!");
  process.exit(1);
}

const DB = DATABASE_URL.replace("<PASSWORD>", DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
