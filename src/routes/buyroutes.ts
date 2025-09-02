import { Router } from "express";
import { buyStock } from "../controllers/buyController.js";

const router = Router();
router.post("/:id", buyStock);

export default router;
