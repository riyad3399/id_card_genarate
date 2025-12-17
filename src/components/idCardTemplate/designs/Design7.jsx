import { Droplet } from "lucide-react";
import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";
const fullUrl = (p) =>
  !p
    ? ""
    : p.startsWith("http")
    ? p
    : `${baseUrl}${p.startsWith("/") ? "" : "/"}${p}`;

export default function Design7({ data }) {
  const photo = fullUrl(data?.photo_url);
    const logo = fullUrl(data?.institute?.logo_url);
      const signature = fullUrl(data?.institute?.signature_url);


  return (
    <div className="relative w-[58mm] h-[90mm] bg-white overflow-hidden border border-gray-300 font-sans">
      {/* ===== CURVED ORANGE HEADER ===== */}
      <div className="relative h-[42%] bg-[#ffff] text-white text-center pt-2">
        {/* Curve */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[100%]"
          viewBox="0 0 500 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 
       C120,20 180,120 250,140
       C320,120 380,20 500,40
       L500,0 L0,0 Z"
            fill="#f97316"
          />
        </svg>

        {/* ===== LOGO ===== */}
        {logo && (
          <img
            src={logo}
            alt="logo"
            className="w-7 h-7 mx-auto mb-1 bg-white rounded-full relative z-10"
          />
        )}

        {/* Institute Name */}
        <div className="relative z-10 px-3">
          <p className="text-[11.5px] font-bold uppercase leading-tight text-black">
            {data?.institute?.name || "ABC SCHOOL NAME"}
          </p>
        </div>

        {/* ===== PHOTO ===== */}
        <div className="absolute left-1/2 bottom-[8px] -translate-x-1/2 z-20">
          <div className="w-[78px] h-[78px] rounded-full bg-white p-[3px] shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#f97316]">
              {photo ? (
                <img
                  src={photo}
                  alt="student"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-400">
                  PHOTO
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="text-[13px] text-center">{data?.studentName}</p>
      {/* Blood Group */}
      <div className="relative">
        {data?.bloodGroup && (
          <div className="absolute left-4 -top-15 z-10">
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

      {/* ===== BODY ===== */}
      <div className="pt-6 px-4 text-[9.5px] text-gray-800 space-y-[3px]">
        <Row label="Roll" value={data?.roll || "123456"} />
        <Row label="Student ID" value={data?.studentId || "1234"} />
        <Row label="Father" value={data?.fatherName || "Name Here"} />
        <Row label="Class" value={data?.className || "Class Here"} />

        {/* ✅ DOB */}
        {data?.dob && <Row label="DOB" value={formatDOB(data?.dob)} />}

        <Row label="Contact No" value={data?.mobileNumber || "123-456-7890"} />
      </div>
      {/* ===== SIGNATURE ===== */}
      <div className="absolute bottom-[20px] right-3 text-center">
        {signature && (
          <img
            src={signature}
            alt="signature"
            className="h-7 mx-auto mb-[2px]"
          />
        )}
        <p className="text-[9px] border-t font-semibold">Principal</p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="absolute bottom-0 left-0 w-full bg-[#f97316] text-white text-center py-[4px] px-2">
        <p className="text-[8.5px] leading-tight truncate">
          Student Identity Card
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-1">
      <span className="min-w-[42%] font-semibold">{label}</span>
      <span>:</span>
      <span className="truncate">{value}</span>
    </div>
  );
}
