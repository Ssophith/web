import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

  // Password-ийг hash хийх
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, phone, password: hashedPassword, type });
  await user.save();
  res.status(201).json({ message: "Амжилттай бүртгүүллээ!" });
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) return res.status(400).json({ error: "Phone болон password шаардлагатай" });

  const user = await User.findOne({ phone });
  if (!user) return res.status(401).json({ error: "Нууц үг эсвэл контакт буруу байна" });

  // Password-ийг шалгах - hash хийгдсэн эсвэл шууд байж болно
  let isMatch = false;
  try {
    if (user.password && user.password.startsWith("$2")) {
      // bcrypt hash (эхлэлд $2 байна)
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Шууд password (хуучин бүртгэл - hash хийгдээгүй)
      isMatch = user.password === password;
    }
  } catch (err) {
    console.error("Password шалгахад алдаа:", err);
    return res.status(500).json({ error: "Сервер дээр алдаа гарлаа" });
  }

  if (!isMatch) return res.status(401).json({ error: "Нууц үг эсвэл контакт буруу байна" });

  // 🔐 TOKEN ҮҮСГЭХ
  const token = jwt.sign(
    {
      id: user._id,
      phone: user.phone,
      type: user.type
    },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" }
  );

  res.json({
    message: "Амжилттай нэвтэрлээ",
    token, // 👈 frontend хадгална
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      type: user.type
    }
  });
});

// GET /api/users/:id - Нэг хэрэглэгчийн мэдээлэл авах
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/:id - Хэрэглэгчийн мэдээлэл засах
router.put("/:id", async (req, res) => {
  try {
    const { name, type, age, gender, height, introduction, experience, addition, bankaccount } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    // Зөвхөн өөрчлөгдсөн талбаруудыг шинэчлэх
    if (name !== undefined) user.name = name;
    if (type !== undefined) user.type = type;
    if (age !== undefined) user.age = age;
    if (gender !== undefined) user.gender = gender;
    if (height !== undefined) user.height = height;
    if (introduction !== undefined) user.introduction = introduction;
    if (experience !== undefined) user.experience = experience;
    if (addition !== undefined) user.addition = addition;
    if (bankaccount !== undefined) user.bankaccount = bankaccount;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
