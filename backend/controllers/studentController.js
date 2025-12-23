/* eslint-disable no-undef */
const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");
const Student = require("../models/Student");
const Institute = require("../models/Institute");
const uploadToImgbb = require("../utils/uploadToImgbb");


const normalizeStudentPayload = (payload) => {
  // normalize gender
  let gender = payload.gender;
  if (gender) {
    const g = String(gender).trim().toLowerCase();
    if (["male", "m"].includes(g)) gender = "Male";
    else if (["female", "f"].includes(g)) gender = "Female";
  }

  // normalize DOB
  let dob = undefined;
  if (payload.dob) {
    const d = new Date(payload.dob);
    if (!isNaN(d)) {
      dob = d;
    }
  }

  return {
    studentId: payload.studentId,
    roll: payload.roll || null,

    studentName: payload.studentName,
    studentNameBn: payload.studentNameBn || null,

    fatherName: payload.fatherName || null,
    fatherNameBn: payload.fatherNameBn || null,

    motherName: payload.motherName || null,
    motherNameBn: payload.motherNameBn || null,

    mobileNumber: payload.mobileNumber || null,
    dob,

    bloodGroup: payload.bloodGroup || null,
    religion: payload.religion || null,
    gender,

    className: payload.className || null,
    section: payload.section || null,
    groupName: payload.groupName || null,
    shiftName: payload.shiftName || null,

    institute: payload.institute,
    photo_url: payload.photo_url || null,
  };
};


const normalizeKey = (k = "") =>
  String(k || "")
    .trim()
    .toLowerCase()
    .replace(/[\s\-]/g, "_");

const HEADER_MAP = {
  student_id: "studentId",
  studentid: "studentId",
  id: "studentId",
  roll: "roll",
  student_name: "studentName",
  studentname: "studentName",
  student_name_bn: "studentNameBn",
  studentnamebn: "studentNameBn",
  f_name: "fatherName",
  father_name: "fatherName",
  f_name_bn: "fatherNameBn",
  father_name_bn: "fatherNameBn",
  m_name: "motherName",
  mother_name: "motherName",
  m_name_bn: "motherNameBn",
  mother_name_bn: "motherNameBn",
  mobile_number: "mobileNumber",
  mobile: "mobileNumber",
  phone: "mobileNumber",
  dob: "dob",
  date_of_birth: "dob",
  blod_group: "bloodGroup",
  blood_group: "bloodGroup",
  religion: "religion",
  gender: "gender",
  class_name: "className",
  classname: "className",
  section: "section",
  group_name: "groupName",
  groupname: "groupName",
  shift_name: "shiftName",
  shiftname: "shiftName",
  institute: "institute",
  institute_id: "institute",
};

function mapRowToStudentObject(row) {
  const obj = {};
  Object.keys(row).forEach((key) => {
    const norm = normalizeKey(key);
    const mapped = HEADER_MAP[norm];
    if (mapped) {
      obj[mapped] = String(row[key] ?? "").trim();
    }
  });
  return obj;
}

// ----------------- Controllers -----------------

// Create single student
const createStudent = async (req, res) => {
  try {
    let photoUrl = null;

    // ✅ buffer use
    if (req.files?.photo?.[0]) {
      photoUrl = await uploadToImgbb(req.files.photo[0].buffer);
    }

    const payload = normalizeStudentPayload({
      ...req.body,
      photo_url: photoUrl, // ✅ imgbb URL
    });

    const newStudent = new Student(payload);
    await newStudent.save();

    return res.status(201).json({
      ok: true,
      message: "Student added successfully",
      data: newStudent,
    });
  } catch (err) {
    console.error("createStudent error:", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: err.message,
    });
  }
};




// Bulk create students from CSV
const bulkCreateStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ ok: false, message: "CSV file is required" });
    }

    const csvPath = req.file.path;
    const rawRows = await csv().fromFile(csvPath);

    if (!rawRows.length) {
      fs.unlinkSync(csvPath);
      return res.status(400).json({ ok: false, message: "CSV is empty" });
    }

    // institute handling
    let instituteId = req.body?.institute || null;
    if (!instituteId) {
      const inst = await Institute.findOne().select("_id").lean();
      if (!inst) {
        fs.unlinkSync(csvPath);
        return res.status(400).json({
          ok: false,
          message: "Institute not found. Please provide institute id.",
        });
      }
      instituteId = inst._id.toString();
    }

    const studentsToInsert = [];
    const rowErrors = [];

    rawRows.forEach((row, index) => {
      const rowNumber = index + 2;

      try {
        const mapped = mapRowToStudentObject(row);
        mapped.institute = instituteId;
        mapped.photo_url = null;

        if (!mapped.studentId) {
          rowErrors.push({
            row: rowNumber,
            reason: "Missing studentId",
          });
          return;
        }

        if (!mapped.studentName) {
          rowErrors.push({
            row: rowNumber,
            reason: "Missing studentName",
          });
          return;
        }

        studentsToInsert.push(normalizeStudentPayload(mapped));
      } catch (err) {
        rowErrors.push({
          row: rowNumber,
          reason: err.message,
        });
      }
    });

    if (!studentsToInsert.length) {
      fs.unlinkSync(csvPath);
      return res.status(400).json({
        ok: false,
        message: "No valid rows found",
        rowErrors,
      });
    }

    // remove duplicates
    const ids = studentsToInsert.map((s) => s.studentId);
    const existing = await Student.find({ studentId: { $in: ids } })
      .select("studentId")
      .lean();

    const existingIds = new Set(existing.map((e) => e.studentId));
    const finalInsert = studentsToInsert.filter(
      (s) => !existingIds.has(s.studentId)
    );

    if (!finalInsert.length) {
      fs.unlinkSync(csvPath);
      return res.status(409).json({
        ok: false,
        message: "All students already exist",
      });
    }

    const insertedDocs = await Student.insertMany(finalInsert, {
      ordered: false,
    });

    fs.unlinkSync(csvPath);

    return res.status(200).json({
      ok: true,
      message: "Bulk students added successfully",
      totalRows: rawRows.length,
      insertedCount: insertedDocs.length,
      skippedDuplicates: existingIds.size,
      rowErrors,
    });
  } catch (err) {
    console.error("bulkCreateStudents error:", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// upload students photo by studentId
const uploadStudentPhotosByStudentId = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ ok: false, message: "No photos uploaded" });
    }

    if (!req.files || !req.files.length) {
      return res.status(400).json({
        ok: false,
        message: "No photos received",
      });
    }


    const results = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname);
      const studentId = path.basename(file.originalname, ext);

      const student = await Student.findOne({ studentId });

      if (!student) {
        results.push({
          file: file.originalname,
          status: "student not found",
        });
        continue;
      }

      student.photo_url = `/uploads/students/${file.filename}`;
      await student.save();

      results.push({
        file: file.originalname,
        studentId,
        status: "uploaded",
      });
    }

    return res.json({
      ok: true,
      message: "Student photos uploaded successfully",
      results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: err.message,
    });
  }
};


const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("institute")
      .sort({ createdAt: -1 })
      .lean();

    const data = students.map((s) => ({
      ...s,

      // ✅ student photo URL (imgbb)
      photo: s.photo || null,

      institute: s.institute
        ? {
            ...s.institute,
            logo: s.institute.logo || null, // imgbb url
            signature: s.institute.signature || null, // imgbb url
          }
        : null,
    }));

    res.json(data);
  } catch (err) {
    console.error("getStudents error:", err);
    res.status(500).json({ message: "Failed to load students" });
  }
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
  bulkCreateStudents,
  uploadStudentPhotosByStudentId,
};
