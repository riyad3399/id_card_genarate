/* eslint-disable no-undef */
const fs = require("fs");
const csv = require("csvtojson");
const Student = require("../models/Student");
const Institute = require("../models/Institute");

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
    const {
      studentId,
      roll,
      studentName,
      studentNameBn,
      fatherName,
      fatherNameBn,
      motherName,
      motherNameBn,
      mobileNumber,
      dob,
      bloodGroup,
      religion,
      gender,
      className,
      section,
      groupName,
      shiftName,
      institute,
    } = req.body;

    // photo handling: multer fields (upload.fields([{name: 'photo', maxCount: 1}]))
    const photo = req.files?.photo
      ? `/uploads/students/${req.files.photo[0].filename}`
      : null;

    const newStudent = new Student({
      studentId,
      roll,
      studentName,
      studentNameBn,
      fatherName,
      fatherNameBn,
      motherName,
      motherNameBn,
      mobileNumber,
      dob: dob ? new Date(dob) : undefined,
      bloodGroup,
      religion,
      gender,
      className,
      section,
      groupName,
      shiftName,
      institute,
      photo_url: photo,
    });

    await newStudent.save();

    return res
      .status(201)
      .json({ ok: true, message: "Student added", data: newStudent });
  } catch (err) {
    console.error("createStudent error:", err);
    // handle duplicate key nicely
    if (err.code === 11000) {
      return res
        .status(409)
        .json({
          ok: false,
          message: "Duplicate key error",
          error: err.message,
        });
    }
    return res
      .status(500)
      .json({ ok: false, message: "Server error", error: err.message });
  }
};

