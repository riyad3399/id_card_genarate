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
      {/* ================= TOP PURPLE HEADER ================= */}
      <div className="relative h-[42%] bg-gradient-to-r from-[#4c1d95] to-[#2f4fa2] text-center text-white px-3 pt-2">
        {/* LOGO */}
        {logo && (
          <img
            src={logo}
            alt="logo"
            className="w-7 h-7 mx-auto mb-[2px] bg-white rounded-full"
          />
        )}

        {/* INSTITUTE NAME */}
        <p
          className="font-bold leading-tight uppercase"
          style={{ fontSize: "clamp(10px,1.6vw,13.5px)" }}
        >
          {data?.institute?.name || "Your School and College Name"}
        </p>

        {/* PHOTO */}
        <div className="absolute left-1/2 -bottom-11 -translate-x-1/2 z-20">
          <div className="w-[22mm] h-[27mm] rounded-[7px] bg-white border-[3px] border-[#FFA500] overflow-hidden ">
            {photo ? (
              <img
                src={photo}
                alt="student"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[9px] text-gray-400 flex items-center justify-center h-full">
                PHOTO
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= CURVE ================= */}
      <svg
        className="absolute top-[39%] left-0 w-full"
        viewBox="0 0 500 80"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#2f4fa2" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 C150,80 350,0 500,30 L500,0 L0,0 Z"
          fill="url(#waveGrad)"
        />

        <path
          d="M0,40 C150,90 350,10 500,40"
          fill="none"
          stroke="#FFA500"
          strokeWidth="10"
        />
      </svg>

      {/* ================= BLOOD GROUP ================= */}
      {data?.bloodGroup && (
        <div className="absolute top-[160px] left-4 z-10">
          <div className="relative">
            <Droplet size={26} className="fill-red-600 text-red-700" />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-semibold text-white top-2 ">
              {data.bloodGroup}
            </span>
          </div>
        </div>
      )}

      {/* ================= BODY ================= */}
      <div className="pt-13 px-4 text-gray-800">
        {/* STUDENT NAME */}
        <p
          className="text-center font-bold text-[#4c1d95] whitespace-nowrap overflow-hidden leading-tight mb-2 uppercase"
          style={{ fontSize: "clamp(9px,1.6vw,11px)" }}
        >
          {data?.studentName || "Smith James"}
        </p>

        {/* INFO LIST */}
        <div className=" text-[9.5px]">
          <div className="grid grid-cols-[28%_5%_1fr] items-start text-[9.5px] font-bold">
            <span>ID</span>
            <span>:</span>
            <span
              className="flex gap-3 whitespace-nowrap overflow-hidden"
              style={{ fontSize: "clamp(7.5px,1.5vw,9.5px)" }}
            >
              <span>
                {data?.institute?.shortName}
                {data?.studentId || "-"}
              </span>
              <span>Roll : {data?.roll || "-"}</span>
            </span>
          </div>
          <Info label="Class" value={data?.className || "-"} />
          {data?.groupName && <Info label="Group" value={data?.groupName} />}

          <Info label="Father" value={data?.fatherName || "-"} />
          <Info label="Gender" value={data?.gender || "-"} />

          {data?.dob && <Info label="DOB" value={formatDOB(data?.dob)} />}

          <Info label="Phone" value={data?.mobileNumber || "-"} />
        </div>
      </div>

      {/* ================= SIGNATURE ================= */}
      <div className="absolute bottom-[20px] right-3 text-center">
        {signature && (
          <img
            src={signature}
            alt="signature"
            className="h-7 mx-auto mb-[2px]"
          />
        )}
        <p className="text-[9.5px] border-t font-semibold ">Principal</p>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="absolute bottom-0 w-full h-[20px] bg-gradient-to-r from-[#4c1d95] to-[#2f4fa2] flex items-center justify-center">
        <p className="text-[9px] text-white font-semibold">
          Student Identity Card
        </p>
      </div>
    </div>
  );
}

/* ================= INFO ROW ================= */
function Info({ label, value }) {
  return (
    <div className="grid grid-cols-[28%_5%_1fr] items-start">
      <span className="font-bold">{label}</span>
      <span>:</span>
      <span
        className="whitespace-nowrap overflow-hidden font-bold"
        style={{ fontSize: "clamp(7.5px,1.5vw,9.5px)" }}
      >
        {value}
      </span>
    </div>
  );
}
