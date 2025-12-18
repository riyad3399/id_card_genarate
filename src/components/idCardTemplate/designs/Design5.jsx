import formatDOB from "../../helper/formatDOB";

const baseUrl = "http://localhost:5000";
const fullUrl = (p) =>
  !p
    ? ""
    : p.startsWith("http")
    ? p
    : `${baseUrl}${p.startsWith("/") ? "" : "/"}${p}`;

export default function Design5({ data }) {
  const photo = fullUrl(data?.photo_url);
  const logo = fullUrl(data?.institute?.logo_url);
  const signature = fullUrl(data?.institute?.signature_url);

  return (
    <div className="relative w-[58mm] h-[90mm] bg-[#eaf4ff] overflow-hidden border border-gray-300 font-sans">
      {/* ===== TOP RIGHT CURVES ===== */}
      <svg
        className="absolute top-0 right-0 w-[80%] h-[40%]"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M120,0 C320,40 400,160 400,300 L400,0 Z" fill="#2563eb" />
      </svg>

      <svg
        className="absolute top-0 right-0 w-[70%] h-[35%]"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M150,0 C300,60 360,170 360,300 L360,0 Z" fill="#38bdf8" />
      </svg>

      {/* ===== LOGO ===== */}
      <div className="absolute top-3 left-3 flex items-center gap-1 z-20">
        {logo && (
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
        )}
        <span className="text-[13px] font-bold text-gray-800">
          {data?.institute?.name || "logoname"}
        </span>
      </div>

      {/* ===== WHITE CARD ===== */}
      <div className="relative z-10 mt-[32px] mx-1  rounded-[22px] px-4 pt-4 pb-5">
        {/* PHOTO */}
        <div className="flex justify-center mt-3">
          <div className="w-[72px] h-[72px] rounded-[7px] bg-gray-100 overflow-hidden shadow">
            {photo ? (
              <img
                src={photo}
                alt="student"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-[9px] text-gray-400 flex items-center justify-center h-full">
                PHOTO
              </div>
            )}
          </div>
        </div>

        {/* NAME */}
        <div className="text-center mt-2">
          <p
            className="font-bold uppercase text-gray-800 whitespace-nowrap overflow-hidden leading-tight"
            style={{ fontSize: "clamp(7.5px, 1.6vw, 11px)" }}
          >
            {data?.studentName || "YOUR NAME"}
          </p>
          <p className="text-[8.5px] text-gray-500 font-semibold">Student</p>
        </div>

        {/* INFO */}
        <div className="mt-2 text-[9.5px] text-gray-800 text-left space-y-[2px] ">
          <p
            className="leading-tight whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
          >
            <b>Roll</b> : {data?.roll || "-"}
          </p>
          <p
            className="leading-tight whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(7.5px, 1.6vw, 10px)" }}
          >
            <b>ID No</b> : {data?.studentId || "-"}
          </p>
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

      {/* ===== LEFT SIDE CURVES ===== */}
      <svg
        className="absolute bottom-8 left-[-17%] -rotate-[90deg] w-[80%] h-[30%] "
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M0,300 C40,120 180,40 320,0 L0,0 Z" fill="#2563eb" />
      </svg>

      <svg
        className="absolute bottom-[11%] left-[-20%] -rotate-[90deg] w-[80%] h-[30%] "
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M0,300 C20,140 200,80 320,40 L0,40 Z" fill="#38bdf8" />
      </svg>
    </div>
  );
}
