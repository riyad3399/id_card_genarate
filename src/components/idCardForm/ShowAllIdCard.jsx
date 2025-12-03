import React, { useEffect, useState } from "react";
import {
  StudentIDCard,
  IDCardPrintableSheet,
} from "../idCardTemplate/StudentIDCard";


export default function ShowAllIdCard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPrintable, setShowPrintable] = useState(false);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const getAllStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/students", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        if (mounted) setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load students");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getAllStudents();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">All Student ID Cards</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPrintable((s) => !s)}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            {showPrintable ? "Hide Printable" : "Show Printable"}
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Print
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-slate-600">Loading students…</div>
      )}
      {error && <div className="text-sm text-red-600">Error: {error}</div>}

      {!loading && !error && students.length === 0 && (
        <div className="text-sm text-slate-600">No students found.</div>
      )}

      {!loading && !error && students.length > 0 && (
        <>
          {!showPrintable ? (
            <div className="grid grid-cols-2 gap-4">
              {students.map((std) => (
                <StudentIDCard
                  key={std._id || std.id}
                  data={std}
                  theme="light"
                  showQR={false}
                  showBarcode={false}
                />
              ))}
            </div>
          ) : (
            <IDCardPrintableSheet
              students={students}
              perRow={2}
              theme="light"
              showBack={false}
            />
          )}
        </>
      )}
    </div>
  );
}
