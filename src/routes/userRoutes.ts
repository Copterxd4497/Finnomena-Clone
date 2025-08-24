import { Router } from "express";
import { createUser } from "../controllers/userControllers.js";

const router = Router();

router.get("/", createUser);

export default router;
