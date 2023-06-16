import { Router } from "express";
import { authMiddleware, requireRole } from "../middlewares/auth";
import { Roles } from "../utils/schemas"; 
import { getTransfer } from "../controllers/transfer";

const router = Router();

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
router.get("/", authMiddleware, requireRole(Roles.admin, Roles.super_admin), getTransfer);

export default router;
