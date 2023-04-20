import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { authMiddleware } from "../middlewares/auth";
import bcrypt from "bcrypt";

const router = Router();

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

router.post("/logout", authMiddleware, (req, res) => {
  res.sendStatus(200);
});

export default router;