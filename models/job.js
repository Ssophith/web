import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  id: Number,
  userId: Number,
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

const Job = mongoose.model('Job', jobSchema);
export default Job;