// Bulk create students from CSV
const bulkCreateStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ ok: false, message: "CSV file is required (field: file)" });
    }

    const csvPath = req.file.path;
    if (!fs.existsSync(csvPath)) {
      return res
        .status(500)
        .json({
          ok: false,
          message: "Uploaded CSV file not found on server",
          path: csvPath,
        });
    }

    // parse CSV
    let rawRows;
    try {
      rawRows = await csv().fromFile(csvPath);
    } catch (parseErr) {
      console.error("CSV parse error:", parseErr);
      try {
        fs.unlinkSync(csvPath);
      } catch (e) {}
      return res
        .status(400)
        .json({
          ok: false,
          message: "Failed to parse CSV",
          error: parseErr.message || parseErr,
        });
    }

    if (!Array.isArray(rawRows) || rawRows.length === 0) {
      try {
        fs.unlinkSync(csvPath);
      } catch (e) {}
      return res
        .status(400)
        .json({ ok: false, message: "CSV is empty or unreadable" });
    }

    // Determine institute: prefer client-provided, otherwise fallback to first Institute in DB
    let instituteFromClient =
      req.body && req.body.institute ? String(req.body.institute).trim() : null;
    if (!instituteFromClient) {
      const anyInst = await Institute.findOne().select("_id").lean();
      if (anyInst) {
        instituteFromClient = String(anyInst._id);
        console.log(
          "No institute provided — using first institute id as fallback:",
          instituteFromClient
        );
      } else {
        try {
          fs.unlinkSync(csvPath);
        } catch (e) {}
        return res.status(400).json({
          ok: false,
          message:
            "No institute provided and no institutes exist on server. Please create an institute or send institute id in the upload form.",
        });
      }
    }

    const studentsToInsert = [];
    const rowErrors = [];

    for (let i = 0; i < rawRows.length; i++) {
      const row = rawRows[i];
      const rowIndex = i + 2;
      let mapped;
      try {
        mapped = mapRowToStudentObject(row);

        // ensure institute set
        mapped.institute = instituteFromClient;

        // required validations
        if (!mapped.studentId || mapped.studentId === "") {
          rowErrors.push({
            row: rowIndex,
            reason: "Missing studentId (STUDENT_ID)",
          });
          continue;
        }
        if (!mapped.studentName || mapped.studentName === "") {
          rowErrors.push({
            row: rowIndex,
            reason: "Missing studentName (STUDENT_NAME)",
          });
          continue;
        }

        // DOB conversion
        if (mapped.dob && mapped.dob !== "") {
          const d = new Date(mapped.dob);
          if (!isNaN(d)) {
            mapped.dob = d;
          } else {
            const parts = mapped.dob.split(/[\/\-\.\s]/).map((p) => p.trim());
            if (parts.length === 3) {
              const [a, b, c] = parts;
              const alt = new Date(`${c}-${b}-${a}`);
              if (!isNaN(alt)) mapped.dob = alt;
              else {
                rowErrors.push({
                  row: rowIndex,
                  reason: `Invalid DOB format: ${mapped.dob}`,
                });
                continue;
              }
            } else {
              rowErrors.push({
                row: rowIndex,
                reason: `Invalid DOB format: ${mapped.dob}`,
              });
              continue;
            }
          }
        }

        // Normalize gender
        if (mapped.gender) {
          const g = String(mapped.gender).trim().toLowerCase();
          if (["male", "m"].includes(g)) mapped.gender = "Male";
          else if (["female", "f"].includes(g)) mapped.gender = "Female";
        }

        studentsToInsert.push(mapped);
      } catch (rowErr) {
        console.error(`Row mapping error at row ${rowIndex}:`, rowErr);
        rowErrors.push({
          row: rowIndex,
          reason: `Row processing error: ${rowErr.message || rowErr}`,
        });
      }
    }

    if (studentsToInsert.length === 0) {
      try {
        fs.unlinkSync(csvPath);
      } catch (e) {}
      return res
        .status(400)
        .json({ ok: false, message: "No valid rows to insert", rowErrors });
    }

    // pre-check duplicates
    const incomingIds = studentsToInsert.map((s) => s.studentId);
    const existing = await Student.find({ studentId: { $in: incomingIds } })
      .select("studentId")
      .lean();
    const existingIds = new Set(existing.map((e) => e.studentId));
    const dupRows = [];
    const filteredToInsert = studentsToInsert.filter((s) => {
      if (existingIds.has(s.studentId)) {
        dupRows.push({
          studentId: s.studentId,
          reason: "Already exists in DB",
        });
        return false;
      }
      return true;
    });

    if (filteredToInsert.length === 0) {
      try {
        fs.unlinkSync(csvPath);
      } catch (e) {}
      return res
        .status(409)
        .json({
          ok: false,
          message:
            "All rows conflict with existing records (studentId duplicates)",
          duplicates: dupRows,
          rowErrors,
        });
    }

    // insertMany
    let insertResult = { insertedCount: 0, insertedIds: [], writeErrors: [] };
    try {
      const insertedDocs = await Student.insertMany(filteredToInsert, {
        ordered: false,
      });
      insertResult.insertedCount = insertedDocs.length;
      insertResult.insertedIds = insertedDocs.map((d) => d._id);
    } catch (insertErr) {
      console.error("insertMany error:", insertErr);
      if (
        insertErr &&
        insertErr.writeErrors &&
        Array.isArray(insertErr.writeErrors)
      ) {
        insertResult.writeErrors = insertErr.writeErrors.map((we) => ({
          index: we.index,
          errmsg: we.errmsg,
          code: we.code,
          op: we.op,
        }));
        insertResult.insertedCount =
          (insertErr.result && insertErr.result.nInserted) ||
          insertResult.insertedCount;
      } else {
        try {
          fs.unlinkSync(csvPath);
        } catch (e) {}
        return res
          .status(500)
          .json({
            ok: false,
            message: "Error inserting students",
            error: insertErr.message || String(insertErr),
          });
      }
    }

    // cleanup uploaded CSV
    try {
      fs.unlinkSync(csvPath);
    } catch (e) {
      console.warn("Could not delete CSV:", e?.message || e);
    }

    return res.status(200).json({
      ok: true,
      message: "CSV processed",
      totalRows: rawRows.length,
      parsedRows: studentsToInsert.length,
      duplicatesSkipped: dupRows.length,
      duplicates: dupRows,
      insertedCount: insertResult.insertedCount,
      insertErrors: insertResult.writeErrors,
      rowErrors,
      instituteUsed: instituteFromClient || "from CSV (if present)",
    });
  } catch (err) {
    console.error("bulkCreateStudents unexpected error:", err);
    return res
      .status(500)
      .json({
        ok: false,
        message: "Server error",
        error: err.message,
        stack: err.stack,
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
  bulkCreateStudents,
};
