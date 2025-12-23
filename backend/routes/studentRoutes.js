/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createStudent,
  getStudents,
  bulkCreateStudents,
  uploadStudentPhotosByStudentId,
} = require("../controllers/studentController");

// ------------------- Ensure upload folders -------------------
const studentDir = path.join(__dirname, "..", "uploads", "students");
const csvDir = path.join(__dirname, "..", "uploads", "csvs");

if (!fs.existsSync(studentDir)) fs.mkdirSync(studentDir, { recursive: true });
if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir, { recursive: true });

// ------------------- Multer Disk Storages -------------------

// ✅ Student photo storage (DISK)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/students");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const uploadStudent = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ✅ CSV storage (DISK)
const csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, csvDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${name}${ext}`);
  },
});

const uploadCSV = multer({
  storage: csvStorage,
  fileFilter: (req, file, cb) => {
    const allowed = [".csv", ".txt"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) return cb(null, true);
    cb(new Error("Only CSV files are allowed"));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ------------------- Routes -------------------

// ✅ ADD STUDENT (single)
// field name: photo
router.post(
  "/add",
  uploadStudent.fields([{ name: "photo", maxCount: 1 }]),
  createStudent
);

// ✅ BULK STUDENT CREATE (CSV)
router.post("/add-multiple", uploadCSV.single("file"), bulkCreateStudents);

// ✅ UPLOAD STUDENT PHOTOS BY STUDENT ID
// field name: photos[]
router.post(
  "/upload-photos-studentid",
  uploadStudent.array("photos", 20),
  uploadStudentPhotosByStudentId
);

// ✅ GET ALL STUDENTS
router.get("/", getStudents);

module.exports = router;
