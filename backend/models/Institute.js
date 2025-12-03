/* eslint-disable no-undef */

const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["school", "college", "university", "training_center"],
      required: true,
    },
    shortName: { type: String },
    address: { type: String, required: true },
    eiin: { type: String, default: null, required:true },
    estd: { type: String, default: null },
    website: { type: String, default: null, required:true }, 
    contactEmail: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    logo_url: { type: String, default: null },
    signature_url: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institute", instituteSchema);
