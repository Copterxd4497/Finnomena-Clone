import { Request, Response } from "express";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const word = "Hello World";
    res.status(201).json(word);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
