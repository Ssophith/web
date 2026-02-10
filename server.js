import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
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
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

/* =======================
   FRONTEND STATIC
======================= */
app.use(express.static(path.join(__dirname, "frontend", "src")));

/* =======================
   SPA FALLBACK (Express 5 safe)
======================= */
app.get(/.*/, (req, res) => {

  // API route биш бол frontend index.html өгнө
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API endpoint олдсонгүй" });
  }

  res.sendFile(
    path.join(__dirname, "frontend", "src", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
