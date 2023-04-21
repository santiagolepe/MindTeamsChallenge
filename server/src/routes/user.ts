import { Router } from "express";
import { authMiddleware, requireRole } from "../middlewares/auth";
import { Roles } from '../utils/schemas'
import { 
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  getProfile,
  getUser
} from '../controllers/user'

const router = Router();

router.get("/profile", authMiddleware, getProfile);

router.get("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getUser);

router.get("/", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getUsers);

router.post("/", authMiddleware, requireRole(Roles.admin, Roles.super_admin), createUser);

router.put("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), updateUser);

router.delete("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), deleteUser);

export default router;
