import { useEffect, useRef, useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { StudentIDCard } from "../idCardTemplate/StudentIDCard";
import toast from "react-hot-toast";

export default function SingleIdCardForm() {
  const initialForm = {
    studentId: "",
    roll: "",
    studentName: "",
    studentNameBn: "",
    fatherName: "",
    fatherNameBn: "",
    motherName: "",
    motherNameBn: "",
    mobileNumber: "",
    dob: "",
    bloodGroup: "",
    religion: "",
    gender: "",
    className: "",
    section: "",
    groupName: "",
    shiftName: "",
    institute: "",
    photo: null,
  };

  const [form, setForm] = useState(initialForm);
  const [institutes, setInstitutes] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/api/institutes/all")
      .then((r) => r.json())
      .then((d) => setInstitutes(d || []))
      .catch(() => setInstitutes([]));
  }, []);

  // revoke object URL on unmount or when photoPreview changes
  useEffect(() => {
    return () => {
      if (photoPreview) {
        try {
          URL.revokeObjectURL(photoPreview);
        } catch {}
      }
    };
  }, [photoPreview]);

  const classOptions = [
    "Play",
    "Nursery",
    "KG",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
  ];

  const bloadGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const religionOptions = ["Islam", "Hindu", "Christian", "Buddhist", "Others"];
  const sectionOptions = ["A", "B", "C", "D", "E"];
  const groupOptions = [
    "Science",
    "Business Studies",
    "Humanities",
    "General",
    "Vocational",
    "Others",
  ];
  const shiftOptions = ["Morning", "Day", "Evening"];

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFile = (file) => {
    if (!file) return;
    // revoke previous
    if (photoPreview) {
      try {
        URL.revokeObjectURL(photoPreview);
      } catch {}
    }
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, photo: file }));
    setPhotoPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const FD = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v) FD.append(k, v);
      });

      const res = await fetch("http://localhost:5000/api/students/add", {
        method: "POST",
        body: FD,
      });

      const json = await res.json();

      if (res.ok) {
        toast.success("Student added successfully!");
        setForm(initialForm);
        if (photoPreview) {
          try {
            URL.revokeObjectURL(photoPreview);
          } catch {
            toast.error(" Failed to reset photo preview");
          }
        }
        setPhotoPreview(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setMessage("❌ " + (json.message || "Failed"));
      }
    } catch (err) {
      console.error(err);
      toast.error(" Network/Server error");
    } finally {
      setLoading(false);
    }
  };

  // selected institute object (if any)
  const selectedInstitute =
    institutes.find((i) => i._id === form.institute) || {};

  const previewData = {

    name: form.studentName || form.studentNameBn || "",
    id: form.studentId || "",
    roll: form.roll || "",
    className: form.className || "",
    section: form.section || "",
    bloodGroup: form.bloodGroup || "",
    fatherName: form.fatherName || "",
    fatherNameBn: form.fatherNameBn || "",
    motherName: form.motherName || "",
    motherNameBn: form.motherNameBn || "",
    phone: form.mobileNumber || "",
    photo_url: photoPreview || null,
    institute: {
      name: selectedInstitute.name || "",
      logo_url:
        selectedInstitute.logo_url ||
        selectedInstitute.logo ||
        selectedInstitute.logoUrl ||
        null,
      signature_url:
        selectedInstitute.signature_url ||
        selectedInstitute.signature ||
        selectedInstitute.signatureUrl ||
        null,
    },
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-slate-100">
      {/* LEFT: FORM PANEL */}
      <div className="w-[55%] h-full overflow-y-auto p-8 bg-white shadow-xl border-r">
        <h2 className="text-2xl font-bold mb-4">
          Add Student (Full Screen Form)
        </h2>

        {message && (
          <div className="mb-4 p-2 text-center bg-slate-50 border rounded-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 pb-10">
          {/* Top Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600">Institute</label>
              <select
                name="institute"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.institute}
              >
                <option value="">Select</option>
                {institutes.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Class</label>
              <select
                name="className"
                value={form.className}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              >
                {classOptions.map((cls, index) => (
                  <option key={index} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600">Student ID *</label>
              <input
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-600">Roll</label>
              <input
                name="roll"
                value={form.roll}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600">
                Student Name (EN)
              </label>
              <input
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-600">
                Student Name (BN)
              </label>
              <input
                name="studentNameBn"
                value={form.studentNameBn}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600">Father Name (EN)</label>
              <input
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600">Father Name (BN)</label>
              <input
                name="fatherNameBn"
                value={form.fatherNameBn}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600">
                Mother Name (EN){" "}
              </label>
              <input
                name="motherName"
                value={form.motherName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600">
                Mother Name (BN){" "}
              </label>
              <input
                name="motherNameBn"
                value={form.motherNameBn}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600">Mobile</label>
              <div className="flex items-center gap-1 input input-bordered">
                <Phone size={16} className="text-slate-400" />
                <input
                  name="mobileNumber"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="+8801XXXX"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-600">DOB</label>
              <div className="flex items-center gap-1 input input-bordered">
                <Calendar size={16} className="text-slate-400" />
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Other Meta */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-xs">Blood Group</label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                {bloadGroupOptions.map((bd, index) => (
                  <option key={index} value={bd}>
                    {bd}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Religion</label>
              <select
                name="religion"
                value={form.religion}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                {religionOptions.map((rel, index) => (
                  <option key={index} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Section</label>
              <select
                name="section"
                value={form.section}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                {sectionOptions.map((sec, index) => (
                  <option key={index} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Group / Shift */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600">Group</label>
              <select
                name="groupName"
                value={form.groupName}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                {groupOptions.map((g, index) => (
                  <option key={index} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Shift</label>
              <select
                name="shiftName"
                value={form.shiftName}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                {shiftOptions.map((shift, index) => (
                  <option key={index} value={shift}>
                    {shift}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="text-xs mb-1 block">Upload Photo</label>

            <div
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              className={`p-4 rounded-lg border-2 border-dashed cursor-pointer flex items-center gap-4 ${
                dragOver ? "border-indigo-400 bg-indigo-50" : "border-slate-300"
              }`}
              onClick={() => fileRef.current.click()}
            >
              <div className="w-28 h-28 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={40} className="text-slate-400" />
                )}
              </div>

              <div>
                <p className="text-sm font-medium">Drop or click to upload</p>
                <p className="text-xs text-slate-500">Supported: JPG, PNG</p>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="btn bg-gradient-to-b from-sky-200 to-sky-600 text-white w-full"
            type="submit"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Saving...
              </span>
            ) : (
              "Save Student"
            )}
          </button>
        </form>
      </div>

      {/* RIGHT: LIVE PREVIEW PANEL */}
      <div className="w-[45%] h-full p-10 flex flex-col justify-center items-center hidden md:flex">
        <div style={{ width: 320 }}>
          <StudentIDCard data={previewData} />
        </div>
      </div>
    </div>
  );
}
