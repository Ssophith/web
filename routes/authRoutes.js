import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { name, type, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ error: 'Дугаар аль хэдийн бүртгэлтэй байна' });

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, type, phone, password: hashedPassword});
    await newUser.save();

    res.json({ message: 'Бүртгэл амжилттай' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: 'Дугаар эсвэл нууц үг буруу' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Дугаар эсвэл нууц үг буруу' });

    res.json({ message: 'Амжилттай нэвтэрлээ', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
