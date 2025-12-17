import { Droplet } from "lucide-react";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default function Design2({ data }) {
  const logo = fullUrl(data?.institute?.logo_url);
  const photo = fullUrl(data?.photo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[58mm] h-[90mm] bg-white overflow-hidden border border-gray-300 shadow-xl print:avoid-break-inside">
      {/* ===== LEFT COLOR STRIP ===== */}
      <div className="absolute left-0 top-0 h-full w-[6mm] bg-gradient-to-b from-emerald-600 to-teal-500" />

      {/* ===== HEADER ===== */}
      <div className="ml-[6mm] px-2 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border rounded bg-white overflow-hidden flex items-center justify-center">
            {logo ? (
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-[8px]">LOGO</span>
            )}
          </div>
          <p className="text-[11px] font-bold uppercase leading-tight text-gray-800">
            {data?.institute?.name || "Institute Name"}
          </p>
        </div>
      </div>

      {/* ===== PHOTO ===== */}
      <div className="flex justify-center mt-2 ml-[6mm] relative">
        <div className="w-[88px] h-[108px] border-[3px] border-emerald-600 bg-white overflow-hidden">
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

        {/* Blood Group */}
        {data?.bloodGroup && (
          <div className="absolute right-4 top-1">
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

      {/* ===== NAME ===== */}
      <div className="ml-[6mm] text-center mt-1 px-2">
        <p className="text-[13px] font-extrabold text-emerald-700 uppercase truncate">
          {data?.studentName || "Student Name"}
        </p>
      </div>

      {/* ===== DETAILS ===== */}
      <div className="ml-[6mm] px-3 mt-1 text-[10px] text-gray-800 space-y-[2px]">
        <p>
          <b>ID</b>: <span className="font-mono">{data?.studentId || "-"}</span>
        </p>
        <p>
          <b>Roll</b>: {data?.roll || "-"}
        </p>
        <p>
          <b>Class</b>: {data?.className || "-"}
        </p>
        <p>
          <b>Section</b>: {data?.section || "-"}
        </p>
        <p>
          <b>Father</b>: {data?.fatherName || "-"}
        </p>
        <p>
          <b>Phone</b>:{" "}
          <span className="font-mono">{data?.mobileNumber || "-"}</span>
        </p>
      </div>

      {/* ===== SIGNATURE ===== */}
      <div className="absolute bottom-8 right-3 text-center">
        {signature ? (
          <img src={signature} alt="sign" className="h-6 mx-auto" />
        ) : (
          <div className="text-[8px] text-gray-400">Signature</div>
        )}
        <p className="text-[9px] font-semibold border-t">Principal</p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="absolute bottom-0 left-[6mm] right-0 h-5 bg-emerald-600 flex items-center justify-center">
        <p className="text-[9px] text-white tracking-wide">
          Student Identity Card
        </p>
      </div>
    </div>
  );
}
