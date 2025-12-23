/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");

const {
  createInstitute,
  getInstitutes,
  deleteInstitute,
  getAllInstitutes,
  updatateInstitute,
  getInstituteByEmail,
} = require("../controllers/instituteController");

const router = express.Router();

/* ================================
   MULTER (MEMORY STORAGE)
   for imgbb upload
================================ */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

/* ================================
   ROUTES
================================ */
router.post(
  "/add",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  createInstitute
);


router.get("/", getInstitutes);
router.get("/all", getAllInstitutes);
router.get("/by-email", getInstituteByEmail);
router.patch("/:id", updatateInstitute);
router.delete("/:id", deleteInstitute);

module.exports = router;
