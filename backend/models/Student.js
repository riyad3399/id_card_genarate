/* eslint-disable no-undef */
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    roll: { type: String },

    studentName: { type: String, required: true },
    studentNameBn: { type: String },

    fatherName: { type: String },
    fatherNameBn: { type: String },

    motherName: { type: String },
    motherNameBn: { type: String },
    mobileNumber: { type: String },

    dob: { type: Date },

    bloodGroup: { type: String },
    religion: { type: String },

    gender: { type: String, enum: ["Male", "Female"] },

    className: { type: String },
    section: { type: String },
    groupName: { type: String },
    shiftName: { type: String },

    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    photo_url: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
