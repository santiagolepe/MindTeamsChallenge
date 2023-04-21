import { Router } from "express";
import { authMiddleware, requireRole } from "../middlewares/auth";
import { Roles } from "../utils/schemas"; 
import { getTransfer } from "../controllers/transfer";

const router = Router();

// get transfer logs
router.get("/filter", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getTransfer);

export default router;
