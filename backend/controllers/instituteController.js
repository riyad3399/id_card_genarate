/* eslint-disable no-undef */
const Institute = require("../models/Institute");
const uploadToImgbb = require("../utils/uploadToImgbb");


const createInstitute = async (req, res) => {
  try {
    let logo = null;
    let signature = null;

    // 🔥 LOGO upload
    if (req.files?.logo?.[0]) {
      logo = await uploadToImgbb(req.files.logo[0].buffer);
    }

    // 🔥 SIGNATURE upload
    if (req.files?.signature?.[0]) {
      signature = await uploadToImgbb(req.files.signature[0].buffer);
    }

    const payload = {
      name: req.body.name?.trim(),
      type: req.body.type?.trim(),
      address: req.body.address?.trim(),
      contactEmail: req.body.contactEmail?.trim().toLowerCase(),
      phone: req.body.phone?.trim(),
      eiin: req.body.eiin?.trim(),
      estd: req.body.estd?.trim(),
      website: req.body.website?.trim(),
      shortName: req.body.shortName?.trim(),
      logo_url: logo,
      signature_url: signature,
    };

    const institute = new Institute(payload);
    await institute.save();

    res.status(201).json({
      message: "✅ Institute added successfully",
      data: institute,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
