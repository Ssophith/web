import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  salary: String,
  JobCategory: String,
  jobType: String,
  location: String,
  workDate: String,
  workTime: String,
  requiredWorkers: Number,
  hiredWorkers: Number,
  age: String,
  gender: String,
  experience: String,
  clothes: String,
  otherRequirements: String,
  food: String,
  transport: String,
  note: String
});

export default mongoose.model("Job", JobSchema);
