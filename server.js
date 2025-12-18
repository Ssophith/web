import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "frontend", "src")));

// Routes
app.use("/auth", authRoutes);

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "src", "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
