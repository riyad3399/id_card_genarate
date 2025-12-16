/* eslint-disable no-undef */
const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["school", "college", "university", "madrasa"],
      required: true,
    },

    shortName: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    eiin: {
      type: String,
      unique: true,
      sparse: true,
    },

    estd: {
      type: String,
    },

    website: {
      type: String,
      required: true,
    },

    contactEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    logo_url: {
      type: String,
      default: null,
    },

    signature_url: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institute", instituteSchema);
