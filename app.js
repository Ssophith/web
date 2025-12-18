import mongoose from "mongoose";
import User from "./models/User.js";
import Job from "./models/Job.js";

await mongoose.connect("mongodb://127.0.0.1:27017/JobPortal");

  await User.deleteMany();
  await Job.deleteMany();

  const users = await User.insertMany([
    {
      name: "Солонго",
      type: "Хувь хүн",
      phone: "99999999",
      password: "soko0515",
      age: 28,
      gender: "Эмэгтэй",
      height: 165,
      introduction: "Хариуцлагатай, хурдан хөдөлгөөнтэй",
      experience: "2 жил газар шорооны ажил хийсэн",
      addition: "Ажлын хувцас, хэрэгсэлтэй",
      profileImg: "solongo.png",
      bankaccount: "5690000002",
    },
    {
      name: "Уул, ус",
      type: "Байгууллага",
      phone: "88888888",
      password: "soko0515",
      age: null,
      gender: null,
      height: null,
      ability: null,
      introduction:
        "Барилгын дараах цэвэрлэгээ үйлчилгээ үзүүлдэг байгууллага.",
      experience: "2 жил",
      addition: "Ажлын хувцас, хэрэгсэлтэй",
      profileImg: "bat.png",
      bankaccount: "56900000002",
    },
  ]);
  console.log(users);

  await Job.insertMany([
    {
      userId: users[0]._id,
      title: "Газар ухна",
      salary: "80000₮",
      JobCategory: "Газар шороо",
      jobType: "Бүтэн цаг",
      location: "Сүхбаатар дүүрэг",
      workDate: "2025-11-02",
      workTime: "09:00 - 18:00",
      requiredWorkers: 5,
      hiredWorkers: 2,
      age: "18-35",
      gender: "Эрэгтэй",
      experience: "Туршлага шаардахгүй",
      clothes: "Ажлын бээлий, ботинк",
      otherRequirements: "Хариуцлагатай",
      food: "Өдрийн 1 хоолтой",
      transport: "Унааны мөнгө олгоно",
      note: "Ажил энгийн",
    },
  ]);

  console.log("Data inserted");
  process.exit();

