import { Droplet } from "lucide-react";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default function Design1({ data }) {
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
        <div className="absolute bottom-0 left-0 w-full h-6 bg-white rounded-t-[50%]" />
      </div>

      {/* ===== Photo ===== */}
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

        {/* Blood Group */}
        {data?.bloodGroup && (
          <div className="absolute left-4 top-5 z-10">
            <div className="relative">
              <Droplet
                size={32}
                className="fill-red-600 text-red-700 drop-shadow-lg"
                strokeWidth={1.5}
              />
              <span className="absolute inset-0 flex items-center top-1 justify-center text-[8px] font-extrabold text-white">
                {data.bloodGroup}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ===== Name ===== */}
      <div className="text-center mt-2 px-2">
        <h2 className="text-[13px] font-bold text-gray-800 uppercase truncate">
          {data?.studentName || "STUDENT NAME"}
        </h2>
      </div>

      {/* ===== Info ===== */}
      <div className="px-3 mt-2 text-[10px] text-gray-800 space-y-1">
        <div className="flex justify-between">
          <p>Class: {data?.className || "-"}</p>
          <p>Section: {data?.section || "-"}</p>
        </div>
        <div className="flex gap-2">
          <p>
            ID: <span className="font-mono">{data?.studentId || "-"}</span>
          </p>
          <p>Roll: {data?.roll || "-"}</p>
        </div>
        <p>Father: {data?.fatherName || "-"}</p>
        <p>
          Phone: <span className="font-mono">{data?.mobileNumber || "-"}</span>
        </p>
      </div>

      {/* ===== Signature ===== */}
      <div className="absolute bottom-10 right-3 text-center">
        {signature ? (
          <img src={signature} alt="sign" className="h-10 mx-auto" />
        ) : (
          <div className="text-[9px] text-gray-400">Signature</div>
        )}
        <p className="text-[9px] font-semibold border-t">Headmaster</p>
      </div>

      {/* ===== Footer ===== */}
      <div className="absolute bottom-0 w-full h-5 bg-gradient-to-r from-indigo-700 via-emerald-600 to-green-600 flex items-center justify-center">
        <p className="text-[9px] text-white">Student Identity Card</p>
      </div>
    </div>
  );
}
