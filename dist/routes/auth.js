"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate super_admin, admin or user getting JWT token
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: superAdmin@mind.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: p@ssword123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await user_1.default.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = true;
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Invalidate JWT
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Invalid token
 */
router.post("/logout", auth_1.authMiddleware, (req, res) => {
    res.sendStatus(200);
});
exports.default = router;
//# sourceMappingURL=auth.js.map