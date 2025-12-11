/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");


// Ensure upload folders exist
const csvDir = path.join(__dirname, "..", "uploads", "csvs");
const studentDir = path.join(__dirname, "..", "uploads", "students");

if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir, { recursive: true });
if (!fs.existsSync(studentDir)) fs.mkdirSync(studentDir, { recursive: true });

const {
  createStudent,
  getStudents,
  bulkCreateStudents,
} = require("../controllers/studentController");

// ------------------- Multer storages -------------------

// student photo storage
const studentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "students"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});
const uploadStudent = multer({ storage: studentStorage });

// CSV storage (for bulk upload)
const csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "csvs"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const uploadCSV = multer({
  storage: csvStorage,
  fileFilter: (req, file, cb) => {
    // accept only csv / text files
    const allowed = [".csv", ".txt"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) return cb(null, true);
    cb(new Error("Only CSV files are allowed"));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit (adjust if needed)
});

// ------------------- Routes -------------------

// ADD STUDENT (single) — supports photo upload (field name: 'photo')
router.post(
  "/add",
  uploadStudent.fields([{ name: "photo", maxCount: 1 }]),
  createStudent
);

// ADD MULTIPLE (bulk CSV) — expects form-data with field 'file' containing CSV
// Optional: you can also send 'institute' as a text field in the same form-data to override CSV institute column
router.post("/add-multiple", uploadCSV.single("file"), bulkCreateStudents);

// GET ALL
router.get("/", getStudents);

module.exports = router;
