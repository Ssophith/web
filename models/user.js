import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["Хувь хүн", "Байгууллага"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
    age: Number,
  gender: String,
  height: Number,
  introduction: String,
  experience: String,
  addition: String,
  profileImg: String,
  bankaccount: String,
});

export default mongoose.model("User", UserSchema);
