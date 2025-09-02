import { Request, Response } from "express";

export const buyStock = async (req: Request, res: Response) => {
  try {
    const theStock = req.body;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
