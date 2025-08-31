import { Request, Response } from "express";
import stocks from "../data/stock.js";

// Create a new user
export const createUser = async (req00: Request, res: Response) => {
  try {
    // Check if stocks exist
    if (stocks && stocks.length > 0) {
      // If stocks exist, continue with existing code
      const word = "Hello World";
      res.status(200).render("home", { stocks: stocks });
    } else {
      // If stocks don't exist, execute alternative code
      const errorMessage = "No stock data available";
      res.status(404).json({ message: errorMessage });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
