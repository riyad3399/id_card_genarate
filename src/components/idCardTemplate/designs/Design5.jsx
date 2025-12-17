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
          <img src={logo} alt="logo" className="w-5 h-5 object-contain" />
        )}
        <span className="text-[10px] font-semibold text-blue-700">
          {data?.institute?.shortName || "logoname"}
        </span>
      </div>

      {/* ===== WHITE CARD ===== */}
      <div className="relative z-10 mt-[32px] mx-3  rounded-[22px] px-4 pt-4 pb-5">
        {/* PHOTO */}
        <div className="flex justify-center">
          <div className="w-[72px] h-[72px] rounded-[12px] bg-gray-100 overflow-hidden shadow">
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
          <p className="text-[13px] font-bold text-indigo-800 uppercase truncate">
            {data?.studentName}
          </p>
          <p className="text-[8.5px] text-gray-500 font-semibold">Student</p>
        </div>

        {/* INFO */}
        <div className="mt-3 text-[9px] text-gray-700 space-y-[2px]">
          <p>
            <b>ID</b> : {data?.studentId || "-"}
          </p>

          {data?.fatherName && (
            <p>
              <b>Father</b> : {data?.fatherName}
            </p>
          )}

          {data?.bloodGroup && (
            <p>
              <b>Blood</b> : {data?.bloodGroup}
            </p>
          )}

          {data?.dob && (
            <p>
              <b>DOB</b> : {formatDOB(data?.dob)}
            </p>
          )}

          <p>
            <b>Phone</b> : {data?.mobileNumber || "-"}
          </p>
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
      </div>

      {/* ===== LEFT SIDE CURVES ===== */}
      <svg
        className="absolute bottom-8 left-[-17%] -rotate-[90deg] w-[80%] h-[30%] z-0"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M0,300 C40,120 180,40 320,0 L0,0 Z" fill="#2563eb" />
      </svg>

      <svg
        className="absolute bottom-[11%] left-[-20%] -rotate-[90deg] w-[80%] h-[30%] z-10"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M0,300 C20,140 200,80 320,40 L0,40 Z" fill="#38bdf8" />
      </svg>
    </div>
  );
}
