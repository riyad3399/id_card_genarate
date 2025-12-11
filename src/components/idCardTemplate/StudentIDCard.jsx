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

  console.log("student data", data);

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
        <div className="w-22 h-26 rounded-lg shadow-lg border-4 border-white bg-gray-100 overflow-hidden">
          {photo ? (
            <img src={photo } alt="student" className="w-full h-full object-cover" />
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
      <div className="h-4 w-full bg-gradient-to-r from-indigo-700 via-emerald-500 to-green-600 mt-1 flex items-center justify-center">
        <p className="text-[9px] text-white opacity-95">Student Identity Card</p>
      </div>
    </div>
  );
}

function InstituteBackCard({
  institute = {},
  contact = {},
  theme = "light",
  className = "",
}) {
  console.log(institute);

  const isDark = theme === "dark";
  const logo = fullUrl(institute.logo_url);
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
      style={{
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <p className="mt-3 font-bold text-[11px] leading-tight w-full text-center break-words max-h-10 overflow-hidden">
        {name.toUpperCase()}
      </p>

      <div className="mt-2 w-full flex justify-center">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-14 h-14 object-contain mx-auto rounded-md bg-white p-1"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-14 h-14 bg-gray-100 rounded-md mx-auto flex items-center justify-center text-xs text-gray-400">
            Logo
          </div>
        )}
      </div>

      <p className="mt-2 font-bold text-[11px] tracking-wide underline w-full">
        CONTACT ADDRESS
      </p>

      <div className="mt-2 bg-white p-1 rounded shadow inline-block">
        <QRCode value={website || "https://example.com"} size={40} />
      </div>

      <div className="text-[10px] mt-1 leading-tight w-full space-y-1">
        <p className="break-words">{address}</p>
        <p className="break-words">
          EIIN: {eiin}, Estd. {estd}
        </p>
        <p className="break-words">Website: {website || "—"}</p>
      </div>

      <div className="mt-2 text-[11px] w-full">
        <div className="font-semibold">Emergency Contact</div>
        <div className="text-[12px] font-mono break-words">
          {emergency || "—"}
        </div>
      </div>

      <div className="mt-2 text-[10px] text-center border-t w-full pt-2">
        Powered by: <span className="font-semibold">Saibon Soft</span>
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

