/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createInstitute,
  getInstitutes,
  deleteInstitute,
  getAllInstitutes,
  updatateInstitute,
  getInstituteByEmail
} = require("../controllers/instituteController");

const router = express.Router();

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "logo") {
      cb(null, "uploads/logos");
    } else if (file.fieldname === "signature") {
      cb(null, "uploads/signature");
    }
  },
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ROUTES
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
router.delete("/:id", deleteInstitute);
router.patch("/:id", updatateInstitute);
router.get("/by-email", getInstituteByEmail);

module.exports = router;
