import React from "react";
import QRCode from "react-qr-code";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

function StudentIDCard({ data }) {
  const logo = fullUrl(data?.institute?.logo_url);
  const photo = fullUrl(data?.photo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="w-[58mm] h-[90mm] bg-white rounded-xl shadow-xl overflow-hidden border relative font-[Inter]">
      {/* Colorful Top Shape */}
      <div className="h-20 rounded-b-[40%] bg-gradient-to-r from-green-500 via-emerald-500 to-indigo-500 p-3 flex items-start justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/30 backdrop-blur">
            {logo && (
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wide opacity-90">
              {(data?.institute?.name || "INSTITUTE NAME").toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Photo */}
      <div className="flex justify-center -mt-6">
        <div className="w-24 h-28 rounded-lg shadow-lg border-3 border-white bg-gray-100 overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt="student"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
              No Photo
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mt-2">
        <h2 className="text-[13px] font-bold text-gray-800 uppercase">
          {data?.name || "STUDENT NAME"}
        </h2>
      </div>

      {/* Info Box */}
      <div className="px-3 mt-2 text-[10px] font-semibold space-y-0.5">
        <div className="grid grid-cols-2 ">
          <p>
            Class: <span className="font-normal">{data?.className}</span>
          </p>
          <p>
            Section:
            <span className="font-normal">
              {data?.section || data?.session}
            </span>
          </p>
          <p>ID: {data?.id || "-"}</p>
          <p>
            Roll: <span className="font-normal">{data?.roll}</span>
          </p>
          <p>
            Blood:{" "}
            <span className="text-red-600 font-bold">{data?.bloodGroup}</span>
          </p>
        </div>
        <p>
          Father: <span className="font-normal">{data?.fatherName}</span>
        </p>
        <p>
          Phone: <span className="font-mono font-normal">{data?.phone}</span>
        </p>
      </div>

      {/* Bottom Area */}
      <div className=" px-3 flex items-center justify-end">
        {/* Signature */}
        <div className="text-center ">
          {signature ? (
            <img
              src={signature}
              alt="sign"
              className="h-6  object-contain"
            />
          ) : (
            <div className="text-[10px] text-gray-500">Signature</div>
          )}
          <p className="text-[9px] font-semibold mt-0">Headmaster</p>
        </div>
      </div>

      {/* Bottom Color Bar */}
      <div className="h-3 w-full bg-gradient-to-r from-indigo-400 via-emerald-500 to-green-600 mt-2">
        <p className="text-[8px] text-center opacity-80 ">Student ID Card</p>
      </div>
    </div>
  );
}

function makeUrl(base, p) {
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  if (!base) return p;
  return `${base.replace(/\/$/, "")}${p.startsWith("/") ? "" : "/"}${p}`;
}
function InstituteBackCard({
  institute = {},
  contact = {},
  baseUrl,
  theme = "light",
  className = "",
}) {
  const isDark = theme === "dark";
  const logo = makeUrl(baseUrl, institute.logo_url || "");
  const name = (institute.name || "INSTITUTE NAME").toString();
  const address = contact.address || institute.address || "—";
  const eiin = institute.eiin || "—";
  const estd = institute.estd || "—";
  const phone = contact.phone || institute.phone || "—";
  const website = contact.website || institute.website || "";
  const emergency = contact.emergency || contact.phone || "";


  return (
    <div
      className={`w-[54mm] h-[85.6mm] rounded-xl shadow-md border p-3 flex flex-col items-center text-center ${className} ${
        isDark ? "bg-slate-900 text-white" : "bg-white text-gray-800"
      }`}
      role="region"
      aria-label={`Back of ${name} ID cards`}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <p className="text-[10px] font-semibold leading-tight">
        If this card found please return it
        <br />
        to the following address:
      </p>

      <div className="mt-2">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-14 h-14 object-contain mx-auto"
          />
        ) : (
          <div className="w-14 h-14 bg-gray-100 rounded-md mx-auto flex items-center justify-center text-xs text-gray-400">
            Logo
          </div>
        )}
      </div>

      <p className="mt-2 font-bold text-[11px] tracking-wide underline">
        CONTACT ADDRESS
      </p>

      <div className="mt-2 bg-white p-1 rounded shadow inline-block">
        <QRCode value={website || "https://example.com"} size={70} />
      </div>

      <p className="mt-3 font-bold text-[12px] leading-tight">
        {name.toUpperCase()}
      </p>

      <div className="text-[10px] mt-1 leading-tight">
        <p>{address}</p>
        <p>
          EIIN: {eiin}, Estd. {estd}
        </p>
        <p>Phone: {phone}</p>
        <p className="break-words">Website: {website || "—"}</p>
      </div>

      <div className="mt-2 text-[11px]">
        <div className="font-semibold">Emergency Contact</div>
        <div className="text-[12px] font-mono">{emergency || "—"}</div>
      </div>

      <div className="mt-auto pt-2 text-[10px] text-gray-500 border-t w-full">
        <div className="flex items-center justify-between">
          <div>
            {name} • {new Date().getFullYear()}
          </div>
          <div className="text-right">
            <div className="text-[10px] font-semibold">Headmaster</div>
            <div className="mt-1 h-6 w-20 bg-white/10 rounded-sm" />
          </div>
        </div>
        <div className="mt-2 text-[10px] text-center text-gray-500">
          Powered by: Saibon Soft
        </div>
      </div>
    </div>
  );
}

