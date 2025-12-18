import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   MONGODB CONNECTION
======================= */
mongoose.connect("mongodb://127.0.0.1:27017/JobPortal")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* =======================
   API ROUTES
======================= */
// routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

/* =======================
   FRONTEND STATIC
======================= */
app.use(express.static(path.join(__dirname, "frontend", "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "src", "index.html"));
});

/* =======================
   SERVER START
======================= */
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
