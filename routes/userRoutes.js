import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST /api/users/register
router.post('/register', async (req, res) => {
  const { name, phone, password, type } = req.body;
  if (!name || !phone || !password || !type) {
    return res.status(400).json({ message: "Бүх талбарыг бөглөх ёстой" });
  }

  // хэрэглэгч өмнө нь бүртгэгдсэн эсэхийг шалгах
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res.status(400).json({ message: "Энэ дугаар аль хэдийн бүртгэгдсэн байна" });
  }

  const user = new User({ name, phone, password, type });
  await user.save();
  res.status(201).json({ message: "Амжилттай бүртгүүллээ!" });
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) return res.status(400).json({ error: "Phone болон password шаардлагатай" });

  const user = await User.findOne({ phone, password });
  if (!user) return res.status(401).json({ error: "Нууц үг эсвэл контакт буруу байна" });

  res.json({ message: "Амжилттай нэвтэрлээ", user });
});

export default router;
