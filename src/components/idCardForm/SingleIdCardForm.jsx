import { useEffect, useState } from "react";

export default function SingleIdCardForm() {
  const [institutes, setInstitutes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roll: "",
    id: "",
    fatherName: "",
    department: "",
    section: "",
    institute: "",
    bloodGroup: "",
    phone: "",
    className: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all institutes
  useEffect(() => {
    fetch("http://localhost:5000/api/institutes/all")
      .then((res) => res.json())
      .then((data) => setInstitutes(data))
      .catch((err) => console.error("Error loading institutes:", err));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, photo: file });
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      const res = await fetch("http://localhost:5000/api/students/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Student added successfully!");
        setForm({
          name: "",
          roll: "",
          id: "",
          fatherName: "",
          department: "",
          section: "",
          institute: "",
          bloodGroup: "",
          phone: "",
          className: "",
          photo: null,
        });
        setPhotoPreview(null);
      } else {
        setMessage("❌ Failed: " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error or network issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Student</h2>

      {message && (
        <div className="alert alert-info text-center mb-4 py-2">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Institute & Class */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Institute</label>
            <select
              name="institute"
              className="select select-bordered w-full"
              value={form.institute}
              onChange={handleChange}
              required
            >
              <option value="">Select Institute</option>
              {institutes.map((inst) => (
                <option key={inst._id} value={inst._id}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Class</label>
            <input
              type="text"
              name="className"
              className="input input-bordered w-full"
              value={form.className}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Student Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              className="input input-bordered w-full"
              value={form.fatherName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">ID</label>
            <input
              type="text"
              name="id"
              className="input input-bordered w-full"
              value={form.id}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Roll</label>
            <input
              type="text"
              name="roll"
              className="input input-bordered w-full"
              value={form.roll}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* More Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <input
              type="text"
              name="department"
              className="input input-bordered w-full"
              value={form.department}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">section</label>
            <input
              type="text"
              name="section"
              className="input input-bordered w-full"
              value={form.section}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              className="input input-bordered w-full"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              className="input input-bordered w-full"
              value={form.bloodGroup}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col items-center gap-3">
          <label className="block mb-1 font-medium">Upload Student Photo</label>
          <div className="relative flex items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-gray-500 text-sm">Click to Upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? "Saving..." : "Generate ID Card"}
        </button>
      </form>
    </div>
  );
}
