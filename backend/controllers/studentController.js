/* eslint-disable no-undef */
const Student = require("../models/Student");

const createStudent = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      roll,
      id,
      department,
      session,
      institute,
      bloodGroup,
      phone,
      className,
    } = req.body;

    const photo = req.files?.photo
      ? `/uploads/students/${req.files.photo[0].filename}`
      : null;

    const newStudent = new Student({
      name,
      fatherName,
      roll,
      id,
      department,
      session,
      institute,
      bloodGroup,
      phone,
      className,
      photo_url: photo,
    });

    await newStudent.save();

    res.status(201).json({
      message: "✅ Student added successfully",
      data: newStudent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getStudents = async (req, res) => {
  const data = await Student.find()
    .populate("institute")
    .sort({ createdAt: -1 });
  res.json(data);
};

const getAllStudents = async (req, res) => {
  const data = await Student.find().populate("institute");
  res.json(data);
};

const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

const updateStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated successfully" });
};

module.exports = {
  createStudent,
  getStudents,
  getAllStudents,
  deleteStudent,
  updateStudent,
};
