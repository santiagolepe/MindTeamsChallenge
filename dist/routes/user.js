"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const schemas_1 = require("../utils/schemas");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
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
router.get("/profile", auth_1.authMiddleware, user_1.getProfile);
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
router.get("/:id", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), user_1.getUser);
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
router.get("/", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), user_1.getUsers);
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
router.post("/", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), user_1.createUser);
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
router.put("/:id", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), user_1.updateUser);
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
router.delete("/:id", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map