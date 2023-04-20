import { Router } from "express";
import { authMiddleware, requireRole } from "../middlewares/auth";
import { 
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  getProfile
} from '../controllers/user'

const router = Router();

router.get("/profile", authMiddleware, getProfile);

router.get("/", authMiddleware, requireRole("admin", "super_admin"), getUsers);

router.post("/", authMiddleware, requireRole("admin", "super_admin"), createUser);

router.put("/:id", authMiddleware, requireRole("admin", "super_admin"), updateUser);

router.delete("/:id", authMiddleware, requireRole("admin", "super_admin"), deleteUser);

export default router;
