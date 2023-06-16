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

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 */
router.get("/", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getUsers);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new user only super_admin and admin
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *           examples:
 *             user:
 *               value:
 *                 name: Octavio Santiago
 *                 email: osantiago@mind.com
 *                 password: p@ssword123
 *                 role: user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, requireRole(Roles.admin, Roles.super_admin), createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update a user only super_admin and admin
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
*           examples:
 *             user:
 *               value:
 *                 name: Octavio
 *                 email: octavio@mind.com
 *                 password: p@ssword123
 *                 role: admin
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Delete a user only spuer_admin and admin
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete("/:id", authMiddleware, requireRole(Roles.admin, Roles.super_admin), deleteUser);

export default router;
