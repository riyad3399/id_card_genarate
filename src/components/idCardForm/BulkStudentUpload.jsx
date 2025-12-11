import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileText, DownloadCloud, Trash2 } from "lucide-react";
import axios from "axios";

/**
 * BulkStudentUpload.jsx
 * Usage: place this component in your admin area. TailwindCSS classes used.
 *
 * Important:
 * - Backend endpoint must be: POST /api/students/add-multiple
 * - Form field: 'file' (CSV), optional 'institute' (string)
 */

export default function BulkStudentUpload() {
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const fileRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/api/institutes/all")
      .then((r) => r.json())
      .then((d) => {
        // If your API returns {data: [...] } adjust accordingly
        setInstitutes(Array.isArray(d) ? d : d?.data || []);
      })
      .catch(() => setInstitutes([]));
  }, []);

  const handleFileSelect = (f) => {
    setFile(f);
    setMessage(null);
    setResult(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  };

  const onChoose = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFileSelect(f);
  };

  const removeFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "CSV file select koro." });
      return;
    }

    setLoading(true);
    setProgress(0);
    setMessage(null);
    setResult(null);

    const fd = new FormData();
    fd.append("file", file);
    if (selectedInstitute) fd.append("institute", selectedInstitute);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/add-multiple",
        fd,
        {
          headers: {
            // let browser set Content-Type with boundary
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const pct = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setProgress(pct);
            }
          },
          timeout: 5 * 60 * 1000, // 5 minutes in case of large file
        }
      );

      // success
      setLoading(false);
      setProgress(100);
      const data = res.data;
      setResult(data);
      setMessage({
        type: "success",
        text: data.message || "Upload successful",
      });
      // optionally clear file
      // removeFile();
    } catch (err) {
      setLoading(false);
      // axios error handling
      if (err.response) {
        // server responded with status outside 2xx
        const data = err.response.data;
        setResult(data || null);
        setMessage({
          type: "error",
          text: data?.message || `Server error: ${err.response.status}`,
        });
      } else if (err.request) {
        // request made but no response
        setMessage({
          type: "error",
          text: "No response from server. Network issue or server down.",
        });
      } else {
        // something else
        setMessage({ type: "error", text: `Upload error: ${err.message}` });
      }
    }
  };

  const downloadTemplate = () => {
    const headers = [
      "STUDENT_ID",
      "ROLL",
      "STUDENT_NAME",
      "STUDENT_NAME_BN",
      "F_NAME",
      "F_NAME_BN",
      "M_NAME",
      "M_NAME_BN",
      "MOBILE_NUMBER",
      "DOB",
      "BLOD_GROUP",
      "RELIGION",
      "GENDER",
      "CLASS_NAME",
      "SECTION",
      "GROUP_NAME",
      "SHIFT_NAME",
      // optionally 'INSTITUTE' but if you send institute id from UI you don't need to include in CSV
    ];
    const csv = headers.join(",") + "\n";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Bulk Student Upload (CSV)</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow"
      >
        {/* Institute select */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Institute (optional)
          </label>
          <select
            className="input input-bordered w-full"
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
          >
            <option value="">-- Select institute (optional) --</option>
            {institutes.map((inst) => (
              <option key={inst._id} value={inst._id}>
                {inst.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">
            If you choose an institute here, you don't need an "INSTITUTE"
            column in CSV — the backend will apply this institute id to every
            row.
          </p>
        </div>

        {/* File drop area */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">CSV File</label>

          <div
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`border-2 rounded-lg p-6 flex items-center gap-4 cursor-pointer ${
              dragOver
                ? "border-indigo-400 bg-indigo-50"
                : "border-dashed border-slate-200 bg-white"
            }`}
            onClick={() => fileRef.current && fileRef.current.click()}
          >
            <div className="p-3 bg-slate-100 rounded">
              <UploadCloud size={28} />
            </div>

            <div className="flex-1">
              <div className="font-medium">
                {file ? file.name : "Drop CSV here or click to choose"}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Accepts: .csv | max size: 10MB. Use the template if unsure.
              </div>
            </div>

            {file && (
              <button
                type="button"
                onClick={removeFile}
                className="btn btn-ghost"
              >
                <Trash2 size={16} /> Remove
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={onChoose}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:opacity-95 disabled:opacity-60"
          >
            <FileText size={16} />
            {loading ? `Uploading ${progress}%` : "Upload CSV"}
          </button>

          <button
            type="button"
            onClick={downloadTemplate}
            className="inline-flex items-center gap-2 px-3 py-2 rounded border"
          >
            <DownloadCloud size={16} /> Download Template
          </button>

          <div className="ml-auto text-sm text-slate-500">
            <span className="font-medium">Selected:</span>{" "}
            {file ? file.name : "none"}
          </div>
        </div>

        {/* Progress */}
        {loading && (
          <div className="w-full bg-slate-100 rounded overflow-hidden">
            <div
              className="h-2 bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded text-sm ${
              message.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Result summary */}
        {result && (
          <div className="bg-slate-50 p-4 rounded border">
            <h3 className="font-medium mb-2">Upload Result</h3>
            <pre className="text-xs text-slate-700 whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>

            {Array.isArray(result.rowErrors) && result.rowErrors.length > 0 && (
              <div className="mt-3">
                <div className="font-medium">Row Errors:</div>
                <ul className="list-disc list-inside text-sm text-red-600">
                  {result.rowErrors.map((re, i) => (
                    <li key={i}>
                      Row {re.row}: {re.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Helpful notes */}
        <div className="text-xs text-slate-400">
          <p>
            <strong>Note:</strong> CSV headers should match the template. Common
            headers:{" "}
            <code>
              STUDENT_ID, STUDENT_NAME, ROLL, MOBILE_NUMBER, DOB, BLOD_GROUP,
              RELIGION, GENDER, CLASS_NAME, SECTION
            </code>
          </p>
          <p className="mt-2">
            If you send Institute from the form, backend will apply that
            institute id to every CSV row automatically.
          </p>
        </div>
      </form>
    </div>
  );
}
