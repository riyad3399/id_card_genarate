/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const multer = require("multer");

const { createStudent, getStudents, createStudentsBulk } = require("../controllers/studentController");

// Multer Storage
const studentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/students");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStudent = multer({ storage: studentStorage });

// ADD STUDENT
router.post(
  "/add",
  uploadStudent.fields([{ name: "photo", maxCount: 1 }]),
  createStudent
);

// add multiple students
router.post(
  "/add-multiple",
  uploadStudent.fields([{ name: "photo" }]),
  createStudentsBulk
);

// GET ALL
router.get("/", getStudents);



module.exports = router;
