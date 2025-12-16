import { Droplet } from "lucide-react";
import QRCode from "react-qr-code";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

function StudentIDCard({ data }) {
  const logo = fullUrl(data?.institute?.logo_url);
  const photo = fullUrl(data?.photo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[58mm] h-[90mm] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300 font-inter print:avoid-break-inside">
      {/* ===== Top Header ===== */}
      <div className="relative h-20 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white px-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur border border-white flex items-center justify-center overflow-hidden">
            {logo ? (
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-[9px]">LOGO</span>
            )}
          </div>
          <p className="text-[10px] font-semibold leading-tight uppercase">
            {data?.institute?.name || "Institute Name"}
          </p>
        </div>
        {/* Opposite Curve */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-white rounded-t-[50%]" />
      </div>

      {/* ===== Student Photo ===== */}
      <div className="relative flex justify-center mt-[-18px]">
        <div className="w-[90px] h-[110px] rounded-xl border-[4px] border-white shadow-lg bg-gray-100 overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt="student"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
              No Photo
            </div>
          )}
        </div>

        {/* ===== Blood Group (Lucide Drop) ===== */}
        {data?.bloodGroup && (
          <div className="absolute left-4 top-5 z-10">
            <div className="relative">
              {/* Drop Icon */}
              <Droplet
                size={32}
                className="fill-red-600 text-red-700 drop-shadow-lg"
                strokeWidth={1.5}
              />

              {/* Blood Group Text */}
              <span
                className="
          absolute inset-0
          flex items-center top-1 justify-center
          text-[8px] font-extrabold
          text-white
          leading-none
        "
              >
                {data.bloodGroup}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ===== Student Name ===== */}
      <div className="text-center mt-2 px-2">
        <h2 className="text-[13px] font-bold text-gray-800 uppercase truncate">
          {data?.studentName || "STUDENT NAME"}
        </h2>
      </div>

      {/* ===== Info Section ===== */}
      <div className="px-3 mt-2 text-[10px] text-gray-800 space-y-1">
        <div className="flex justify-between gap-x-2">
          <p>
            Class: <span className="font-normal">{data?.className || "-"}</span>
          </p>
          <p>
            Section: <span className="font-normal">{data?.section || "-"}</span>
          </p>
        </div>
        <div className="flex justify-self-auto gap-x-2">
          <p>
            ID:{" "}
            <span className="font-mono font-normal">
              {data?.studentId || "-"}
            </span>
          </p>
          <p>
            Roll: <span className="font-normal">{data?.roll || "-"}</span>
          </p>
        </div>

        <p>
          Father: <span className="font-normal">{data?.fatherName || "-"}</span>
        </p>

        <p>
          Phone:{" "}
          <span className="font-mono font-normal">
            {data?.mobileNumber || "-"}
          </span>
        </p>
      </div>

      {/* ===== Signature ===== */}
      <div className="absolute bottom-10 right-3 text-center">
        {signature ? (
          <img
            src={signature}
            alt="sign"
            className="h-10 object-contain mx-auto"
          />
        ) : (
          <div className="text-[9px] text-gray-400">Signature</div>
        )}
        <p className="text-[9px] font-semibold border-t">Headmaster</p>
      </div>

      {/* ===== Footer ===== */}
      <div className="absolute bottom-0 w-full h-5 bg-gradient-to-r from-indigo-700 via-emerald-600 to-green-600 flex items-center justify-center">
        <p className="text-[9px] text-white tracking-wide">
          Student Identity Card
        </p>
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
