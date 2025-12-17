import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  type: { type: String, enum: ['Хувь хүн', 'Байгууллага'], required: true },
  age: Number,
  gender: String,
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  height: Number,
  ability: String,
  experience: String,
  addition: String,
  profileImg: String,
  bankaccount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
