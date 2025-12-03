/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const multer = require("multer");

const { createStudent, getStudents } = require("../controllers/studentController");

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

// GET ALL
router.get("/", getStudents);

// // GET ONE
// router.get("/:id", getSingleStudent);

// // UPDATE
// router.put(
//   "/update/:id",
//   uploadStudent.fields([{ name: "photo", maxCount: 1 }]),
//   updateStudent
// );

// // DELETE
// router.delete("/delete/:id", deleteStudent);

module.exports = router;
