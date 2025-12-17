import { Droplet } from "lucide-react";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default function Design3({ data }) {
  const logo = fullUrl(data?.institute?.logo_url);
  const photo = fullUrl(data?.photo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[58mm] h-[90mm] bg-white border border-gray-400 shadow-xl overflow-hidden print:avoid-break-inside">
      {/* ===== TOP BAND ===== */}
      <div className="h-[14mm] bg-slate-800 text-white px-2 py-1 flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden">
          {logo ? (
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-[8px] text-black">LOGO</span>
          )}
        </div>
        <p className="text-[10px] font-bold uppercase leading-tight">
          {data?.institute?.name || "Institute Name"}
        </p>
      </div>

      {/* ===== BODY ===== */}
      <div className="flex h-[62mm]">
        {/* LEFT INFO BLOCK */}
        <div className="w-[60%] px-2 pt-2 text-[9px] text-gray-800 space-y-[3px]">
          <p className="text-[11px] font-extrabold uppercase text-slate-800 leading-tight">
            {data?.studentName || "Student Name"}
          </p>

          <p>
            <b>Class</b>: {data?.className || "-"}
          </p>
          <p>
            <b>Section</b>: {data?.section || "-"}
          </p>
          <p>
            <b>ID</b>:{" "}
            <span className="font-mono">{data?.studentId || "-"}</span>
          </p>
          <p>
            <b>Roll</b>: {data?.roll || "-"}
          </p>
          <p>
            <b>Father</b>: {data?.fatherName || "-"}
          </p>
          <p>
            <b>Phone</b>:{" "}
            <span className="font-mono">{data?.mobileNumber || "-"}</span>
          </p>
        </div>

        {/* RIGHT PHOTO BLOCK */}
        <div className="relative w-[40%] flex items-center justify-center">
          <div className="w-[72px] h-[92px] border-[3px] border-slate-800 bg-gray-100 overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt="student"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-400">
                No Photo
              </div>
            )}
          </div>

          {/* BLOOD GROUP */}
          {data?.bloodGroup && (
            <div className="absolute bottom-1 right-1">
              <div className="relative">
                <Droplet
                  size={26}
                  className="fill-red-600 text-red-700"
                  strokeWidth={1.2}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
                  {data.bloodGroup}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== SIGNATURE ===== */}
      <div className="absolute bottom-[10mm] right-3 text-center">
        {signature ? (
          <img src={signature} alt="sign" className="h-6 mx-auto" />
        ) : (
          <div className="text-[8px] text-gray-400">Signature</div>
        )}
        <p className="text-[8px] font-semibold border-t leading-tight">
          Headmaster
        </p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="absolute bottom-0 w-full h-[6mm] bg-slate-800 text-white text-[9px] flex items-center justify-center tracking-wide">
        Student Identity Card
      </div>
    </div>
  );
}
