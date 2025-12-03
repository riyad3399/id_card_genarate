/* eslint-disable no-undef */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const instituteRoutes = require("./routes/instituteRoutes");
const studentRoutes = require("./routes/studentRoutes");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Ensure upload folders exist
const uploadDirs = ["uploads", "uploads/logos", "uploads/signature"];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created folder: ${dir}`);
  }
});

// 📌 Static public file access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 📌 API Routes
app.use("/api/institutes", instituteRoutes);
app.use("/api/students", studentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
