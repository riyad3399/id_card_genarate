import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BASE = import.meta.env.VITE_BASE_URL;

export default function StudentIdwisePhotoUpload() {
  const [institutes, setInstitutes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [sections, setSections] = useState([]);

  const [instituteId, setInstituteId] = useState("");
  const [className, setClassName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [section, setSection] = useState("");

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* =========================
     LOAD INSTITUTES
  ========================== */
  useEffect(() => {
    fetch(`${BASE}/api/institutes`)
      .then((res) => res.json())
      .then((data) => setInstitutes(data))
      .catch(() => toast.error("Institute load failed"));
  }, []);

  /* =========================
     LOAD CLASSES (by institute)
  ========================== */
  useEffect(() => {
    if (!instituteId) return;

    setClassName("");
    setGroupName("");
    setSection("");
    setGroups([]);
    setSections([]);

    fetch(`${BASE}/api/students/institutes/${instituteId}/classes`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch(() => toast.error("Class load failed"));
  }, [instituteId]);

  /* =========================
     LOAD GROUPS (by class)
  ========================== */
  useEffect(() => {
    if (!className) return;

    setGroupName("");
    setSection("");
    setSections([]);

    fetch(
      `${BASE}/api/students/classes/${className}/groups?instituteId=${instituteId}`
    )
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch(() => toast.error("Group load failed"));
  }, [className, instituteId]);

  /* =========================
     LOAD SECTIONS (by class + group)
  ========================== */
  useEffect(() => {
    if (!className || !groupName) return;

    setSection("");

    fetch(
      `${BASE}/api/students/classes/${className}/sections?group=${groupName}&instituteId=${instituteId}`
    )
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch(() => toast.error("Section load failed"));
  }, [className, groupName, instituteId]);

  /* =========================
     FILE HANDLER
  ========================== */
  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files || []));
  };

  /* =========================
     SUBMIT
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!instituteId || !className || !groupName) {
      toast.error("Institute, Class, Group নির্বাচন করুন");
      return;
    }

    if (!photos.length) {
      toast.error("কমপক্ষে একটি photo select করুন");
      return;
    }

    const formData = new FormData();
    formData.append("instituteId", instituteId);
    formData.append("className", className);
    formData.append("groupName", groupName);
    if (section) formData.append("section", section);

    photos.forEach((file) => formData.append("photos", file));

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(`${BASE}/api/students/upload-photos-studentid`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setResult(data);
      setPhotos([]);
      toast.success("Photos uploaded successfully");
      console.log(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="mt-10 max-w-3xl mx-auto bg-white border rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">
        Student Photo Upload (Institute Wise)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {/* Institute */}
          <select
            value={instituteId}
            onChange={(e) => setInstituteId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Institute</option>
            {institutes.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          {/* Class */}
          <select
            value={className}
            disabled={!classes.length}
            onChange={(e) => setClassName(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Group */}
          <select
            value={groupName}
            disabled={!groups.length}
            onChange={(e) => setGroupName(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Group</option>
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Section */}
          <select
            value={section}
            disabled={!sections.length}
            onChange={(e) => setSection(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Section (Optional)</option>
            {sections.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload Photos"}
        </button>
      </form>

      {result && (
        <div className="mt-4 text-sm">
          Uploaded:{" "}
          {result.results.filter((r) => r.status === "uploaded").length}
          <br />
          Skipped:{" "}
          {result.results.filter((r) => r.status !== "uploaded").length}
        </div>
      )}
    </div>
  );
}