function IDCardPrintableSheet({
  students = [],
  perRow = 2,
  theme = "light",
  showBack = false,
}) {
  const cols = Math.max(1, parseInt(String(perRow), 10) || 1);

  return (
    <div className="p-2 print:p-0" style={{ fontFamily: "Arial, sans-serif" }}>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {students.map((s, idx) => {
          const key = s && (s._id || s.id) ? s._id || s.id : `student-${idx}`;

          return (
            <div
              key={key}
              className="flex items-center justify-center"
              style={{
                breakInside: "avoid",
                WebkitColumnBreakInside: "avoid",
                pageBreakInside: "avoid",
              }}
            >
              <div className="transform scale-100 print:scale-100">
                <StudentIDCard
                  data={s}
                  theme={theme}
                  showQR={!showBack}
                  showBarcode={false}
                />
                {showBack ? (
                  <div className="mt-2">
                    <StudentIDCardBack data={s} theme={theme} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`@media print{ body { -webkit-print-color-adjust: exact; } .no-print{ display:none } }`}</style>
    </div>
  );
}

export { StudentIDCard, InstituteBackCard, IDCardPrintableSheet };

// export default function AppExample() {
//   const demoStudents = [
//     {
//       id: "2025-001",
//       name: "Md. Riyad Khan",
//       className: "10",
//       section: "A",
//       roll: 15,
//       session: "2025",
//       bloodGroup: "O+",
//       fatherName: "Abdur Rahman",
//       motherName: "Fatima Begum",
//       phone: "+8801712345678",
//       address: "Dhaka, Bangladesh",
//       photo_url: "/photos/riyad.jpg",
//       institute: {
//         name: "Demo High School",
//         logo_url: "/logo.png",
//         signature_url: "/sign.png",
//       },
//     },
//     {
//       id: "2025-002",
//       name: "Sadia Akter",
//       className: "10",
//       section: "B",
//       roll: 7,
//       session: "2025",
//       bloodGroup: "A+",
//       fatherName: "A H Khan",
//       motherName: "Rina Khan",
//       phone: "+8801712345679",
//       address: "Dhaka, Bangladesh",
//       photo_url: "/photos/sadia.jpg",
//       institute: {
//         name: "Demo High School",
//         logo_url: "/logo.png",
//         signature_url: "/sign.png",
//       },
//     },
//   ];

//   return (
//     <div className="min-h-screen p-6 bg-slate-100">
//       <h2 className="mb-4 font-bold">ID Card Preview</h2>
//       <div className="flex gap-4 mb-6">
//         <StudentIDCard
//           data={demoStudents[0]}
//           theme="light"
//           showQR={true}
//           showBarcode={true}
//         />
//         <StudentIDCardBack data={demoStudents[0]} theme="light" />
//       </div>

//       <h2 className="mb-4 font-bold">Printable Sheet</h2>
//       <div className="mb-4">
//         <IDCardPrintableSheet
//           students={demoStudents}
//           perRow={2}
//           theme="light"
//           showBack={false}
//         />
//       </div>

//       <div className="no-print mt-4">
//         <button
//           onClick={() => window.print()}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Print Sheet
//         </button>
//       </div>
//     </div>
//   );
// }
