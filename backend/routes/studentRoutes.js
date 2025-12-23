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

/* ================================
   MULTER - MEMORY (STUDENT PHOTO)
================================ */
const MIN_SIZE = 20 * 1024; 
const MAX_SIZE = 80 * 1024; 

const photoUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG / PNG images are allowed"));
    }
    cb(null, true);
  },
});

const validatePhotoSize = (req, res, next) => {
  const file = req.files?.photo?.[0] || req.file;
  if (!file) return next();

  if (file.size < MIN_SIZE) {
    return res.status(400).json({
      message: "Photo size too small. Minimum 20 KB required.",
    });
  }

  next();
};


/* ================================
   MULTER - DISK (CSV)
================================ */
const csvDir = path.join(__dirname, "..", "uploads", "csvs");
if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir, { recursive: true });

const uploadCSV = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, csvDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
      cb(null, `${Date.now()}-${name}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowed = [".csv", ".txt"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) return cb(null, true);
    cb(new Error("Only CSV files are allowed"));
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

/* ================================
   ROUTES
================================ */

// ✅ ADD STUDENT (single)
router.post(
  "/add",
  photoUpload.fields([{ name: "photo", maxCount: 1 }]),
  validatePhotoSize,
  createStudent
);

// ✅ BULK STUDENT CREATE (CSV)
router.post("/add-multiple", uploadCSV.single("file"), bulkCreateStudents);

// ✅ UPLOAD STUDENT PHOTOS BY STUDENT ID
router.post(
  "/upload-photos-studentid",
  (req, res, next) => {
    console.log("🔥 ROUTE HIT: upload-photos-studentid");
    next();
  },
  photoUpload.array("photos", 20),
  uploadStudentPhotosByStudentId
);


// ✅ GET ALL STUDENTS
router.get("/", getStudents);

module.exports = router;
