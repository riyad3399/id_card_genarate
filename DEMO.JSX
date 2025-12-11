// pages/ShowAllIdCard.jsx  (বা যেখানে তোমার পেজ আছে)
import React, { useState, useEffect } from "react";
import StudentIDCard from "../components/StudentIDCard";
import IDCardPrintableSheet from "../components/IDCardPrintableSheet";

/* তোমার API/props থেকে আসা students নেওয়া যাবে।
   এখানে demo data দিলে পেজে কিছু দেখা যাবে। */

const demoStudents = [
  // (একই structure রেখো) - তোমার প্রকৃত students দিয়ে রিপ্লেস করো
  {
    _id: "s1",
    id: "ATCC910401",
    name: "MD. ATIKUL ISLAM",
    photo_url: "/uploads/photos/atul.jpg",
    fatherName: "MD. SHAHIN MIA",
    phone: "01951485286",
    className: "Eleven (A)",
    section: "A",
    roll: "01",
    bloodGroup: "O+",
    institute: {
      name: "Alinagar Technical And Commercial College",
      logo_url: "/uploads/logos/logo.png",
      signature_url: "/uploads/sign/sign1.png",
    },
  },
  // ... আরো
];

export default function ShowAllIdCard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPrintable, setShowPrintable] = useState(false);
  const [perRow, setPerRow] = useState(5); // পরিবর্তন করে 4 বা 5 করা যায়

  useEffect(() => {
    // তোমার API থেকে ডেটা লোড করার জায়গা - এখন demo দিলাম
    setLoading(true);
    setTimeout(() => {
      setStudents(demoStudents);
      setLoading(false);
    }, 400);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 no-print">
        <h1 className="text-lg font-bold">All Student ID Cards</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPrintable((s) => !s)}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            {showPrintable ? "Hide Printable" : "Show Printable"}
          </button>

          <button
            onClick={() => {
              // যদি user printable view না দিয়েছে, তখন অটোমেটিক showPrintable করে প্রিন্ট চালাও:
              if (!showPrintable) {
                setShowPrintable(true);
                // छोटা delay দিয়ে print কল করবো যাতে DOM রেন্ডার হয়ে যায়
                setTimeout(() => window.print(), 500);
              } else {
                window.print();
              }
            }}
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
                <StudentIDCard key={std._id || std.id} data={std} />
              ))}
            </div>
          ) : (
            <>
              {/* Optionally show controls to change perRow (no-print) */}
              <div className="flex items-center gap-3 mb-3 no-print">
                <label className="text-sm">Cards per row (print):</label>
                <select
                  value={perRow}
                  onChange={(e) => setPerRow(Number(e.target.value))}
                  className="px-2 py-1 border rounded"
                >
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <div>
                <IDCardPrintableSheet
                  students={students}
                  perRow={perRow}
                  gapMm={8}
                />
              </div>
            </>
          )}
        </>
      )}

      {/* Global-ish print helpers for screen preview (not required but handy) */}
      <style>{`
        /* hide controls when printing: .no-print class used above */
        @media print {
          .no-print { display: none !important; }
        }

        /* optional: page background while previewing on screen */
        body { background: #f3f4f6; }
      `}</style>
    </div>
  );
}


// components/StudentIDCard.jsx
import React from "react";

function fullUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${window.location.origin}${url}`;
}

function StudentIDCard({ data }) {
  const logo = fullUrl(data?.institute?.logo_url);
  const photo = fullUrl(data?.photo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="idcard-card w-[58mm] h-[90mm] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-300 relative font-inter print:avoid-break-inside">
      {/* Top Shape */}
      <div className="h-20 rounded-b-[40%] bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-3 flex items-start justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/30 backdrop-blur border border-white/40 flex items-center justify-center">
            {logo ? (
              <img src={logo} alt="logo" className="w-full h-full object-contain" />
            ) : (
              <div className="text-[10px]">Logo</div>
            )}
          </div>
          <p className="text-[10px] font-semibold uppercase opacity-95">
            {data?.institute?.name || "INSTITUTE NAME"}
          </p>
        </div>
      </div>

      {/* Photo */}
      <div className="flex justify-center -mt-6">
        <div className="w-24 h-28 rounded-lg shadow-lg border-4 border-white bg-gray-100 overflow-hidden">
          {photo ? (
            <img src={photo} alt="student" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
              No Photo
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mt-2 px-2">
        <h2 className="text-[13px] font-bold text-gray-800 uppercase truncate">
          {data?.name || "STUDENT NAME"}
        </h2>
      </div>

      {/* Info */}
      <div className="px-3 mt-2 text-[10px] font-semibold space-y-0.5">
        <div className="grid grid-cols-2">
          <p>
            Class: <span className="font-normal">{data?.className || "-"}</span>
          </p>
          <p>
            Section: <span className="font-normal">{data?.section || data?.session || "-"}</span>
          </p>
          <p>ID: <span className="font-normal">{data?.id || "-"}</span></p>
          <p>Roll: <span className="font-normal">{data?.roll || "-"}</span></p>
          <p>Blood: <span className="text-red-600 font-bold">{data?.bloodGroup || "-"}</span></p>
        </div>

        <p>Father: <span className="font-normal">{data?.fatherName || "-"}</span></p>
        <p>Phone: <span className="font-mono font-normal">{data?.phone || "-"}</span></p>
      </div>

      {/* Signature */}
      <div className="px-3 flex items-center justify-end mt-2">
        <div className="text-center">
          {signature ? (
            <img src={signature} alt="sign" className="h-6 object-contain mx-auto" />
          ) : (
            <div className="text-[10px] text-gray-500">Signature</div>
          )}
          <p className="text-[9px] font-semibold mt-0">Headmaster</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-6 w-full bg-gradient-to-r from-indigo-700 via-emerald-500 to-green-600 mt-1 flex items-center justify-center">
        <p className="text-[9px] text-white opacity-95">Student Identity Card</p>
      </div>
    </div>
  );
}
