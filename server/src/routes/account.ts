import { Router } from "express";
import { authMiddleware, requireRole } from "../middlewares/auth";
import { Roles } from "../utils/schemas";
import { 
  getAcounts, 
  getAcount,
  createAccount,
  updateAccount,
  deleteAccount,
  addUserAccount,
  removeUserAccount
} from "../controllers/account";

const router = Router();

// Get all accounts
router.get("/", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getAcounts);

// Get account by ID
router.get("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getAcount);

// Create a new account
router.post("/", authMiddleware, requireRole(Roles.admin, Roles.super_admin), createAccount);

// Update an account
router.put("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), updateAccount);

// Delete an account
router.delete("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), deleteAccount);

// Add a user to an account's team
router.patch("/:id/add-user/:userId", authMiddleware, requireRole(Roles.admin, Roles.super_admin), addUserAccount);

// Remove a user to an account's team
router.patch("/:id/remove-user/:userId", authMiddleware, requireRole(Roles.admin, Roles.super_admin), removeUserAccount);

export default router;
