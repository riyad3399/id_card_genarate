/* eslint-disable no-undef */
const Student = require("../models/Student");
const Institute = require("../models/Institute");


// helper
function escapeRegExp(string) {
  return String(string).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}



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

    // Photo upload handling
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
      dob,
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


// multiple students
const createStudentsBulk = async (req, res) => {
  try {
    if (!req.body.students) {
      return res.status(400).json({ message: "Missing students JSON." });
    }

    let students;
    try {
      students =
        typeof req.body.students === "string"
          ? JSON.parse(req.body.students)
          : req.body.students;
      if (!Array.isArray(students))
        throw new Error("students must be an array");
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid students payload", error: err.message });
    }

    // Prefer instituteId (frontend should send this). If only instituteName provided, try to find it.
    const instituteIdFromClient =
      req.body.instituteId || req.body.institute_id || null;
    const instituteNameFromClient = req.body.instituteName || null;

    let instituteId = null;
    if (instituteIdFromClient) {
      instituteId = instituteIdFromClient;
      // optional: validate object exists
      const instExists = await Institute.findById(instituteId).select("_id");
      if (!instExists) {
        return res
          .status(400)
          .json({ message: "Provided instituteId not found." });
      }
    } else if (instituteNameFromClient) {
      // try to find existing institute by name (case-insensitive)
      const inst = await Institute.findOne({
        name: {
          $regex: `^${escapeRegExp(instituteNameFromClient)}$`,
          $options: "i",
        },
      }).select("_id");
      if (!inst) {
        // IMPORTANT: do NOT auto-create because your schema requires many fields.
        return res.status(400).json({
          message:
            "Institute not found by name. Please select an existing institute from the dropdown (send instituteId).",
        });
      }
      instituteId = inst._id;
    } else {
      return res
        .status(400)
        .json({
          message: "Institute required. Send instituteId (recommended).",
        });
    }

    // Prepare uploaded photos map (multer field: 'photos' -> array)
    const files = (req.files && req.files.photos) || [];
    const byOriginal = new Map();
    const byStored = new Map();
    const byBase = new Map();

    for (const f of files) {
      const orig = (f.originalname || "").toLowerCase();
      const stored = (f.filename || "").toLowerCase();
      const base = path.parse(orig).name.toLowerCase();
      byOriginal.set(orig, f);
      byStored.set(stored, f);
      if (!byBase.has(base)) byBase.set(base, f);
    }

    const findPhotoForStudent = (st) => {
      const photoName = (st.photoFileName || "").trim().toLowerCase();
      const uniqueId = (st.id || st.uniqueId || "").trim().toLowerCase();
      if (/^https?:\/\//i.test(photoName)) return { remoteUrl: photoName };
      if (photoName) {
        if (byOriginal.has(photoName)) return byOriginal.get(photoName);
        if (byStored.has(photoName)) return byStored.get(photoName);
        const base = path.parse(photoName).name.toLowerCase();
        if (byBase.has(base)) return byBase.get(base);
      }
      if (uniqueId) {
        if (byBase.has(uniqueId)) return byBase.get(uniqueId);
        for (const [key, file] of byBase.entries()) {
          if (key.includes(uniqueId)) return file;
        }
      }
      return null;
    };

    const results = { total: students.length, inserted: 0, failed: [] };

    for (let i = 0; i < students.length; i++) {
      const s = students[i] || {};
      try {
        const newStudentData = {
          name: s.name || "",
          fatherName: s.fatherName || "",
          roll: s.roll || "",
          id: s.id || s.uniqueId || undefined,
          department: s.department || "",
          section: s.section || "",
          className: s.className || "",
          section: s.section || "",
          institute: instituteId, // use ObjectId
          bloodGroup: s.bloodGroup || "",
          phone: s.phone || "",
        };

        // photo handling
        const matched = findPhotoForStudent(s);
        if (matched) {
          if (matched.remoteUrl) newStudentData.photo_url = matched.remoteUrl;
          else
            newStudentData.photo_url = `/uploads/students/${matched.filename}`;
        }

        if (!newStudentData.id)
          throw new Error("missing id/uniqueId for student (required)");

        const student = new Student(newStudentData);
        await student.save();
        results.inserted += 1;
      } catch (err) {
        results.failed.push({ index: i, row: students[i], error: err.message });
      }
    }

    return res.status(201).json({
      message: "Bulk student creation completed",
      total: results.total,
      insertedCount: results.inserted,
      failed: results.failed,
    });
  } catch (err) {
    console.error("Bulk create error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
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
  createStudentsBulk
};
