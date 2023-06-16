"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const schemas_1 = require("../utils/schemas");
const transfer_1 = require("../controllers/transfer");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/transfers:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Filter transfers by account, user, started_at, and ended_at only super_admin and admin role
 *     tags: [Transfers]
 *     parameters:
 *       - in: query
 *         name: account
 *         schema:
 *           type: string
 *         required: false
 *         description: Account ID
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         required: false
 *         description: User ID
 *       - in: query
 *         name: started_at
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Start date (inclusive)
 *       - in: query
 *         name: ended_at
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: End date (inclusive)
 *     responses:
 *       200:
 *         description: Filtered transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Transfer"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth_1.authMiddleware, (0, auth_1.requireRole)(schemas_1.Roles.admin, schemas_1.Roles.super_admin), transfer_1.getTransfer);
exports.default = router;
//# sourceMappingURL=transfer.js.map