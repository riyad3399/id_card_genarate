import { useState } from "react";
import toast from "react-hot-toast";

export default function StudentIdwisePhotoUpload() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photos.length) {
      toast.error("Please select at least one photo");
      return;
    }

    const formData = new FormData();
    Array.from(photos).forEach((file) => formData.append("photos", file));

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(
        "http://localhost:5000/api/students/upload-photos-studentid",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setResult(data);
      toast.success("Photos uploaded successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Student Photo Upload
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Upload photos using <b>Student ID</b> as filename (example:{" "}
          <code>STU1001.jpg</code>)
        </p>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Upload Box */}
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition">
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10 text-indigo-500 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12M7 16l-2 2m2-2l2 2m6-2l2 2m-2-2l-2 2"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Click to select or drag photos
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG / PNG · StudentId wise
              </p>
            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => setPhotos(e.target.files)}
            />
          </label>

          {/* Preview */}
          {photos.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected Photos ({photos.length})
              </p>

              <div className="grid grid-cols-4 gap-3 max-h-48 overflow-auto">
                {Array.from(photos).map((file, i) => (
                  <div key={i} className="border rounded-lg p-1 bg-gray-50">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-full h-20 object-cover rounded"
                    />
                    <p className="text-[10px] truncate text-center mt-1">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-b from-sky-200 to-sky-600 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Uploading photos..." : "Upload Photos"}
          </button>
        </form>

        {/* Result Summary */}
        {result && (
          <div className="mt-6 bg-gray-50 border rounded-lg p-4 text-sm">
            <p className="font-medium text-gray-700 mb-2">Upload Summary</p>
            <div className="flex justify-between">
              <span className="text-green-600">
                ✅ Uploaded:{" "}
                {result.results.filter((r) => r.status === "uploaded").length}
              </span>
              <span className="text-red-500">
                ❌ Not Found:{" "}
                {result.results.filter((r) => r.status !== "uploaded").length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
