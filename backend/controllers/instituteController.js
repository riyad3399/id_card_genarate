/* eslint-disable no-undef */
const Institute = require("../models/Institute");

const allowedTypes = ["school", "college", "university", "training_center"];

const createInstitute = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    console.log("Incoming files:", req.files || req.file);

    const shortName = req.body.shortName || req.body.sohortName || null;

    const typeRaw = typeof req.body.type === "string" ? req.body.type.trim() : "";
    if (!typeRaw) {
      return res.status(400).json({ message: "Field 'type' is required." });
    }
    if (!allowedTypes.includes(typeRaw)) {
      return res.status(400).json({
        message: "Invalid 'type'. Allowed: " + allowedTypes.join(", "),
      });
    }

    let logo = null;
    let signature = null;
    if (req.files) {
      if (req.files.logo && req.files.logo.length > 0) {
        logo = `/uploads/logos/${req.files.logo[0].filename}`;
      }
      if (req.files.signature && req.files.signature.length > 0) {
        signature = `/uploads/signature/${req.files.signature[0].filename}`;
      }
    }
    if (req.file) {
      if (req.file.fieldname === "logo") logo = `/uploads/logos/${req.file.filename}`;
      if (req.file.fieldname === "signature")
        signature = `/uploads/signature/${req.file.filename}`;
    }

    const payload = {
      name: req.body.name ? String(req.body.name).trim() : undefined,
      type: typeRaw,
      address: req.body.address ? String(req.body.address).trim() : undefined,
      contactEmail: req.body.contactEmail
        ? String(req.body.contactEmail).trim().toLowerCase()
        : undefined,
      phone: req.body.phone ? String(req.body.phone).trim() : undefined,
      eiin: req.body.eiin ? String(req.body.eiin).trim() : undefined,
      estd: req.body.estd ? String(req.body.estd).trim() : undefined,
      website: req.body.website ? String(req.body.website).trim() : undefined,
      shortName: shortName ? String(shortName).trim() : undefined,
      logo_url: logo,
      signature_url: signature,
    };


    Object.keys(payload).forEach((k) => {
      if (payload[k] === undefined) delete payload[k];
    });

    const newInstitute = new Institute(payload);
    await newInstitute.save();

    return res
      .status(201)
      .json({ message: "✅ Institute added successfully", data: newInstitute });
  } catch (err) {
    console.error("Create institute error (full):", err);

    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).reduce((acc, key) => {
        acc[key] = err.errors[key].message;
        return acc;
      }, {});
      return res.status(400).json({ message: "Validation error", errors });
    }

    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error", keyValue: err.keyValue });
    }

    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};




const getInstitutes = async (req, res) => {
  const data = await Institute.find().sort({ createdAt: -1 });
  res.json(data);
};

const getAllInstitutes = async (req, res) => {
  console.log("all institute");
  const data = await Institute.find();
  res.json(data);
};

const getInstituteByEmail = async (req, res) => {
  try {
    const emailParam = req.query.email;

    console.log(emailParam, "emailParam");
    if (!emailParam) return res.status(400).json({ message: "Email required" });

    const email = String(emailParam).toLowerCase().trim();

    const institute = await Institute.findOne({
      contactEmail: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!institute)
      return res.status(404).json({ message: "Institute not found" });

    return res.json(institute);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};



const deleteInstitute = async (req, res) => {
  await Institute.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

const updatateInstitute = async (req, res) => {
  await Institute.findByIdAndUpdate(req.params.id);
  res.json({ message: "Updated successfully" });
}
 

module.exports = {
  createInstitute,
  getInstitutes,
  getAllInstitutes,
  getInstituteByEmail,
  deleteInstitute,
  updatateInstitute,
};
