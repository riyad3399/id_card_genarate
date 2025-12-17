import { Droplet } from "lucide-react";
import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default function Design4({ data }) {
  const photo = fullUrl(data?.photo_url);
  const logo = fullUrl(data?.institute?.logo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[58mm] h-[90mm] bg-white border border-gray-400 overflow-hidden font-sans">
      {/* ===== HEADER ===== */}
      <div className="relative h-[60px] bg-[#5f7fbd] text-white text-center px-2 pt-2">
        <p className="text-[12px] font-bold leading-tight uppercase">
          {data?.institute?.name || "ALINAGAR TECHNICAL AND COMMERCIAL COLLEGE"}
        </p>

        {/* wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 500 50"
          preserveAspectRatio="none"
        >
          <path d="M0,30 C120,60 380,0 500,25 L500,60 L0,60 Z" fill="#ffff" />
        </svg>
      </div>

      {/* ===== LOGO ===== */}
      <div className="absolute top-[40px] left-3 w-10 h-10 bg-white rounded-full">
        {logo && (
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        )}
      </div>

      {/* ===== PHOTO ===== */}
      <div className="flex justify-center mt-[5px]">
        <div className="w-[85px] h-[105px] border-[3px] border-blue-600 bg-white">
          {photo ? (
            <img
              src={photo}
              alt="student"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[9px] text-gray-400">
              No Photo
            </div>
          )}
        </div>
      </div>

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

      {/* ===== NAME ===== */}
      <div className="text-center mt-2">
        <p className="text-[14px] font-bold text-green-700 uppercase">
          {data?.studentName || "KAMRUNNAHER"}
        </p>
      </div>

      {/* ===== DETAILS ===== */}
      <div className="px-3 mt-2 text-[10.5px] leading-[15px] text-black">
        <p>
          <b>ID</b> : {data?.studentId}
        </p>
        <p>
          <b>Roll</b> : {data?.roll}
        </p>
        <p>
          <b>Father</b> : {data?.fatherName}
        </p>
        <p>
          <b>Class</b> : {data?.className}
        </p>
        {data.groupName && (
          <p>
            <b>Group</b> : {data?.groupName || "General"}
          </p>
        )}
        {data.dob && (
          <p>
            <b>D.O.B</b> : {formatDOB(data?.dob)}
          </p>
        )}
        <p>
          <b>Phone</b> : {data?.mobileNumber}
        </p>
      </div>

      {/* ===== SIGNATURE ===== */}
      <div className="absolute bottom-[26px] right-3 text-center">
        {signature && (
          <img src={signature} alt="sign" className="h-8 mx-auto" />
        )}
        <p className="text-[9px] border-t font-semibold">Principal</p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="absolute bottom-0 w-full h-[22px] bg-[#2f4fa3] flex items-center justify-center">
        <p className="text-[9px] text-white font-semibold">
          Student Identity Card
        </p>
      </div>
    </div>
  );
}
