import { Schema, model, connect } from "mongoose";
import dotenv from "dotenv";

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

//1) Create s Schema corresponding to the document interface.
const stockSchema = new Schema({
  symbol: { type: String, required: true, uppercase: true },
  name: {
    type: String,
    required: true,
    set: (word: string) => {
      if (!word) return word;
      return word[0]?.toUpperCase() + word.slice(1);
    },
  },
  price: {
    type: Number,
    required: true,
    set: (sign: string | number) => {
      if (typeof sign === "string") {
        // Remove dollar sign and convert to number
        return Number(sign.replace(/[^\d.]/g, ""));
      }
      return sign;
    },
  },
  volume: {
    type: Number,
    required: true,
    set: (word: string | number) => {
      if (typeof word === "string") {
        // Convert "100M" to 100000000, "4.3M" to 4300000, etc.
        const match = word.match(/([\d.]+)([MK]?)/);
        if (!match) return Number(word);
        let num = Number(match[1]);
        if (match[2] === "M") num *= 1000000;
        if (match[2] === "K") num *= 1000;
        return num;
      }
      return word;
    },
  },
});

const Stock = model("Stock", stockSchema);
export default Stock;
