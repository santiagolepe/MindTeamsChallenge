"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const schemas_1 = require("../utils/schemas");
const account_1 = require("../controllers/account");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/accounts:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all accounts only super_admin and admin roles
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Account"
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), account_1.getAcounts);
/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get Account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Account"
 *       404:
 *         description: Account not found
 */
router.get("/:id", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), account_1.getAcount);
/**
 * @swagger
 * /api/v1/accounts:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new account only super_admin and admin roles
 *     tags: [Accounts]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Account"
 *           examples:
 *             account:
 *               value:
 *                 name: Tacos de Carnasa
 *                 client: Tacos el primo
 *                 responsible: 60c8f2f4c393e13e30d4c1f4
 *                 team: ["60c8f2f4c393e13e30d4c1f4"]
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Account"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), account_1.createAccount);
/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update an account only super_admin and admin roles
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Account"
 *           examples:
 *             account:
 *               value:
 *                 name: Tacos de Asada
 *                 client: Tacos el compa
 *                 responsible: 60c8f2f4c393e13e30d4c1f4
 *                 team: ["60c8f2f4c393e13e30d4c1f4"]
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Account"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */
router.put("/:id", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), account_1.updateAccount);
/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Delete an account only super_admin and admin roles
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */
router.delete("/:id", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), account_1.deleteAccount);
/**
 * @swagger
 * /api/v1/accounts/{id}/add-user/{userId}:
 *   patch:
 *     security:
 *       - BearerAuth: []
 *     summary: Add a user to an account's team only super_admin and admin roles
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
*       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User added to the account's team successfully  and tranfer log created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account or user not found
 */
router.patch("/:id/add-user/:userId", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), account_1.addUserAccount);
/**
 * @swagger
 * /api/v1/accounts/{id}/remove-user/{userId}:
 *   patch:
 *     security:
 *       - BearerAuth: []
 *     summary: Remove a user from an account's team only super_admin and admin roles
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
*       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User removed to the account's team successfully and tranfer log created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account or user not found
 */
router.patch("/:id/remove-user/:userId", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), account_1.removeUserAccount);
exports.default = router;
//# sourceMappingURL=account.js.map