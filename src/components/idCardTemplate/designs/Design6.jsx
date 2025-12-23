import { Droplet } from "lucide-react";
import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";
const fullUrl = (p) =>
  !p
    ? ""
    : p.startsWith("http")
    ? p
    : `${baseUrl}${p.startsWith("/") ? "" : "/"}${p}`;

export default function Design6({ data }) {
  const photo = fullUrl(data?.photo_url);
  const logo = fullUrl(data?.institute?.logo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[57mm] h-[89mm] bg-white overflow-hidden border border-gray-300 font-sans">
      {/* ===== TOP DARK AREA ===== */}
      <div className="relative h-[40%] bg-[#2e2e2e] text-center text-white px-3 pt-2">
        {/* Logo */}
        {logo && (
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 mx-auto mb-1 bg-white  rounded-full"
          />
        )}

        <p className="text-[13px] font-bold uppercase leading-tight">
          {data?.institute?.name || "INSTITUTE NAME"}
        </p>

        {/* PHOTO */}
        <div className="absolute left-1/2 -bottom-13 -translate-x-1/2 z-20">
          <div className="w-[80px] h-[99px] rounded-[7px] bg-white border-[3px] border-green-500 overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt="profile"
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

      <svg
        className="absolute top-[38%] left-0 w-full z-0"
        viewBox="0 0 500 60"
        preserveAspectRatio="none"
      >
        <path d="M0,25 C150,55 350,0 500,30 L500,0 L0,0 Z" fill="#22c55e" />
      </svg>

      {/* ================= BLOOD GROUP ================= */}
      {data?.bloodGroup && (
        <div className="absolute top-[155px] left-4 z-10">
          <div className="relative">
            <Droplet size={26} className="fill-red-600 text-red-700" />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-semibold text-white top-2 ">
              {data.bloodGroup}
            </span>
          </div>
        </div>
      )}

      {/* ===== BODY ===== */}
      <div className="pt-15 px-3 text-center">
        <p
          className="font-bold uppercase text-gray-800 whitespace-nowrap overflow-hidden leading-tight"
          style={{ fontSize: "clamp(7.5px, 1.6vw, 11px)" }}
        >
          {data?.studentName || "STUDENT NAME"}
        </p>

        <div className="mt-2 text-[9.5px] text-gray-700 text-left space-y-[2px] font-semibold">
          <div className="flex gap-x-10">
            <p
              className="leading-tight whitespace-nowrap overflow-hidden"
              style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
            >
              <b>ID</b> : {data?.institute.shortName + data?.studentId || "-"}
            </p>
            <p
              className="leading-tight whitespace-nowrap overflow-hidden"
              style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
            >
              <b>Roll</b> : {data?.roll || "-"}
            </p>
          </div>
          <p
            className="leading-tight whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
          >
            <b>Class</b> : {data?.className || "-"}
          </p>
          <p
            className="leading-tight whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
          >
            <b>Father</b> : {data?.fatherName || "-"}
          </p>
          <p
            className="leading-tight whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
          >
            <b>Gender</b> : {data?.gender || "-"}
          </p>

          {data?.groupName && (
            <p
              className="leading-tight whitespace-nowrap overflow-hidden"
              style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
            >
              <b>Group</b> : {data?.groupName}
            </p>
          )}

          {data?.dob && (
            <p
              className="leading-tight whitespace-nowrap overflow-hidden"
              style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
            >
              <b>DOB</b> : {formatDOB(data?.dob)}
            </p>
          )}

          <p
            className="leading-tight whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
          >
            <b>Phone</b> : {0 + data?.mobileNumber || "-"}
          </p>
        </div>
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

      {/* ===== BOTTOM BAR ===== */}
      <div className="absolute bottom-0 left-0 w-full h-[16px] bg-green-500 flex items-center justify-center">
        <p className="text-[9px] text-white font-semibold">
          STUDENT IDENTITY CARD
        </p>
      </div>
    </div>
  );
}
