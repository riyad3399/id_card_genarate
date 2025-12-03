/* eslint-disable no-undef */
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String },
    roll: { type: String },
    id: { type: String },
    department: { type: String },
    section: { type: String },
    className: { type: String },
    phone: { type: String },
    bloodGroup: { type: String },

    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    photo_url: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
