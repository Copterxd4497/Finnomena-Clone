import app from "./app.js";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();
const PORT = process.env.PORT || 3000;

async function boostrap() {
  if (!process.env.DATABASE_URL || !process.env.DATABASE_NAME) {
    throw new Error("Cannot read environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

boostrap();
