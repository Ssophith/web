import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* =====================
   REGISTER
===================== */
router.post("/register", async (req, res) => {
  const { name, phone, password, type } = req.body;

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res.status(400).json({ message: "Утасны дугаар бүртгэлтэй байна" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    phone,
    password: hashedPassword,
    type
  });

  res.json({ message: "Амжилттай бүртгэгдлээ" });
});

/* =====================
   LOGIN
===================== */
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Нууц үг буруу" });
  }

  res.json({
    message: "Login амжилттай",
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      type: user.type
    }
  });
});

export default router;
