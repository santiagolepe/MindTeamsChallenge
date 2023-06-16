import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { authMiddleware } from "../middlewares/auth";
import bcrypt from "bcrypt";

const router = Router();

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

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });

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
router.post("/logout", authMiddleware, (req, res) => {
  res.sendStatus(200);
});

export default router;